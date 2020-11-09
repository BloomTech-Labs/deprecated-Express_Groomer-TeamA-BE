const express = require('express');
const authRequired = require('../middleware/authRequired');
const serviceModel = require('./serviceModel');
const router = express.Router();
const {
  validateServiceID,
  validateServiceData,
  isServiceUnique,
} = require('../middleware/service');

/**
 * @swagger
 * components:
 *  schemas:
 *    Service:
 *      type: object
 *      required:
 *        - id
 *        - name
 *      properties:
 *        id:
 *          type: integer
 *          description: This is a primary key
 *        name:
 *          type: string
 *      example:
 *        id: '0'
 *        name: 'Haircut'
 *
 * /services:
 *  get:
 *    description: Returns a list of services
 *    summary: Get a list of all service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    responses:
 *      200:
 *        description: array of services
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Service'
 *              example:
 *                - id: '1'
 *                  name: 'Haircut'
 *                - id: '2'
 *                  name: 'Nail Cutting'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    const services = await serviceModel.findAll();
    res.json(services);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    serviceId:
 *      name: id
 *      in: path
 *      description: ID of the service to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /service/{id}:
 *  get:
 *    description: Find services by ID
 *    summary: Returns a single service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    parameters:
 *      - $ref: '#/components/parameters/serviceId'
 *    responses:
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Service not found'
 */
router.get(
  '/:id',
  authRequired,
  validateServiceID(),
  async (req, res, next) => {
    //return res.status(200).json(req.category);
    try {
      const id = req.params.id;
      const service = await serviceModel.findById(id);
      return res.status(200).json(service);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /service:
 *  post:
 *    summary: Add a service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    requestBody:
 *      description: Service object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Service'
 *    responses:
 *      400:
 *        description: 'Service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing service data'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Service created
 *                service:
 *                  $ref: '#/components/schemas/Service'
 */
router.post(
  '/',
  authRequired,
  validateServiceData(),
  isServiceUnique(),
  async (req, res, next) => {
    try {
      const payload = {
        name: req.body.name,
      };
      const service = await serviceModel.create(payload);
      return res
        .status(200)
        .json({ message: 'Service created', service: service[0] });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /service:
 *  put:
 *    summary: Update a service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    requestBody:
 *      description: Service object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Service'
 *    responses:
 *      400:
 *        description: 'Service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid service data'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Service update
 *                service:
 *                  $ref: '#/components/schemas/Service'
 */
router.put(
  '/',
  authRequired,
  validateServiceData(),
  validateServiceID(),
  isServiceUnique(),
  async (req, res, next) => {
    try {
      const payload = {
        id: req.body.id,
        name: req.body.name,
      };
      const service = await serviceModel.update(req.body.id, payload);
      return res
        .status(200)
        .json({ message: 'Service updated', service: service[0] });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /service/{id}:
 *  delete:
 *    summary: Remove a service
 *    security:
 *      - okta: []
 *    tags:
 *      - service
 *    parameters:
 *      - $ref: '#/components/parameters/serviceId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Service '1' was deleted.
 *                service:
 *                  $ref: '#/components/schemas/Service'
 */
router.delete(
  '/:id',
  authRequired,
  validateServiceID(),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await serviceModel.remove(id);
      return res
        .status(200)
        .json({
          message: `Service '${id}' was deleted.`,
          service: req.service,
        });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
