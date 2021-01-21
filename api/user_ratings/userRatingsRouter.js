const express = require('express');
const authRequired = require('../middleware/authRequired');
const UserRatingsModel = require('./userRatingsModel');
const router = express.Router();

router.delete('/:ratingId', authRequired, async (req, res) => {
  try {
    //todo: for this endpoint maybe should have middleware to confirm if
    // the profile requesting the delete is the one that made it

    const deleted = await UserRatingsModel.remove(req.params.ratingId);
    res.status(201).json(deleted);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error deleting user rating.' });
  }
});

router.get('/:ratingId', authRequired, async (req, res) => {
  try {
    const rating = await UserRatingsModel.getBy(req.params.ratingId);
    res.status(200).json(rating);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error getting user rating.' });
  }
});

router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    const groomerRatings = await UserRatingsModel.getAllBy(
      req.params.groomerId
    );
    res.status(200).json(groomerRatings);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error getting all ratings' });
  }
});

module.exports = router;
