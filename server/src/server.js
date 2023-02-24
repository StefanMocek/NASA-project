require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const app = require('./app')
const {loadPlanetsData} = require('./models/planets.model')

const PORT = process.env.PORT || 5000

const server = http.createServer(app);

const url = process.env.MONGO_URL

mongoose.connection.once('open', () => {
  console.log('Connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function startServer () {
  await mongoose.connect(url);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  })
}

startServer();