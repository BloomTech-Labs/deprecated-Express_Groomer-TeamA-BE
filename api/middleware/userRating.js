const requiredBodyFields = [
  'groomer_id',
  'location_service_id',
  'review_point',
  'feedback',
];

const verifyUserRatingBody = (req, res, next) => {
  requiredBodyFields.forEach((property) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, property)) {
      res.status(400).json({
        error: `Missing required property: ${property}`,
      });
    }
    if (req.body.review_point < 1 || req.body.review_point > 5) {
      res.status(400).json({
        error: 'Review Point must be between 1 and 5',
      });
    }
  });
  next();
};

module.exports = {
  verifyUserRatingBody,
};
