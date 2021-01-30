const express = require('express');
const authRequired = require('../middleware/authRequired');
const CustomerPetModel = require('./customerPetModel');
const AppointmentModel = require('../appointments/appointmentsModel');
const router = express.Router();
const {
  validateCustomerPetID,
  validateCustomerPetData,
  isPetUnique,
} = require('../middleware/customerPet');

/**
 * @swagger
 * components:
 *  schemas:
 *    CustomerPet:
 *      type: object
 *      required:
 *        - animal_id
 *        - pet_name
 *      properties:
 *        id:
 *          type: integer
 *        animal_id:
 *          type: integer
 *        pet_name:
 *          type: string
 *        color:
 *          type: string
 *        date_of_birth:
 *          type: date
 *        image_url:
 *          type: string
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *        rating: 3
 *        pets:
 *          - id: 1
 *            pet_name: "Rabby"
 *            color: "Red"
 *            date_of_birth: 2020-11-02
 *            phone_number: 884235223
 *            image_url: "https://s3.amazonaws.com/1.jpg"
 *            animal:
 *              id: 1
 *              animal_type: "Cat"
 *
 * /customerPets:
 *  get:
 *    description: Returns a list of pets by customer
 *    summary: Get a list of all pets by customer
 *    security:
 *      - okta: []
 *    tags:
 *      - customerPet
 *    responses:
 *      200:
 *        description: customer pet data
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CustomerPet'
 *              example:
 *                  id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                  rating: 3
 *                  pets:
 *                    - id: 1
 *                      pet_name: "Rabby"
 *                      color: "Red"
 *                      date_of_birth: 2020-11-02
 *                      phone_number: 884235223
 *                      image_url: "https://s3.amazonaws.com/1.jpg"
 *                      animal:
 *                        id: 1
 *                        animal_type: "Dog"
 *                    - id: 2
 *                      pet_name: "Tom"
 *                      color: "Brown"
 *                      date_of_birth: 2020-11-05
 *                      phone_number: 88422399
 *                      image_url: "https://s3.amazonaws.com/2.jpg"
 *                      animal:
 *                        id: 1
 *                        animal_type: "Cat"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    // Logged in user id.
    const profile_id = req.profile.id;
    const customer_pets = await CustomerPetModel.getCustomerAllPets(profile_id);

    if (customer_pets.length) {
      const pets_by_customer = CustomerPetModel.customerPetsObject(
        customer_pets
      );
      res.status(200).json(pets_by_customer);
    } else {
      res.status(200).json('Customer pets not exists');
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    petId:
 *      name: id
 *      in: path
 *      description: ID of the pet to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: string
 *
 * /customerPet/{id}:
 *  get:
 *    description: Find pet by ID
 *    summary: Returns a single pet
 *    security:
 *      - okta: []
 *    tags:
 *      - customerPet
 *    parameters:
 *      - $ref: '#/components/parameters/petId'
 *    responses:
 *      200:
 *        description: A pet object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CustomerPet'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'pet not found'
 */
router.get(
  '/:id',
  authRequired,
  validateCustomerPetID(),
  async (req, res, next) => {
    try {
      const customer_pet = CustomerPetModel.customerPetsObject(
        req.customer_pet
      );
      return res.status(200).json(customer_pet);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /customerPet:
 *  post:
 *    summary: Add a customer pet
 *    security:
 *      - okta: []
 *    tags:
 *      - customerPet
 *    requestBody:
 *      description: Customer pet object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            required:
 *              - animal_id
 *              - pet_name
 *            properties:
 *              id:
 *                type: integer
 *              animal_id:
 *                type: integer
 *              pet_name:
 *                type: string
 *              color:
 *                type: string
 *              date_of_birth:
 *                type: date
 *              image_url:
 *                type: string
 *            example:
 *              animal_id: 1
 *              pet_name: "Rabby"
 *              color: "Red"
 *              date_of_birth: 2020-11-02
 *              phone_number: 884235223
 *              image_url: "https://s3.amazonaws.com/1.jpg"
 *
 *    responses:
 *      400:
 *        description: 'Customer pet already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing customer pet data'
 *      200:
 *        description: A customer pet object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Customer pet created.
 *                pet:
 *                  $ref: '#/components/schemas/CustomerPet'
 */
router.post(
  '/',
  authRequired,
  validateCustomerPetData(),
  isPetUnique(),
  async (req, res, next) => {
    try {
      // Logged in user id.
      const profile_id = req.profile.id;

      const payload = {
        customer_id: profile_id,
        animal_id: req.body.animal_id,
        pet_name: req.body.pet_name,
        color: req.body.color,
        date_of_birth: req.body.date_of_birth,
        image_url: req.body.image_url,
      };

      // Create new customer pet.
      let customer_pet = await CustomerPetModel.create(payload);
      customer_pet = await CustomerPetModel.findCustomerPet(
        customer_pet[0].id,
        profile_id
      );
      customer_pet = CustomerPetModel.customerPetsObject(customer_pet);

      res
        .status(200)
        .json({ message: 'Customer pet created', customer: customer_pet });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /customerPet:
 *  put:
 *    summary: Update a customer pet
 *    security:
 *      - okta: []
 *    tags:
 *      - customerPet
 *    requestBody:
 *      description: Customer pet object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            required:
 *              - id
 *              - animal_id
 *              - pet_name
 *            properties:
 *              id:
 *                type: integer
 *              animal_id:
 *                type: integer
 *              pet_name:
 *                type: string
 *              color:
 *                type: string
 *              date_of_birth:
 *                type: date
 *              image_url:
 *                type: string
 *            example:
 *              id: 0
 *              animal_id: 1
 *              pet_name: "Rabby"
 *              color: "Red"
 *              date_of_birth: 2020-11-02
 *              phone_number: 884235223
 *              image_url: "https://s3.amazonaws.com/1.jpg"
 *    responses:
 *      400:
 *        description: 'Customer pet already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid customer pet data'
 *      200:
 *        description: A customer pet object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Customer pet updated
 *                animal:
 *                  $ref: '#/components/schemas/CustomerPet'
 */
router.put(
  '/',
  authRequired,
  validateCustomerPetData(),
  validateCustomerPetID(),
  isPetUnique(),
  async (req, res, next) => {
    try {
      // Logged in user id.
      const profile_id = req.profile.id;

      const payload = {
        customer_id: profile_id,
        animal_id: req.body.animal_id,
        pet_name: req.body.pet_name,
        color: req.body.color,
        date_of_birth: req.body.date_of_birth,
        image_url: req.body.image_url,
      };

      // Update customer pet
      let customer_pet = await CustomerPetModel.update(req.body.id, payload);
      customer_pet = await CustomerPetModel.findCustomerPet(
        customer_pet[0].id,
        profile_id
      );
      customer_pet = CustomerPetModel.customerPetsObject(customer_pet);

      res
        .status(200)
        .json({ message: 'Customer pet updated', customer: customer_pet });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /customerPet/{id}:
 *  delete:
 *    summary: Remove a customer pet
 *    security:
 *      - okta: []
 *    tags:
 *      - customerPet
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the customer pet
 *        required: true
 *        type: integer
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A customer pet object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Customer pet '1' was deleted.
 *                user:
 *                  $ref: '#/components/schemas/CustomerPet'
 */
router.delete(
  '/:id',
  authRequired,
  validateCustomerPetID(),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await CustomerPetModel.remove(id);
      const customer_pet = CustomerPetModel.customerPetsObject(
        req.customer_pet
      );
      res.status(200).json({
        message: `Customer pet '${id}' was deleted.`,
        customer: customer_pet,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
