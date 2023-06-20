const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:roomId', controllers.roomController.getRoom)

router.get('/', controllers.roomController.getRooms)

router.post('/available', controllers.roomController.getAvailableRooms)

router.post('/', controllers.roomController.createRoom)

router.put('/:roomId', controllers.roomController.updateRoom)

module.exports = router
