const express = require('express');
const authRequired = require('../middleware/authRequired');
const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const appointment = req.body;

    const newAppointment = await AppointmentsModel.create(appointment);

    res.status(201).json(newAppointment);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error creating new appointment' });
  }
});

module.exports = router;
