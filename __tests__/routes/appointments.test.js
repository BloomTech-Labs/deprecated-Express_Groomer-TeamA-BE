const request = require('supertest');
const express = require('express');
const Appointments = require('../../api/appointments/appointmentsModel');
const appointmentRouter = require('../../api/appointments/appointmentsRouter');
const server = express();
server.use(express.json());

jest.mock('../../api//appointments/appointmentsModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('Appointments router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/appointments'], appointmentRouter);
    jest.clearAllMocks();
  });

  describe('GET /:appointmentId', () => {
    it('should return 200', async () => {
      Appointments.get.mockResolvedValue([]);
      const res = await request(server).get('/appointments/1');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Appointments.get.mock.calls.length).toBe(1);
    });
  });

  describe('GET /:appointmentId', () => {
    it('should return 404', async () => {
      Appointments.get.mockResolvedValue();
      const res = await request(server).get('/appointments/666');

      expect(res.status).toBe(404);
      expect(res.body.length).toBe(0);
      expect(Appointments.get.mock.calls.length).toBe(1);
    });
  });
});
