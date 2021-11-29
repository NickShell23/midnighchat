const express = require('express')
const router = express.Router()
const adsController = require('../controllers/ads.controller')
const models = require('../../db/models');
const { render } = require('pug');

router.get('/', function(req, res, next) {
    return res.render('index', {
      title: 'list of ads',
    });
    

    

/*     models.users.findAll().then(function(user) {
      res.render('index', {
        title: 'list of ads',
        user: user
      });
    }); */
});




  module.exports = router