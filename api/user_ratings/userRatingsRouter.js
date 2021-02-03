const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const { verifyUserRatingBody } = require('../middleware/userRating');
const UserRatingsModel = require('../user_ratings/userRatingsModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    NewRating:
 *      type: Object
 *      required:
 *       - groomer_id
 *       - location_service_id
 *       - review_point
 *       - feedback
 *      properties:
 *       groomer_id:
 *        type: string
 *        example: '00ultwew80Onb2vOT4x6'
 *       location_service_id:
 *        type: integer
 *        example: 1
 *       review_point:
 *        type: integer
 *        example: 5
 *       feedback:
 *        type: string
 *        example: "Best Cat Trim in Town!"
 *    Rating:
 *      type: Object
 *      properties:
 *       id:
 *        type: integer
 *        example: 1
 *       groomer_id:
 *        type: string
 *        example: '00ultwew80Onb2vOT4x6'
 *       location_service_id:
 *        type: integer
 *        example: 1
 *       review_point:
 *        type: integer
 *        example: 5
 *       feedback:
 *        type: string
 *        example: "Best Cat Trim in Town!"
 *  parameters:
 *    RatingId:
 *     in: path
 *     schema:
 *      type: integer
 *     required: true
 *     example: 1
 *
 * /userRatings/:
 *  post:
 *    description: create new user rating
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    requestBody:
 *      content:
 *        application/json:
 *          $ref: '#/components/schemas/NewRating'
 *    responses:
 *      201:
 *        description: user rating created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

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

/**
 * @swagger
 * /userRatings/:groomerId/:
 *  get:
 *    description: Get all of a groomers ratings by their groomer id
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    parameters:
 *      - $ref: '#/components/parameters/GroomerId'
 *    responses:
 *      200:
 *        description: Array of user Ratings
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Rating'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    const groomerRatings = await UserRatingsModel.getAllBy({
      groomer_id: req.params.groomerId,
    });
    res.status(200).json(groomerRatings);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting all ratings' });
  }
});
/**
 * @swagger
 * /userRatings/:groomerId/:
 *  get:
 *    description: Get a single groomer's rating
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    parameters:
 *      - $ref: '#/components/parameters/GroomerId'
 *      - $ref: '#/components/parameters/RatingId'
 *    responses:
 *      200:
 *        description: User Rating Data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:groomerId/:ratingId', authRequired, async (req, res) => {
  try {
    const [rating] = await UserRatingsModel.getBy({
      id: req.params.ratingId,
    });
    res.status(200).json(rating);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error getting user rating.' });
  }
});
/**
 * @swagger
 * /userRatings/:groomerId/:
 *  delete:
 *    description: Delete a single groomer's rating
 *    security:
 *      - okta: []
 *    tags:
 *      - userRatings
 *    parameters:
 *      - $ref: '#/components/parameters/GroomerId'
 *      - $ref: '#/components/parameters/RatingId'
 *    responses:
 *      200:
 *        description: Deleted User Rating Data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.delete('/:groomerId/:ratingId', authRequired, async (req, res) => {
  try {
    //todo: for this endpoint should have middleware to confirm if
    // the profile requesting the delete is the one that made it

    const deleted = await UserRatingsModel.remove(req.params.ratingId);
    console.log({ deleted });
    res.status(200).json(deleted);
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ error: 'Error deleting user rating.' });
  }
});

module.exports = router;
