const{executeApi} = require('../controllers/apiController');
const express = require('express');
const router = express.Router();
const verifyToken  = require('../middleware/VerifyAccessToken')

router.post('/:apiname',executeApi);

module.exports = router;

