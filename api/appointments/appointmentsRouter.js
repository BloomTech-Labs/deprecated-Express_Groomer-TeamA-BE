const express = require('express');
const authRequired = require('../middleware/authRequired');
const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

//CREATE
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
