const { executeApi } = require('../controllers/apiController');
const express = require('express');
const router = express.Router();

router.post('/execute-api', executeApi);

module.exports = router;

