const path = require('path');
const axios = require('axios');

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

// User cache
var userCache = {};

(async function() {
  const client = await mongo.MongoClient.connect(uri);
  const db = client.db(dbName);
  console.log('Connected to MongoDB');

  const Regions = db.collection('regions');
  const Players = db.collection('players');
  const Results = db.collection('results');
  const Games = db.collection('games');
  const Users = db.collection('users');

  const exclude = { _id: 0, location: 0, createdAt: 0, creator: 0 };

  // Fetch user data
  async function fetchUser(sub, auth) {
    if (userCache[sub]) {
      return userCache[sub];
    } else {
      try {
        const usrreq = await axios.get('https://app86758601.auth0.com/userinfo',
          { headers: { 'Authorization': auth } });
        const data = usrreq.data;
        Users.updateOne({ sub }, { $set: data }, { upsert: true });
        userCache[sub] = data;
        return data;
      } catch(err) {
        console.error(err);
        return { sub };
      }
    }
  }

  function read(collection) {
    return async (req, res) => {
      res.send(await collection.find().project(exclude).toArray());
    };
  }

  function create(collection, pick) {
    return async (req, res) => {
      const user = await fetchUser(req.user.sub, req.headers.authorization);
      const body = req.body;

      collection.insert({
        ...pick(body),
        id: body.id,
        location: body.location,
        createdAt: new Date(),
        creator: {
          email: user.email,
          sub: user.sub
        }
      });

      res.sendStatus(201);
    };
  }


  app.get('/api/regions', read(Regions));
  app.post('/api/regions', create(Regions, ({name}) => ({name})));

  app.get('/api/players', read(Players));
  app.post('/api/players', create(Players, ({name}) => ({name})));

  app.get('/api/results', read(Results));
  app.post('/api/results', create(Results, ({regions, winner, date, score, game}) => ({regions, winner, date, score, game})));

  app.get('/api/games', read(Games));

  // GraphQL support
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
  const { makeExecutableSchema } = require('graphql-tools');
  const fs = require('fs');
  const typeDefs = fs.readFileSync('server/schema.graphql', 'utf8');
  const resolvers = require('./resolvers');
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  app.use('/graphql', graphqlExpress({ schema, context: { Regions, Players, Results, Games, exclude } }));
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
})();


app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});
