const express = require('express');
const authRequired = require('../middleware/authRequired');
const {
  validateAppointmentBody,
  validateAppointmentTime,
  validateAppointmentId,
} = require('../middleware/appointment');

const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    NewAppointment:
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
 *          example: "00ultwew80Onb2vOT4x6"
 *        customer_id:
 *          type: string
 *          example: "00ulthapbErVUwVJy4x6"
 *        pet_id:
 *          type: integer
 *          example: 0
 *        location_service_id:
 *          type: integer
 *          example: 0
 *        service_provider_name:
 *          type: string
 *          example: "Pro Petwashers inc."
 *        appointment_date_time:
 *          type: integer
 *          example: 161175718
 *        status:
 *          type: string
 *          enum: ['Pending', 'Cancel', 'Done']
 *          example: Pending
 *    UpdateAppointment:
 *      type: object
 *      required:
 *        - appointment_id
 *      properties:
 *        appointment_id:
 *           type: integer
 *           example: 1
 *        groomer_id:
 *          type: string
 *          example: "00ultwew80Onb2vOT4x6"
 *        customer_id:
 *          type: string
 *          example: "00ulthapbErVUwVJy4x6"
 *        pet_id:
 *          type: integer
 *          example: 0
 *        location_service_id:
 *          type: integer
 *          example: 0
 *        service_provider_name:
 *          type: string
 *          example: "Pro Petwashers inc."
 *        appointment_date_time:
 *          type: integer
 *          example: 161175718
 *        status:
 *          type: string
 *          enum: ['Pending', 'Cancel', 'Done']
 *          example: Pending
 *    Appointment:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        groomer_id:
 *          type: string
 *          example: "00ultwew80Onb2vOT4x6"
 *        customer_id:
 *          type: string
 *          example: "00ulthapbErVUwVJy4x6"
 *        pet_id:
 *          type: integer
 *          example: 0
 *        location_service_id:
 *          type: integer
 *          example: 0
 *        appointment_date_time:
 *          type: integer
 *          example: 161175718
 *        status:
 *          type: string
 *          enum: ['Pending', 'Cancel', 'Done']
 *          example: Pending
 *        pet:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: "Spot"
 *            type:
 *              type: string
 *              example: "Dog"
 *            color:
 *              type: string
 *              example: "Red"
 *            date_of_birth:
 *              type: string
 *              format: date-time
 *              example: "2020-11-02T07:00:00.000Z"
 *            image_url:
 *              type: string
 *              format: url
 *              example: "https://s3.amazonaws.com/1.jpg"
 *        service:
 *          type: object
 *          properties:
 *            service_description:
 *              type: string
 *              example: "Nail Cutting"
 *            service_image:
 *              type: string
 *              format: url
 *              example: "https://s3.amazonaws.com/1.jpg"
 *            service_cost:
 *              type: integer
 *              example: 100
 *        location:
 *          type: object
 *          properties:
 *            location_name:
 *              type: string
 *              example: "Pro Pet Washers"
 *            street_address:
 *              type: string
 *              example: "200 E Colfax Ave"
 *            state:
 *              type: string
 *              example: "Colorado"
 *            city:
 *              type: string
 *              example: "Denver"
 *            zip:
 *              type: integer
 *              example: 80203
 *            country:
 *              type: string
 *              example: "United States of America"
 *            phone_number:
 *              type: string
 *              format: phone-number
 *              example: "3038675309"
 *            latitude:
 *              type: integer
 *              example: 39.739445
 *            longitude:
 *              type: integer
 *              example: -104.985
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
 *            $ref: '#/components/schemas/NewAppointment'
 *    responses:
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
 *              $ref: '#/components/schemas/Appointment'
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
      const created = await AppointmentsModel.create(appointment);
      const [newAppointment] = await AppointmentsModel.appointmentsObject([
        created,
      ]);
      res.status(201).json(newAppointment);
    } catch (e) {
      console.error(e.stack);
      res.status(500).json({ error: 'Error creating new appointment' });
    }
  }
);

/**
 * @swagger
 * components:
 *  parameters:
 *    appointmentStatus:
 *       name: status
 *       in: query
 *       description: status to filter appointments by
 *       required: false
 *       example: Pending
 *       schema:
 *         type: string
 *
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
 *                $ref: '#/components/schemas/Appointment'
 *
 * /appointments/?status:
 *  get:
 *    description: Returns a list of all appointments for a customer or groomer filtered by status
 *    summary: Get a list of all appointments for a customer or groomer
 *    security:
 *      - okta: []
 *    tags:
 *      - appointment
 *    parameters:
 *      - $ref: '#/components/parameters/appointmentStatus'
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
 *                $ref: '#/components/schemas/Appointment'
 */

router.get('/', authRequired, async (req, res) => {
  try {
    const appointments = await AppointmentsModel.getAll(req.profile.id);
    if (appointments.length) {
      if (req.query.status) {
        const statusAppointments = appointments.filter((appointment) => {
          return appointment.status === req.query.status ? appointment : null;
        });
        if (statusAppointments.length) {
          const user_appointments = AppointmentsModel.appointmentsObject(
            statusAppointments
          );
          res.status(200).json(user_appointments);
        } else {
          res.status(404).json({
            error: `no appointments found with status: ${req.query.status}`,
          });
        }
      } else {
        const user_appointments = AppointmentsModel.appointmentsObject(
          appointments
        );
        res.status(200).json(user_appointments);
      }
    } else {
      res.status(404).json({ error: 'no appointments found' });
    }
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
router.get(
  '/:appointmentId',
  authRequired,
  validateAppointmentId,
  async (req, res) => {
    try {
      const [appointment] = await AppointmentsModel.appointmentsObject(
        req.appointment
      );
      res.status(200).json(appointment);
    } catch (e) {
      console.error(e.stack);
      res
        .status(500)
        .json({ error: `Error getting appointment with id: ${req.params.id}` });
    }
  }
);

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
 *            $ref: '#/components/schemas/UpdateAppointment'
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
router.put('/', authRequired, validateAppointmentId, async (req, res) => {
  try {
    const { appointment_id } = req.appointment[0];
    const appointmentChanges = req.body;
    const updatedAppointment = await AppointmentsModel.update(
      appointment_id,
      appointmentChanges
    );
    const [appointment] = await AppointmentsModel.appointmentsObject([
      updatedAppointment,
    ]);
    res.status(200).json(appointment);
  } catch (e) {
    console.error(e.stack);
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
router.delete(
  '/:appointmentId',
  authRequired,
  validateAppointmentId,
  async (req, res) => {
    try {
      const deleted = await AppointmentsModel.remove(
        req.appointment[0].appointment_id
      );
      const [appointment] = await AppointmentsModel.appointmentsObject([
        deleted,
      ]);
      res.status(200).json(appointment);
    } catch (e) {
      console.error(e.stack);
      res.status(500).json({ error: 'Error deleting appointment' });
    }
  }
);

module.exports = router;
