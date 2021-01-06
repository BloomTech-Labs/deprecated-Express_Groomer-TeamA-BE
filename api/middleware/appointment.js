const requiredAppointmentInfo = [
  'groomer_id',
  'pet_id',
  'location_service_id',
  'appointment_date',
  'appointment_time',
  'status',
];

const validateAppointmentBody = (req, res, next) => {
  requiredAppointmentInfo.forEach((property) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, property)) {
      res.status(401).json({
        error: `Missing required appointment property: ${property}`,
      });
    }
  });
  next();
};

module.exports = {
  validateAppointmentBody,
};
