const express = require('express')
const router = express.Router()
const msgtodeleteController = require('../controllers/msgtodelete.controller')
const models = require('../../db/models');


// Retrieve all ads
router.get('/all', msgtodeleteController.findAll);

// Create a new ad
router.route('/new').post(msgtodeleteController.create);

// Retrieve a single ad with verif_code
router.get('/:verif_code', msgtodeleteController.findOne);

// Update an ad with randomcode
router.put('/:verif_code', msgtodeleteController.update);

// Delete an ad with id
router.delete('/:id', msgtodeleteController.delete);

module.exports = router