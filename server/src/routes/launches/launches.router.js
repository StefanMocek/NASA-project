const express = require('express');
const {httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch} = require('./launches.conroller');

const launchesRouter = express.Router();

launchesRouter
  .get('/', httpGetAllLaunches)
  .post('/', httpAddNewLaunch)
  .delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;

