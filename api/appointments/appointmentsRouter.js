const express = require('express');
const authRequired = require('../middleware/authRequired');
const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

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

router.get('/', authRequired, async (req, res) => {
  const profileId = req.profile.id;

  try {
    const appointments = await AppointmentsModel.getAll(profileId);
    res.status(200).json(appointments);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting appointments' });
  }
});

module.exports = router;
