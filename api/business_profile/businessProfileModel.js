const db = require('../../data/db-config');

const createBusinessProfile = (profile, groomerID) => {
  profile.profile_id = groomerID;
  return db('business_profiles').insert(profile).returning('*');
};

const createCoverImage = (image) => {
  return db('groomer_cover_images').insert(image).returning('*');
};

const getBusinessProfile = async (groomerID) => {
  // use promise.all
  // profile = get everything from business_profile table where groomer_id = groomerID
  const promises = [];
  const business_profile = db('business_profiles')
    .where({
      profile_id: groomerID,
    })
    .first()
    .select('*');
  // images = get all cover_images where groomerID = groomerID
  const groomer_cover_images = db('groomer_cover_images')
    .where({
      groomer_id: groomerID,
    })
    .returning('*');
  // location = get all groomer locations where profile_id = groomerID
  const location = await db('locations')
    .where({ profile_id: groomerID })
    .first()
    .select('*');
  const services = db('location_services')
    .where({ location_id: location.id })
    .returning('*');

  promises.push(business_profile, groomer_cover_images, services);

  const groomer_profile_info = await Promise.all(promises);

  return groomer_profile_info;
};

const getBusinessProfileObject = (profile) => {
  let businessProfile = {};
  businessProfile = profile[0];
  businessProfile.images = profile[1];
  businessProfile.services = profile[2];
  return businessProfile;
};

module.exports = {
  createBusinessProfile,
  createCoverImage,
  getBusinessProfile,
  getBusinessProfileObject,
};
