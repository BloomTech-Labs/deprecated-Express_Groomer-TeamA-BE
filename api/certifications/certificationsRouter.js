const express = require('express');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const { verifyProfileIsGroomer } = require('../middleware/certifications');
const certificationsModel = require('./certificationsModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Certification:
 *      type: Ojbect
 *      required:
 *        - title
 *        - insitute
 *        - image
 *        - date_issued
 *        - date_expired
 *      properties:
 *        id:
 *          type: integer
 *        title:
 *          type: string
 *        insitute:
 *          type: string
 *        image:
 *          type: string
 *        date_issued:
 *          type: integer
 *          description: epoch timestamp for date certification is issued
 *        date_expired:
 *          type: integer
 *          description: epoch timestamp for date certification is issued
 *      example:
 *        id: 0
 *        title: 'Long-Legged Terriers'
 *        institute: 'Devry Institute of Dog Grooming'
 *        image:
 *          'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *        date_issued: 1610224700
 *        date_expired: 1925757500
 *
 * /certifications/:
 *  post:
 *    description: Creates a certification for the profile if the profile is a groomer profiles
 *    summary: Returns newly created certification
 *    secuirty:
 *      - okata: []
 *    tags:
 *      - certification
 *    responses:
 *      200:
 *        description: groomer certification data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Certification'
 *              example:
 *                - id: 0
 *                  groomer_id: '00ultwew80Onb2vOT4x6'
 *                  title: 'Long-Legged Terriers'
 *                  institute: 'Devry Institute of Dog Grooming'
 *                  image:
 *                    'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *                  date_issued: 1610224700
 *                  date_expired: 1925757500
 *                - id: 1
 *                  groomer_id: '00ultwew80Onb2vOT4x6'
 *                  title: 'Short-Legged Terriers'
 *                  institute: 'Devry Institute of Dog Grooming'
 *                  image:
 *                    'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *                  date_issued: 1610224700
 *                  date_expired: 1925757500
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'no certifications found'
 */

router.post('/', authRequired, verifyProfileIsGroomer, async (req, res) => {
  try {
    const cert = { ...req.body, groomer_id: req.profile.id };
    const [newCert] = await certificationsModel.createCertificate(cert);

    res.status(201).json({ newCert });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error creating certificate.' });
  }
});

module.exports = router;
