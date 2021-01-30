const request = require('supertest');
const express = require('express');
const Certifications = require('../../api/certifications/certificationsModel');
const certificationsRouter = require('../../api/certifications/certificationsRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/certifications/certificationsModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => {
    req.profile.id = '00ultwew80Onb2vOT4x6';
    next();
  })
)

describe('certifications router endpoints', () => {
  beforeAll(() => {
    server.use('/certifications', certificationsRouter);
    jest.clearAllMocks();
  });

  describe('GET /certifications/Groomer/:groomerId', () => {
    it('should return 200 when certifications are returned', async () => {
      Certifications.getBy.mockResolvedValue([
        {
          id: 1,
          groomer_id: '00ultwew80Onb2vOT4x6',
          title: 'Long-Legged Terriers',
          institute: 'Institute of Dog Grooming',
          image:
            'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg',
          date_issued: 1610224700,
          date_expired: 1925757500,
        },
      ]);
      const res = await request(server).get(
        '/certifications/Groomer/00ultwew80Onb2vOT4x6'
      );

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(Certifications.getBy.mock.calls.length).toBe(1);
    });
    it('should return 404 when there are no certifications found', async () => {
      Certifications.getBy.mockResolvedValue([]);
      const res = await request(server).get(
        '/certifications/Groomer/00ultwew80Onb2vOT4x6'
      );

      expect(res.status).toBe(404);
    });
  });

  describe('GET /certifications/:certificationId', () => {
    it('should return 200 when certification is found', async () => {
      Certifications.getById.mockResolvedValue({
        id: 1,
        groomer_id: '00ultwew80Onb2vOT4x6',
        title: 'Long-Legged Terriers',
        institute: 'Institute of Dog Grooming',
        image:
          'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg',
        date_issued: 1610224700,
        date_expired: 1925757500,
      });
      const res = await request(server).get('/certifications/1');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(Certifications.getById.mock.calls.length).toBe(1);
    });

    it('should return 404 when certification is not found', async () => {
      Certifications.getById.mockResolvedValue([]);
      const res = await request(server).get('/certification/2');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('certification not found');
    });
  });
  describe('DELETE /certifications/:certificationId', () => {
    it('should return 200 on successful delete', async () => {
      Certifications.remove.mockResolvedValue({
        id: 1,
        groomer_id: '00ultwew80Onb2vOT4x6',
        title: 'Long-Legged Terriers',
        institute: 'Institute of Dog Grooming',
        image:
          'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg',
        date_issued: 1610224700,
        date_expired: 1925757500,
      });
      const res = await request(server).delete('/certifications/1');

      expect(res.status).toBe(200);
      expect(res.body.deleted);
      expect(res.body.deleted.id).toBe(1);
    });
    // it(
    // 'should return 403 when a user tries to delete a certification that is not theirs'
    // );
    // it('should return 404 when certification not found');
  });
});
