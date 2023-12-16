const router = require('express').Router();
const req = require('../database/weather')

router.post('/weather',req.weather)
router.post('/autocom',req.autocom)
module.exports = router;