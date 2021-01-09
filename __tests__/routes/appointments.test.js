const request = require('supertest');
const express = require('express');
const Appointments = require('../../api/appointments/appointmentsModel');
const appointmentsRouter = require('../../api/appointments/appointmentsRouter');
const server = express();

server.use(express.json());

jest.mock('../../api/appointments/appointmentsModel');

const token = process.env.TEST_TOKEN;

describe('appointments router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use('/appointments', appointmentsRouter);
    jest.clearAllMocks();
  });

  describe('POST /appointments', () => {
    it('should return 201 when appointment is created', async () => {
      const appointment = {
        groomer_id: '00ultwew80Onb2vOT4x6',
        pet_id: 0,
        location_service_id: 0,
        service_provider_name: 'Scrubbers',
        status: 'Pending',
      };

      Appointments.create.mockResolvedValue([appointment]);

      const res = await request(server)
        .post('/appointments')
        .send(appointment)
        .set('Authorization', 'Bearer ' + token);

      expect(res.status).toBe(201);
      expect(res.body).toContainEqual(appointment);
      expect(res.body.customer_id);
      expect(res.body.appointment_id);
    });
  });
});
