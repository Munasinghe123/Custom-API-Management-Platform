const{loadRegistry,getApiConfig} = require('../controllers/apiRegistry');
const express = require('express');
const router = express.Router();

router.get('/test/:apiname',getApiConfig);

module.exports = router;

