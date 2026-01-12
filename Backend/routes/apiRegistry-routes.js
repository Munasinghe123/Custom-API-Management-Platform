const{loadRegistry,executeApi} = require('../controllers/apiRegistry');
const express = require('express');
const router = express.Router();

router.post('/:apiname',executeApi);

module.exports = router;

