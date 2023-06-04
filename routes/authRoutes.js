const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.post('/signIn', controllers.authController.signIn)

module.exports = router
