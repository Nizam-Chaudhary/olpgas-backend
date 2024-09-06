const router = require('express').Router()

const validateToken = require('../middleware/authMiddleware')
const RoomBookingController = require('../modules/roomBookingModule/roomBookingController')

router
	.route('/')
	.post(validateToken, RoomBookingController.addRoomBooking)
	.get(validateToken, RoomBookingController.getRoomBookingHistory)

module.exports = router
