'use strict';

const express = require('express');
const router = express.Router();

const locationController = require('../../controlers/locationController');

// Home page route
router.get('/', function(req, res) {
  res.send('API Home page');
});

// /location?userId=mdmilic&detailLevel=3 api
router.get('/location', locationController.get_location);

module.exports = router;
