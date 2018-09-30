'use strict';

const express = require('express');
const signupController = require('../controlers/signupController');
const router = express.Router();

/* GET singup page. */
router.get('/', function(req, res) {
  console.log('Matched signup route');
  res.render('index', { appTitle: 'NecuKuci Travel Tracker: Sign Up Today!'});
});

/* POST singup request. */
router.post('/signup', signupController.signupUser);

module.exports = router;