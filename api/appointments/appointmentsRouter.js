const express = require('express');
const authRequired = require('../middleware/authRequired');
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
 *        - appointment_date
 *        - appointment_time
 *        - status
 *      properties:
 *        id:
 *          type: integer
 *        groomer_id:
 *          type: integer
 *        customer_id:
 *          type: integer
 *        pet_id:
 *          type: integer
 *        location_service_id:
 *          type: integer
 *        service_provider_name:
 *          type: string
 *        appointment_date:
 *          type: string
 *          format: date
 *        appointment_time:
 *          type: string
 *          format: time
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
 *            id: 11,
              groomer_id: "6jknxiznooy5lzesvzlk",
              customer_id: "00ultx74kMUmEW8054x6",
              pet_id: 6,
              location_service_id: 7,
              service_provider_name: "Roger's Rabid Rabbits Grooming",
              appointment_date: "2020-10-19",
              appointment_time: "07:37:16",
              status: "Pending",
              created_at: "2020-10-05T19:30:32.123Z",
              updated_at: "2020-10-05T19:30:32.123Z"
 */
router.post('/', authRequired, async (req, res) => {
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
});

//READ
router.get('/', authRequired, async (req, res) => {
  try {
    const appointments = await AppointmentsModel.getAll(req.profile.id);
    res.status(200).json(appointments);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting appointments' });
  }
});

router.get('/:appointmentId', authRequired, async (req, res) => {
  try {
    const appointment = await AppointmentsModel.get(req.params.appointmentId);
    res.status(200).json(appointment);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting appointment' });
  }
});

//UPDATE
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

//DELETE
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
