const express = require('express');
const authRequired = require('../middleware/authRequired');
const {
  validateAppointmentBody,
  validateAppointmentTime,
} = require('../middleware/appointment');

const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Appointment:
 *      type: object
 *      required:
 *        - groomer_id
 *        - customer_id
 *        - pet_id
 *        - location_service_id
 *        - service_provider_name
 *        - appointment_date_time
 *        - status
 *      properties:
 *        groomer_id:
 *          type: string
 *        customer_id:
 *          type: string
 *        pet_id:
 *          type: integer
 *        location_service_id:
 *          type: integer
 *        service_provider_name:
 *          type: string
 *        appointment_date_time:
 *          type: integer
 *        status:
 *          type: string
 *          enum: ['Pending', 'Cancel', 'Done']
 *        created_at:
 *          type: string
 *          format: date-time
 *        updated_at:
 *          type: string
 *          format: date-time
 *      example:
 *        groomer_id: "6jknxiznooy5lzesvzlk"
 *        customer_id: "00ultx74kMUmEW8054x6"
 *        pet_id: 6
 *        location_service_id: 7
 *        service_provider_name: "Rabid Rabbits Grooming"
 *        appointment_date_time: 1610995967
 *        status: "Pending"
 *        created_at: "2020-10-05T19:30:32.123Z"
 *        updated_at: "2020-10-05T19:30:32.123Z"
 *    CreatedAppointment:
 *      type: object
 *      required:
 *        - groomer_id
 *        - customer_id
 *        - pet_id
 *        - location_service_id
 *        - service_provider_name
 *        - appointment_date_time
 *        - status
 *      properties:
 *        groomer_id:
 *          type: string
 *        customer_id:
 *          type: string
 *        pet_id:
 *          type: integer
 *        location_service_id:
 *          type: integer
 *        service_provider_name:
 *          type: string
 *        appointment_date_time:
 *          type: integer
 *        status:
 *          type: string
 *          enum: ['Pending', 'Cancel', 'Done']
 *        created_at:
 *          type: string
 *          format: date-time
 *        updated_at:
 *          type: string
 *          format: date-time
 *      example:
 *        groomer_id: "6jknxiznooy5lzesvzlk"
 *        customer_id: "00ultx74kMUmEW8054x6"
 *        pet_id: 6
 *        location_service_id: 7
 *        service_provider_name: "Rabid Rabbits Grooming"
 *        appointment_date_time: 1610995967
 *        status: "Pending"
 *        created_at: "2020-10-05T19:30:32.123Z"
 *        updated_at: "2020-10-05T19:30:32.123Z"
 *
 * /appointments:
 *  post:
 *    summary: Create an appointment with a groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - appointments
 *    requestBody:
 *      description: Appointment information to create Appointment
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatedAppointment'
 *    response:
 *      400:
 *        description: 'Missing required property: _property_'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      409:
 *        description: 'The groomer already has an appointment schedule at the requested time'
 *      200:
 *        description: An appointment object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                groomer_id:
 *                  type: string
 *                customer_id:
 *                  type: string
 *                pet_id:
 *                  type: integer
 *                location_service_id:
 *                  type: integer
 *                service_provider_name:
 *                  type: string
 *                appointment_date_time:
 *                  type: integer
 *                status:
 *                  type: string
 *                  enum: ['Pending', 'Cancel', 'Done']
 *                created_at:
 *                  type: string
 *                  format: date-time
 *                updated_at:
 *                  type: string
 *                  format: date-time
 */
router.post(
  '/',
  authRequired,
  validateAppointmentBody,
  validateAppointmentTime,
  async (req, res) => {
    const customer_id = req.profile.id;
    try {
      const appointment = req.body;
      appointment.customer_id = customer_id;

      const newAppointment = await AppointmentsModel.create(appointment);

      res.status(201).json(newAppointment);
    } catch (e) {
      console.error(e.stack);
      res.status(500).json({ error: 'Error creating new appointment' });
    }
  }
);

/**
 * @swagger
 * /appointments:
 *  get:
 *    description: Returns a list of all appointments for a customer or groomer
 *    summary: Get a list of all appointments for a customer or groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - appointments
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: appointment data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/'
 *              example:
 *                appointments:
 *                  - id: 1
 *                    groomer_id: "0x4v96mhmswefsoy4qwm"
 *                    customer_id: "00ultx74kMUmEW8054x6"
 *                    pet_id: 1
 *                    location_service_id: 1
 *                    service_provider_name: "Randy"
 *                    appointment_date_time: 1610995967
 *                    status: "Pending"
 *                    created_at: "2021-01-06T18:45:39.979Z"
 *                    updated_at: "2021-01-06T18:45:39.979Z"
 *                  - id: 2
 *                    groomer_id: "0x4v96mhmswefsoy4qwm"
 *                    customer_id: "00ultx74kMUmEW8054x6"
 *                    pet_id: 2
 *                    location_service_id: 1
 *                    service_provider_name: "Randy"
 *                    appointment_date_time: 1610736767
 *                    status: "Pending"
 *                    created_at: "2021-01-06T18:45:39.979Z"
 *                    updated_at: "2021-01-06T18:45:39.979Z"
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const appointments = await AppointmentsModel.getAll(req.profile.id);
    res.status(200).json(appointments);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting appointments' });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    appointmentId:
 *      name: id
 *      in: path
 *      description: ID of the appointment to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: string
 *
 * /appointments/{id}:
 *  get:
 *    description: Find appointment by ID
 *    summary: Returns a single appointment
 *    security:
 *      - okta: []
 *    tags:
 *      - appointments
 *    parameters:
 *      - $ref: '#/components/parameters/appointmentId'
 *    responses:
 *      200:
 *        description: An appointment object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'appointment not found'
 */
router.get('/:appointmentId', authRequired, async (req, res) => {
  try {
    const appointment = await AppointmentsModel.getById(
      req.params.appointmentId
    );
    res.status(200).json(appointment);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting appointment' });
  }
});

/**
 * @swagger
 * /appointments:
 *  put:
 *    summary: Update an appointment
 *    security:
 *      - okta: []
 *    tags:
 *      - appointments
 *    requestBody:
 *      description: Appointment object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            required:
 *              - appointment_id
 *            properties:
 *              appointment_id:
 *                 type: integer
 *              groomer_id:
 *                type: string
 *              customer_id:
 *                type: string
 *              pet_id:
 *                type: integer
 *              location_service_id:
 *                type: integer
 *              service_provider_name:
 *                type: string
 *              appointment_date_time:
 *                type: integer
 *              status:
 *                type: string
 *                enum: ['Pending', 'Cancel', 'Done']
 *            example:
 *              appointment_id: 1
 *              groomer_id: "6jknxiznooy5lzesvzlk"
 *              pet_id: 6
 *              location_service_id: 7
 *              service_provider_name: "Randy"
 *              appointment_date_time: 1610736767
 *              status: "Cancel"
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: An appointment object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 */
router.put('/', authRequired, async (req, res) => {
  try {
    const { appointment_id } = req.body;
    const appointmentChanges = req.body;
    const updatedAppointment = await AppointmentsModel.update(
      appointment_id,
      appointmentChanges
    );
    res.status(200).json(updatedAppointment);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

/**
 * @swagger
 * /appointments/{id}:
 *  delete:
 *    summary: Remove an appointment
 *    security:
 *      - okta: []
 *    tags:
 *      - appointments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the appointment
 *        required: true
 *        type: integer
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: An appointment object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 */
router.delete('/:appointmentId', async (req, res) => {
  try {
    const deleted = await AppointmentsModel.remove(req.params.appointmentId);
    res.status(200).json(deleted);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});

module.exports = router;
