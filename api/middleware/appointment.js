const appointmentsModel = require('../appointments/appointmentsModel');
const requiredAppointmentInfo = [
  'groomer_id',
  'pet_id',
  'location_service_id',
  'appointment_date_time',
  'status',
  'duration',
];

const validateAppointmentBody = (req, res, next) => {
  requiredAppointmentInfo.forEach((property) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, property)) {
      res.status(400).json({
        error: `Missing required appointment property: ${property}`,
      });
    }
  });
  next();
};

const validateAppointmentTime = async (req, res, next) => {
  try {
    const groomerApps = await appointmentsModel.getAll(req.body.groomer_id);
    groomerApps.forEach((appointment) => {
      const durationSeconds = appointment.duration * 60;
      const appEndTime = appointment.appointment_date_time + durationSeconds;
      if (
        req.body.appointment_date_time >= appointment.appointment_date_time &&
        req.body.appointment_date_time <= appEndTime
      )
        res.status(409).json({
          message: `The groomer already has an appointment schedule at the requested time`,
        });
    });
    next();
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error validating appointment time' });
  }
};

const validateAppointmentId = async (req, res, next) => {
  const appointmentId = req.params.appointmentId || req.body.appointment_id;

  try {
    const appointment = await appointmentsModel.getById(appointmentId);
    if (appointment == null) {
      res.status(404).json({
        error: `No appointment with id: ${req.params.appointmentId} `,
      });
    } else {
      req.appointment = [appointment];
      next();
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'Error validating appointment id' });
  }
};

module.exports = {
  validateAppointmentBody,
  validateAppointmentTime,
  validateAppointmentId,
};
