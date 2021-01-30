const authRequired = require('../middleware/authRequired');
const { verifyProfileIsGroomer } = require('../middleware/certifications');
const router = require('express').Router();
const Certifications = require('./certificationsModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Certification:
 *      type: Object
 *      required:
 *        - title
 *        - institute
 *        - image
 *        - date_issued
 *        - date_expired
 *      properties:
 *        id:
 *          type: integer
 *        title:
 *          type: string
 *        institute:
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
 *        institute: 'Institute of Dog Grooming'
 *        image:
 *          'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *        date_issued: 1610224700
 *        date_expired: 1925757500
 *
 * /certifications/:
 *  post:
 *    description: Creates a certification for the profile if the profile is a groomer profiles
 *    summary: Returns newly created certification
 *    security:
 *      - okta: []
 *    tags:
 *      - certification
 *    responses:
 *      200:
 *        description: groomer certification data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Certification'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.post('/', authRequired, verifyProfileIsGroomer, async (req, res) => {
  try {
    const cert = { ...req.body, groomer_id: req.profile.id };
    const [newCert] = await Certifications.createCertificate(cert);

    res.status(201).json({ newCert });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error creating certificate.' });
  }
});

/**
 * @swagger
 *  parameters:
 *    groomerId:
 *      name: id
 *      in: path
 *      description: ID of the groomer to get certifications for
 *      required: true
 *      example: '00ultwew80Onb2vOT4x6'
 *      schema:
 *        type: string
 *
 * /certifications/Groomer/{groomerId}:
 *  get:
 *    description: Find all certifications by groomerID
 *    summary: Returns all certifications for a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - certification
 *    parameters:
 *      - $ref: '#/components/parameters/groomerId'
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
 *                  institute: 'Institute of Dog Grooming'
 *                  image:
 *                    'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *                  date_issued: 1610224700
 *                  date_expired: 1925757500
 *                - id: 1
 *                  groomer_id: '00ultwew80Onb2vOT4x6'
 *                  title: 'Short-Legged Terriers'
 *                  institute: 'Institute of Dog Grooming'
 *                  image:
 *                    'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *                  date_issued: 1610224700
 *                  date_expired: 1925757500
 *      401:
 *        $ref: '#/compoinents/responses/UnauthorizedError'
 *      404:
 *        description: 'no certifications found'
 */
router.get('/Groomer/:groomerId', authRequired, async (req, res, next) => {
  try {
    const certifications = await Certifications.getBy({
      groomer_id: req.params.groomerId,
    });
    return certifications.length
      ? res.send(certifications)
      : res.status(404).json({ message: 'no certifications found' });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 *  components:
 *    parameters:
 *      certificationId:
 *        name: id
 *        in: path
 *        description: ID of the certification
 *        required: true
 *        example: 1
 *        schema:
 *          type: string
 *
 * /certifications/{certificationId}:
 *  get:
 *    description: Find certification by ID
 *    summary: Returns a single certification
 *    security:
 *      - okta: []
 *    tags:
 *      - certification
 *    parameters:
 *      - $ref: '#/components/parameters/certificationId'
 *    responses:
 *      200:
 *        description: A certification object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Certification'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'certification not found'
 */
router.get('/:certificationId', authRequired, async (req, res, next) => {
  try {
    const certification = await Certifications.getById(
      req.params.certificationId
    );
    return certification
      ? res.send(certification)
      : res.status(404).json({ message: 'certification not found' });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /certifications/{certificationId}:
 *  delete:
 *    summary: Delete Certification matching the Certification ID
 *    security:
 *      - okta: []
 *    tags:
 *      - certification
 *    parameters:
 *      - $ref: '#/components/parameters/certificationId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        description: 'You may only delete your own certifications'
 *      404:
 *        description: 'certification not found'
 *      200:
 *        description: The deleted certification object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Certification'
 */
router.delete('/:certificationId', authRequired, async (req, res, next) => {
  try {
    const certification = await Certifications.getById(
      req.params.certificationId
    );
    if (certification) {
      if (certification.groomer_id === req.profile.id) {
        try {
          const deleted = await Certifications.remove(
            req.params.certificationId
          );
          res.send({ deleted });
        } catch (error) {
          next(error);
        }
      }
      res
        .status(403)
        .json({ message: 'You may only delete your own certifications' });
    }
    res.status(404).json({ message: 'Certification does not exist' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
