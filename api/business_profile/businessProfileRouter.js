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
      req.body,
      req.params.groomerId
    );

    const coverImagesPromises = [];
    if (req.body.coverImages) {
      req.body.coverImages.forEach((image) => {
        coverImagesPromises.push(
          BPModel.createCoverImage(image, req.params.groomerId)
        );
      });
    }
    const resolvedCoverImages = await Promise.all(coverImagesPromises);
    res.status(201).json({ businessProfile, resolvedCoverImages });
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error creating groomer business profile' });
  }
});

module.exports = { router };
