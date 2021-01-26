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
  const location = await db('locations')
    .where({ profile_id: groomerID })
    .first()
    .select('*');
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
  // services = get all locationsServices where location_id = locations[id]?
  const services = db('location_services')
    .where({ location_id: location.id })
    .returning('*');

  promises.push(business_profile, groomer_cover_images, services);
  const groomer_profile_info = await Promise.all(promises);
  console.info({ gp_info: groomer_profile_info });
  const business_profile_info = {
    business_profile: groomer_profile_info[0],
    groomer_cover_images: groomer_profile_info[1],
    services: groomer_profile_info[2],
    location,
  };
  return business_profile_info;
};

module.exports = {
  createBusinessProfile,
  createCoverImage,
  getBusinessProfile,
};
