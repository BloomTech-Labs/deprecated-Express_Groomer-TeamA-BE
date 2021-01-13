const request = require('supertest');
const express = require('express');
const Appointments = require('../../api/appointments/appointmentsModel');
const customerPetsRouter = require('../../api/customer_pet/customerPetRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/appointments/appointmentsModel');
jest.mock('../../api/middleware/authRequired', () => {
  jest.fn((req, res, next) => {
    req.profile.id = '00ulthapbErVUwVJy4x6';
    next();
  });
});

describe('customerPets router endpoints', () => {
  beforeAll(() => {
    server.use(['/customerPet', '/customerPets'], customerPetsRouter); 
    jest.clearAllMocks();
  });

  describe('GET /customerPets/:id/appointments', () => {
    it('should return 200 when appointments are found', async () => {
      Appointments.getAllBy.mockResolvedValue([
        {
          id: 0,
          groomer_id: '00ultwew80Onb2vOT4x6',
          customer_id: '00ulthapbErVUwVJy4x6',
          pet_id: 0,
          location_service_id: 0,
          service_provider_name: 'Buddy',
          appointment_date: '2020-10-19T06:00:00.000Z',
          appointment_time: '07:37:16',
          status: 'Pending',
          created_at: '2021-01-13T16:09:28.174Z',
          updated_at: '2021-01-13T16:09:28.174Z',
        },
      ]);
      const res = await request(server).get('/customerPets/0/appointments');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(Appointments.getAllBy.mock.calls.length).toBe(1);
    });
    it('should return 404 when appointments are not found', async () => {
      Appointments.getAllBy.mockResolvedValue([]);
      const res = await request(server).get('/customerPets/0/appointments');

      expect(res.status).toBe(404);
    })
  });
});
