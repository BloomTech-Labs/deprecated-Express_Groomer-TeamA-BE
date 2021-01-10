/*
 * This is an example of using middleware to secure routers.
 */
const Profiles = require('../profile/profileModel');
const createError = require('http-errors');

/**
 * A simple middleware that verifies that the type of profile given by a profile id is a groomer
 */
const verifyProfileIsGroomer = async (req, res, next) => {
  try {
    const profile = await Profiles.findById(req.body.groomer_id);
    if (!profile.user_type.match(/groomer/gi))
      throw new Error(
        'profile id either does not exist, or is not associated with a groomer'
      );
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = verifyProfileIsGroomer;
