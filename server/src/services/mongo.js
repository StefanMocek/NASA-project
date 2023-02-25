const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('Connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err)
});

async function mongoConnect () {
  await mongoose.connect(url);
};

async function mongoDisconnect () {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect
};