const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:reservationId', controllers.reservationController.getReservation)

router.get('/', controllers.reservationController.getReservations)

router.post('/', controllers.reservationController.createReservation)

router.put('/:reservationId', controllers.reservationController.updateReservation)

module.exports = router
