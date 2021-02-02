const express = require('express');
const authRequired = require('../middleware/authRequired');
const BPModel = require('./businessProfileModel');
const router = express.Router();

/**
 * @swagger
 *  components:
 *    parameters:
 *      groomerId:
 *         name: id
 *         in: path
 *         description: id of the groomer
 *         required: true
 *         example: 00ultwew80Onb2vOT4x6
 *         schema:
 *           type: string
 *
 * /businessProfile/:groomerId:
 *  get:
 *    description: Find business profile for groomer
 *    summary: Returns a business profile information
 *    security:
 *      - okta: []
 *    tags:
 *      - businessProfile
 *    parameters:
 *      - $ref: '#/components/parameters/groomerId'
 *    responses:
 *      200:
 *        description: business profile information
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                business_profile: object,
 *                groomer_cover_images: array
 *                services: array
 *                location: object
 *              example:
 *                {
 *                  "business_profile": {
 *                    "id": 1,
 *                    "profile_id": "00ultwew80Onb2vOT4x6",
 *                    "business_name": "Rabbid Rabbit Grooming",
 *                    "created_at": "2021-01-16T19:45:08.814Z",
 *                    "updated_at": "2021-01-16T19:45:08.814Z",
 *                    "why_choose_description": "lorem ipsum more paragraph",
 *                    "service_intro": "lorem ipsum more paragraph",
 *                    "groomer_service_heading": "professional pet care services"
 *                  },
 *                  "groomer_cover_images": [
 *                    {
 *                      "id": 1,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image1"
 *                    },
 *                    {
 *                      "id": 2,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image2"
 *                    },
 *                    {
 *                      "id": 3,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image3"
 *                    },
 *                    {
 *                      "id": 4,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image1"
 *                    },
 *                    {
 *                      "id": 5,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image2"
 *                    },
 *                    {
 *                      "id": 6,
 *                      "groomer_id": "00ultwew80Onb2vOT4x6",
 *                      "image": "image3"
 *                    }
 *                  ],
 *                  "services": [
 *                    {
 *                      "id": 0,
 *                      "service_id": 2,
 *                      "location_id": 1,
 *                      "animal_id": 2,
 *                      "service_cost": 100,
 *                      "created_at": "2021-01-16T19:44:52.825Z",
 *                      "updated_at": "2021-01-16T19:44:52.825Z",
 *                      "service_image": null,
 *                      "service_description": "a service for animals"
 *                    }
 *                  ],
 *                  "location": {
 *                    "id": 1,
 *                    "profile_id": "00ultwew80Onb2vOT4x6",
 *                    "is_mobile": false,
 *                    "address": "200 E Colfax Ave",
 *                    "country": "United States of America",
 *                    "state": "Colorado",
 *                    "city": "Denver",
 *                    "zip": 80203,
 *                    "phone_number": "3038675309",
 *                    "created_at": "2021-01-16T19:44:52.816Z",
 *                    "updated_at": "2021-01-16T19:44:52.816Z",
 *                    "latitude": 39.739445,
 *                    "longitude": -104.985
 *                  }
 *                }
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'profile information not found'
 */

router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    let businessProfile = await BPModel.getBusinessProfile(
      req.params.groomerId
    );
    businessProfile = await BPModel.getBusinessProfileObject(businessProfile);
    return businessProfile
      ? res.status(200).json(businessProfile)
      : res.status(404).json({ error: 'profile information not found' });
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting groomer business profile.' });
  }
});

/**
 * @swagger
 * /businessProfiles/:groomerId:
 *  post:
 *    summary: Create a business profile for a  groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - businessProfile
 *    requestBody:
 *      description: Business Profile information to create
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - groomer_service_heading
 *              - business_name
 *              - service_intro
 *              - why_choose_description
 *            properties:
 *              groomer_service_heading: string
 *              business_name: string
 *              service_intro: string
 *              why_choose_description: string
 *              groomer_cover_images: array
 *            example:
 *              {
 *	              "groomer_service_heading": "professional pet care services",
 *	              "business_name": "Rabbid Rabbit Grooming",
 *                "service_intro": "lorem ipsum more paragraph",
 *                "why_choose_description": "lorem ipsum more paragraph",
 *                "groomer_cover_images": ["image1", "image2", "image3"]
 *              }
 *    responses:
 *      400:
 *        description: 'Missing required property: _property_'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      201:
 *        description: a business profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                businessProfile: object
 *                resolvedCoverImage: array
 *              example:
 *                {
 *                   "businessProfile": [
 *                     {
 *                       "id": 3,
 *                       "profile_id": "00ultwew80Onb2vOT4x6",
 *                       "business_name": "Rabbid Rabbit Grooming",
 *                       "created_at": "2021-01-16T19:49:29.150Z",
 *                       "updated_at": "2021-01-16T19:49:29.150Z",
 *                       "why_choose_description": "lorem ipsum more paragraph",
 *                       "service_intro": "lorem ipsum more paragraph",
 *                       "groomer_service_heading": "professional pet care services"
 *                     }
 *                   ],
 *                   "resolvedCoverImages": [
 *                     [
 *                       {
 *                         "id": 4,
 *                         "groomer_id": "00ultwew80Onb2vOT4x6",
 *                         "image": "image1"
 *                       }
 *                     ],
 *                     [
 *                       {
 *                         "id": 5,
 *                         "groomer_id": "00ultwew80Onb2vOT4x6",
 *                         "image": "image2"
 *                       }
 *                     ],
 *                     [
 *                       {
 *                         "id": 6,
 *                         "groomer_id": "00ultwew80Onb2vOT4x6",
 *                         "image": "image3"
 *                       }
 *                     ]
 *                   ]
 *                 }
 */
router.post('/:groomerId', authRequired, async (req, res) => {
  try {
    const businessProfile = await BPModel.createBusinessProfile(
      {
        groomer_service_heading: req.body.groomer_service_heading,
        service_intro: req.body.service_intro,
        why_choose_description: req.body.why_choose_description,
        business_name: req.body.business_name,
      },
      req.params.groomerId
    );

    const coverImagesPromises = [];
    if (req.body.groomer_cover_images) {
      req.body.groomer_cover_images.forEach((image) => {
        const coverImage = {
          image: image,
          groomer_id: req.params.groomerId,
        };
        coverImagesPromises.push(BPModel.createCoverImage(coverImage));
      });
    }
    const resolvedCoverImages = await Promise.all(coverImagesPromises);
    res.status(201).json({ businessProfile, resolvedCoverImages });
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error creating groomer business profile' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    const [updated] = await BPModel.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'Error updating groomer business profile' });
  }
});

module.exports = router;
