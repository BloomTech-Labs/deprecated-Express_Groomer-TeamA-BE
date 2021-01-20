const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const { verifyUserRatingBody } = require('../middleware/userRating');
const UserRatingsModel = require('../user_ratings/userRatingsModel');

router.post('/', authRequired, verifyUserRatingBody, async (req, res) => {
  try {
    const created = await UserRatingsModel.create({
      ...req.body,
      customer_id: req.profile.id,
    });
    if (created) {
      res.status(201).json({ created });
    }
    res.status(500).json({ error: 'error in creating error' });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'database error' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    const updated = await UserRatingsModel.update(req.params.id, req.body);
    if (updated) {
      res.status(200).json({ updated });
    }
    res.status(500).json({ error: 'error updating review' });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'database error' });
  }
});

module.exports = router;
