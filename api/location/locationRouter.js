const express = require('express');
const authRequired = require('../middleware/authRequired');
const LocationModel = require('./locationModel');
const router = express.Router();
const {
  validateLocationID,
  validateLocationData,
  isLocationUnique,
} = require('../middleware/location');

/**
 * @swagger
 * components:
 *  schemas:
 *    Location:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        is_mobo:
 *          type: boolean
 *        addres:
 *          type: string
 *        zip:
 *          type: integer
 *        phone_number:
 *          type: string
 *        latitude:
 *            type: number
 *        longitude:
 *            type: number
 *        country_id:
 *          type: integer
 *        state_id:
 *          type: integer
 *        city_id:
 *          type: integer
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *        rating: 3
 *        locations:
 *          - id: 1
 *            address: "917 Armstrong Blvd"
 *            is_mobo: false
 *            zip: 07712
 *            phone_number: 884235223
 *            latitude: 18887.56
 *            longitude: 188767.56
 *            country:
 *              id: 1
 *              name: "Uinted States"
 *            state:
 *              id: 1
 *              name: "New Jersey"
 *            city:
 *              id: 1
 *              name: "Ocean Township"
 *
 * /locations:
 *  get:
 *    description: Returns a list of locations by user
 *    summary: Get a list of all locations by user
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    responses:
 *      200:
 *        description: location data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Location'
 *              example:
 *                  id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  rating: 3
 *                  locations:
 *                    - id: 1
 *                      address: "917 Armstrong Blvd"
 *                      is_mobo: false
 *                      zip: 07712
 *                      phone_number: 884235223
 *                      latitude: 18887.56
 *                      longitude: 188767.56
 *                      country:
 *                        id: 1
 *                        name: "Uinted States"
 *                      state:
 *                        id: 1
 *                        name: "New Jersey"
 *                      city:
 *                        id: 1
 *                        name: "Ocean Township"
 *                    - id: 2
 *                      address: "Branchburg Ave"
 *                      is_mobo: false
 *                      zip: 08879
 *                      phone_number: 884235223
 *                      latitude: 18887.56
 *                      longitude: 1647.78
 *                      country:
 *                        id: 1
 *                        name: "United States"
 *                      state:
 *                        id: 2
 *                        name: "New Jersey"
 *                      city:
 *                        id: 2
 *                        name: "Hunterdown"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    // Logged in user id.
    const profile_id = req.profile.id;
    const user_locations = await LocationModel.getUserAllLocations(profile_id);

    if (user_locations.length) {
      const locations_by_user = LocationModel.getUserLocationsObject(
        user_locations
      );
      res.status(200).json(locations_by_user);
    } else {
      res.status(200).json('Location not exists');
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    locationId:
 *      name: id
 *      in: path
 *      description: ID of the location to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: string
 *
 * /location/{id}:
 *  get:
 *    description: Find locations by ID
 *    summary: Returns a single location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    parameters:
 *      - $ref: '#/components/parameters/locationId'
 *    responses:
 *      200:
 *        description: A location object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Location'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'location not found'
 */
router.get('/:id', authRequired, validateLocationID(), async (req, res) => {
  try {
    const user_location = LocationModel.getUserLocationsObject(req.location);
    return res.status(200).json(user_location);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /location:
 *  post:
 *    summary: Add a location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    requestBody:
 *      description: Location object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              id:
 *                type: integer
 *              is_mobo:
 *                type: boolean
 *              addres:
 *                type: string
 *              zip:
 *                type: integer
 *              phone_number:
 *                type: string
 *              latitude:
 *                type: number
 *              longitude:
 *                type: number
 *              country_id:
 *                type: integer
 *              state_id:
 *                type: integer
 *              city_id:
 *                type: integer
 *            example:
 *                address: "917 Armstrong Blvd"
 *                is_mobo: false
 *                zip: 07712
 *                phone_number: 884235223
 *                latitude: 18887.56
 *                longitude: 188767.56
 *                country_id: 1
 *                state_id: 1
 *                city_id: 47633
 *
 *
 *    responses:
 *      400:
 *        description: 'Location already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing location data'
 *      200:
 *        description: A location object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Location created
 *                user:
 *                  $ref: '#/components/schemas/Location'
 */
router.post(
  '/',
  authRequired,
  validateLocationData(),
  isLocationUnique(),
  async (req, res, next) => {
    try {
      // Logged in user id.
      const profile_id = req.profile.id;

      const payload = {
        profile_id: profile_id,
        is_mobo: req.body.is_mobo,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        zip: req.body.zip,
        phone_number: req.body.phone_number,
      };

      // Create location.
      let user_location = await LocationModel.create(payload);
      user_location = await LocationModel.findUserLocation(
        user_location[0].id,
        profile_id
      );
      user_location = LocationModel.getUserLocationsObject(user_location);

      res
        .status(200)
        .json({ message: 'Location created', user: user_location });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /location:
 *  put:
 *    summary: Update a location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    requestBody:
 *      description: Location object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              id:
 *                type: integer
 *              is_mobo:
 *                type: boolean
 *              addres:
 *                type: string
 *              zip:
 *                type: integer
 *              phone_number:
 *                type: string
 *              latitude:
 *                type: number
 *              longitude:
 *                type: number
 *              country_id:
 *                type: integer
 *              state_id:
 *                type: integer
 *              city_id:
 *                type: integer
 *            example:
 *                id: 0
 *                address: "917 Armstrong Blvd"
 *                is_mobo: false
 *                zip: 07712
 *                phone_number: 884235223
 *                latitude: 18887.56
 *                longitude: 188767.56
 *                country_id: 1
 *                state_id: 1
 *                city_id: 47633
 *    responses:
 *      400:
 *        description: 'Location already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid location data'
 *      200:
 *        description: A location object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Location updated
 *                animal:
 *                  $ref: '#/components/schemas/Location'
 */
router.put(
  '/',
  authRequired,
  validateLocationData(),
  validateLocationID(),
  isLocationUnique(),
  async (req, res, next) => {
    try {
      // Logged in user id.
      const profile_id = req.profile.id;

      const payload = {
        profile_id: profile_id,
        is_mobo: req.body.is_mobo,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        zip: req.body.zip,
        phone_number: req.body.phone_number,
      };

      // Update location
      let user_location = await LocationModel.update(req.body.id, payload);
      user_location = await LocationModel.findUserLocation(
        user_location[0].id,
        profile_id
      );
      user_location = LocationModel.getUserLocationsObject(user_location);
      res
        .status(200)
        .json({ message: 'Location updated', user: user_location });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /location/{id}:
 *  delete:
 *    summary: Remove a location
 *    security:
 *      - okta: []
 *    tags:
 *      - location
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the location
 *        required: true
 *        type: integer
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A location object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Location '1' was deleted.
 *                user:
 *                  $ref: '#/components/schemas/Location'
 */
router.delete(
  '/:id',
  authRequired,
  validateLocationID(),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await LocationModel.remove(id);
      const user_location = LocationModel.getUserLocationsObject(req.location);
      res
        .status(200)
        .json({
          message: `Location '${id}' was deleted.`,
          user: user_location,
        });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
