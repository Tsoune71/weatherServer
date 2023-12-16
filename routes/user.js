const router = require('express').Router();
const req = require('../database/user')

router.post('/login',req.login)
router.post('/signUp',req.signUp)

module.exports = router;