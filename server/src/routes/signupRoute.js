'use strict';

const express = require('express');
const router = express.Router();

/* GET singup page. */
router.get('/', function(req, res) {
  console.log('Matched signup route');
  res.render('index', { appTitle: 'NecuKuci Travel Tracker: Sign Up Today!'});
});

module.exports = router;