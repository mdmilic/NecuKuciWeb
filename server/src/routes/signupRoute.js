'use strict';

const express = require('express');
const router = express.Router();

/* GET singup page. */
router.get('/', function(req, res) {
  res.render('index', { appTitle: 'A New Startup: Sign Up Today!'});
});

module.exports = router;