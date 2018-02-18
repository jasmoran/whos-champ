const path = require('path');

const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()

const mongo = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = uri.split('/').pop();

// enable the use of request body parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create middleware for checking the JWT
const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://app86758601.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'https://whos-champ.herokuapp.com/api',
  issuer: 'https://app86758601.auth0.com/',
  algorithms: ['RS256']
});
app.use('/api', checkJwt);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

(async function() {
  const client = await mongo.MongoClient.connect(uri);
  const db = client.db(dbName);
  console.log('Connected to MongoDB');

  const Regions = db.collection('regions');
  const Users = db.collection('users');
  const Results = db.collection('results');

  app.get('/api/state', async function (req, res) {
    let data = {};
    let p_reg = Regions.find().toArray();
    let p_usr = Users.find().toArray();
    let p_res = Results.find().toArray();
    [data.regions, data.users, data.results] = await Promise.all([p_reg, p_usr, p_res]);

    res.send(data);
  });

  app.get('/api/regions', async function (req, res) {
    res.send(await Regions.find().toArray());
  });

  app.get('/api/players', async function (req, res) {
    res.send(await Users.find().toArray());
  });

  app.get('/api/results', async function (req, res) {
    res.send(await Results.find().toArray());
  });
})();

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});
