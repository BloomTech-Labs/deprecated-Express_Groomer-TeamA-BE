const router = require('express').Router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Certification:
 *      type: Ojbect
 *      required:
 *        - groomer_id
 *        - title
 *        - insitute
 *        - image
 *        - date_issued
 *        - date_expired
 *      properties:
 *        id: 
 *          type: integer
 *        groomer_id:
 *          type: string
 *        title:
 *          type: string
 *        insitute:
 *          type: string
 *        image
 *          type: string
 *        date_issued:
 *          type: integer
 *          description: epoch timestampe for date certification is issued
 *        date_expired:
 *          type: integer
 *          description: epoch timestampe for date certification is issued
 *      example:
 *        id: 0
 *        groomer_id: '00ultwew80Onb2vOT4x6'
 *        title: 'Long-Legged Terriers'
 *        institute: 'Devry Institute of Dog Grooming'
 *        image:
 *          'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg'
 *        date_issued: 1610224700
 *        date_expired: 1925757500
 */

module.exports = router;
