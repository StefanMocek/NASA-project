const launches = new Map();

const launch = {
  flightNumber:100,
  mission: 'Kepler Exploration X',
  rocker: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'MASA'],
  upcoming: true,
  success: true
}

launches.set(launch.flightNumber, launch);

module.exports = {
  launches
}