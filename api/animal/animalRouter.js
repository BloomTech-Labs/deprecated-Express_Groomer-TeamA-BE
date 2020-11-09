const express = require('express');
const authRequired = require('../middleware/authRequired');
const animalModel = require('./animalModel');
const router = express.Router();
const {validateAnimalID, validateAnimalData, isAnimalUnique} = require("../middleware/animal")

/**
 * @swagger
 * components:
 *  schemas:
 *    Animal:
 *      type: object
 *      required:
 *        - id
 *        - animal_type
 *      properties:
 *        id:
 *          type: integer
 *          description: This is a primary key 
 *        animal_type:
 *          type: string
 *      example:
 *        id: '0'
 *        animal_type: 'Cat'
 *
* /animals:
 *  get:
 *    description: Returns a list of animals
 *    summary: Get a list of all animals
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    responses:
 *      200:
 *        description: array of animals
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Animal'
 *              example:
 *                - id: '1'
 *                  animal_type: 'Cat'
 *                - id: '2'
 *                  animal_type: 'Dog'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/", authRequired, async (req, res, next) => {  
  try { 
        const animals = await animalModel.findAll()
        res.json(animals)

  } catch(err) {
        next(err)
  }
})

/**
 * @swagger
 * components:
 *  parameters:
 *    animalId:
 *      name: id
 *      in: path
 *      description: ID of the animal to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /animal/{id}:
 *  get:
 *    description: Find animals by ID
 *    summary: Returns a single animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    parameters:
 *      - $ref: '#/components/parameters/animalId'
 *    responses:
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Animal'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Animal not found'
 */
router.get("/:id", authRequired, validateAnimalID(), async (req, res, next) => {
  //return res.status(200).json(req.category);
  try { 
    const id = req.params.id
    const animal = await animalModel.findById(id)
    return res.status(200).json(animal)

  } catch(err) {
    next(err)
  } 
})


/**
 * @swagger
 * /animal:
 *  post:
 *    summary: Add a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    requestBody:
 *      description: Animal object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Animal'
 *    responses:
 *      400:
 *        description: 'Animal already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing animal data'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal created
 *                animal:
 *                  $ref: '#/components/schemas/Animal'
 */
router.post("/", authRequired, validateAnimalData(), isAnimalUnique(), async (req, res, next) => {    
  try {
      const payload = {
          animal_type:req.body.animal_type,          
      }          
      const animal = await animalModel.create(payload);
      return res.status(200).json({ message: 'Animal created', animal: animal[0]});
     
    } catch(err) {
      next(err);
  }
})


/**
 * @swagger
 * /animal:
 *  put:
 *    summary: Update a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    requestBody:
 *      description: Animal object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Animal'
 *    responses:
 *      400:
 *        description: 'Animal already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid animal data'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal update
 *                animal:
 *                  $ref: '#/components/schemas/Animal'
 */
router.put("/", authRequired, validateAnimalData(), validateAnimalID(), isAnimalUnique(), async (req, res, next) => {       
  try {
    const payload = {
      id:req.body.id,
      animal_type:req.body.animal_type         
    }
    const animal = await animalModel.update(req.body.id, payload);
    return res.status(200).json({ message: 'Animal updated', animal: animal[0]});

  } catch(err) {
    next(err);
  }
})

/**
 * @swagger
 * /animal/{id}:
 *  delete:
 *    summary: Remove a animal
 *    security:
 *      - okta: []
 *    tags:
 *      - animal
 *    parameters:
 *      - $ref: '#/components/parameters/animalId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A animal object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal '1' was deleted.
 *                animal:
 *                  $ref: '#/components/schemas/Animal'
 */
router.delete("/:id",  authRequired, validateAnimalID(), async (req, res, next) => {
  try {
    const id = req.params.id
    await animalModel.remove(id);
    return res.status(200).json({ message: `Animal '${id}' was deleted.`, animal: req.animal });
  } catch(err) {
    next(err);
  }
})

module.exports = router;
