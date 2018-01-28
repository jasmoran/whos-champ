const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()

const mongo = require('mongodb');
const uri = process.env.MONGODB_URI;
const dbName = uri.split('/').pop();

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
})();

// Serve static React client
app.use(express.static('client'));

app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});
