const express = require('express');
const authRequired = require('../middleware/authRequired');
const searchModel = require('../groomer_search/groomerSearchModel');
const router = express.Router();

/**
 * @swagger
 *
 * /groomerSearch:
 *  get:
 *    description: Returns a list of all groomers with locations, animals and their serivces
 *    summary: Get a list of all groomers with locations, animals and their serivces
 *    security:
 *      - okta: []
 *    tags:
 *      - groomerSearch
 *    responses:
 *      200:
 *        description: Groomers data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  location_id: 1
 *                  latitude: 42.7478
 *                  longitude: -73.7605
 *                  animals:
 *                    - animal_id: 1
 *                      animal_type: 'Cat'
 *                      services:
 *                        - service_id: 1
 *                          service_name: "Ear Cleaning"
 *                          service_cost: 20
 *                        - service_id: 2
 *                          service_name: "Nail Cutting"
 *                          service_cost: 15
 *                    - animal_id: 2
 *                      animal_type: 'Dog'
 *                      services:
 *                        service_id: 1
 *                        service_name: "Ear Cleaning"
 *                        service_cost: 30
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/', authRequired, async (req, res, next) => {
  try {
    const groomers = await searchModel.findAll();
    const total_groomers = groomers.length;

    let location = {};
    let result = {};

    for (let i = 0; i < total_groomers; i++) {
      const location_id = groomers[i]['location_id'];
      const animal_id = groomers[i]['animal_id'];
      const animal_type = groomers[i]['animal_type'];
      const service_id = groomers[i]['service_id'];
      const service_name = groomers[i]['service_name'];
      const service_cost = groomers[i]['service_cost'];
      const latitude = groomers[i]['latitude'];
      const longitude = groomers[i]['longitude'];
      const name = groomers[i]['name'];
      const email = groomers[i]['email'];

      if (!location[location_id])
        location[location_id] = {
          name: name,
          email: email,
          location_id: location_id,
          latitude: latitude,
          longitude: longitude,
          animals: {},
        };

      if (!location[location_id]['animals'][animal_id]) {
        const animalObj = {
          animal_id: animal_id,
          animal_type: animal_type,
          services: [],
        };
        location[location_id]['animals'][animal_id] = animalObj;
      }

      const service_obj = {
        service_id: service_id,
        service_name: service_name,
        service_cost: service_cost,
      };
      location[location_id]['animals'][animal_id]['services'].push(service_obj);
    }

    result['locations'] = [];

    Object.keys(location).forEach((key) => {
      result['locations'].push(location[key]);
    });

    Object.keys(result['locations']).forEach((key) => {
      const animals_arr = [];
      Object.keys(result['locations'][key]['animals']).forEach((key1) => {
        animals_arr.push(result['locations'][key]['animals'][key1]);
      });
      result['locations'][key]['animals'] = animals_arr;
    });

    res.json(result['locations']);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
