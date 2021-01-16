const express = require('express');
const authRequired = require('../middleware/authRequired');
const BPModel = require('./businessProfileModel');
const router = express.Router();

router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    const businessProfile = await BPModel.getBusinessProfile(
      req.params.groomerId
    );
    res.status(200).json(businessProfile);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting groomer business profile.' });
  }
});

router.post('/:groomerId', authRequired, async (req, res) => {
  try {
    const businessProfile = await BPModel.createBusinessProfile(
      {
        groomer_service_heading: req.body.groomer_service_heading,
        service_intro: req.body.service_intro,
        why_choose_description: req.body.why_choose_description,
        business_name: req.body.business_name,
      },
      req.params.groomerId
    );

    const coverImagesPromises = [];
    if (req.body.groomer_cover_images) {
      req.body.groomer_cover_images.forEach((image) => {
        const coverImage = {
          image,
          groomer_id: req.params.groomerId,
        };
        coverImagesPromises.push(BPModel.createCoverImage(coverImage));
      });
    }
    const resolvedCoverImages = await Promise.all(coverImagesPromises);
    res.status(201).json({ businessProfile, resolvedCoverImages });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error creating groomer business profile' });
  }
});

module.exports = router;
