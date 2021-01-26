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

/**
 * @swagger
 * /userRatings:
 *  get:
 *    description: Get a specific user rating by rating id.
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    parameters:
 *      ratingId:
 *        type: integer
 *        example: 0
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: a specific user rating
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 */

router.get('/:ratingId', authRequired, async (req, res) => {
  try {
    const rating = await UserRatingsModel.getBy(req.params.ratingId);
    res.status(200).json(rating);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ error: 'Error getting user rating.' });
  }
});

/**
 * @swagger
 * /userRatings:
 *  get:
 *    description: Get all user ratings for a given groomer id
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    parameters:
 *      groomerId:
 *        type: string
 *        example: '0x4v96mhmswefsoy4qwm'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: an array of all user ratings for a given groomer
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 */

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
