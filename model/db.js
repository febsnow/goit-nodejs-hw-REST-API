const mongoose = require('mongoose');
require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err.message}`);
  process.exit(1);
});

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Connection to DB is closed, app is terminated');
  process.exit(1);
});

module.exports = db;
