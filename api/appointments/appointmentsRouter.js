const express = require('express');
const authRequired = require('../middleware/authRequired');
const AppointmentsModel = require('./appointmentsModel');
const router = express.Router();

router.post('/', authRequired, async (req, res) => {
  try {
    const appointment = {
      groomer_id: 0,
      pet_id: 0,
      location_service_id: 0,
      service_provider_name: '',
      appointment_date: 0,
      appointment_time: 0,
      status: 0,
    };

    const newAppointment = await AppointmentsModel.create(appointment);

    res.status(201).json(newAppointment);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error creating new appointment' });
  }
});

module.exports = router;
