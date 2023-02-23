const express = require('express');
const {httpGetAllLaunches, httpAddNewLaunch} = require('./launches.conroller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches).post('/', httpAddNewLaunch)

module.exports = launchesRouter;

