const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {

  test('It should respond with 200 code', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-type', /json/)
      .expect(200);
  })
});

describe('Test GET /launches', () => {

  const completeLaunchData = {
    mission:"ZTM155",
    rocket:"ZTM Experimantal IS1",
    target:"Kepler-186 f",
    launchDate:"May 18, 2030"
  };

  const launchDataWithoutDate = {
    mission:"ZTM155",
    rocket:"ZTM Experimantal IS1",
    target:"Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission:"ZTM155",
    rocket:"ZTM Experimantal IS1",
    target:"Kepler-186 f",
    launchDate:"string"
  };

  test('It should respond with 201 code', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test('It should catch missing required properies', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property'
    });
  })

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date'
    });
  })
})