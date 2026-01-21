const { executeApi,getAll } = require('../controllers/apiController');
const express = require('express');
const router = express.Router();

router.post('/execute-api', executeApi);
router.get('/get-all/:apiName', getAll);

module.exports = router;

