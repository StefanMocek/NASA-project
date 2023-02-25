const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber:100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'MASA'],
  upcoming: true,
  success: true
};

saveLaunch(launch);

function existsLaunchWithId (launchId) {
  return launches.has(launchId);
};

async function getLatestFlightNumber () {
  const latestLaunch = await launches
    .findOne()
    .sort('-flightNumber');

  if (!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER;
  };
    
  return latestLaunch.flightNumber;
};

async function getAllLaunches () {
  return await launches
    .find({}, {'_id': 0,'__v': 0});
};

async function saveLaunch (launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert:true
  })
};

async function scheduleNewLaunch (launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;

  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    customer: ['ZTM', 'MASA'],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch);
};

function abortLaunchById (launchId) {
  const abortedLaunch = launches.get(launchId);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
};

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  abortLaunchById,
  scheduleNewLaunch
};
