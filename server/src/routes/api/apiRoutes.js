'use strict';

const express = require('express');
const router = express.Router();

const locationController = require('../../controlers/locationController');
const statsController = require('../../controlers/userStatsController');

// Home page route
router.get('/', function(req, res) {
  res.send('You\'ve got API Home page');
});

// /location?userId=mdmilic&detailLevel=3 api
router.get('/location', locationController.getLocation);
router.get('/stats', statsController.getUserStats);

module.exports = router;
