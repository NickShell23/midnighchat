const express = require('express')
const router = express.Router()
const locationsController = require('../controllers/locations.controller')
const models = require('../../db/models');


// Retrieve all ads
router.get('/all', locationsController.findAll);

// Create a new ad
router.route('/new').post(locationsController.create);

// Retrieve a single ad with verif_code
router.get('/:verif_code', locationsController.findOne);

// Update an ad with randomcode
router.put('/:verif_code', locationsController.update);

// Delete an ad with id
router.delete('/:id', locationsController.delete);

module.exports = router