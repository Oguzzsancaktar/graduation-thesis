const express = require('express')
const router = express.Router()

// Import Routes
const authRoutes = require('./authRoutes')
const guestRoutes = require('./guestRoutes')
const reservationRoutes = require('./reservationRoutes')
const roomRoutes = require('./roomRoutes')
const userRoutes = require('./userRoutes')

// Auth Routes
router.use('/auth', authRoutes)
// Guest Routes
router.use('/guests', guestRoutes)
// Reservation Routes
router.use('/reservations', reservationRoutes)
// Room Routes
router.use('/rooms', roomRoutes)
// User Routes
router.use('/users', userRoutes)

module.exports = router
