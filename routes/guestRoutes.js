const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:guestId', controllers.guestController.getGuest)

router.get('/', controllers.guestController.getGuests)

router.post('/', controllers.guestController.createGuest)

router.put('/:guestId', controllers.guestController.updateGuest)

module.exports = router
