const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:userId', controllers.userController.getUser)

router.get('/', controllers.userController.getUsers)

router.post('/', controllers.userController.createUser)

router.put('/:userId', controllers.userController.updateUser)

module.exports = router
