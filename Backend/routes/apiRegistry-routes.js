const{executeApi} = require('../controllers/apiRegistry');
const express = require('express');
const router = express.Router();
const verifyToken  = require('../middleware/VerifyAccessToken')

router.post('/:apiname',verifyToken ,executeApi);

module.exports = router;

