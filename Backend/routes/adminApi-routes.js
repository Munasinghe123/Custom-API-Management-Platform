
const{createApi,getApis} = require('../controllers/adminApiController');
const express = require('express');
const router = express.Router();
const verifyToken  = require('../middleware/VerifyAccessToken')

router.post('/create-api',createApi);
router.get('/get-apis',getApis);

module.exports = router;

