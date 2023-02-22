const express = require('express');
const {httpGetAllLaunches} = require('./launches.conroller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);

module.exports = launchesRouter;

