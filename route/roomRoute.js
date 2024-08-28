const router = require('express').Router()
const {
	addRoom,
	updateRoom,
	getRoom,
	deleteRoom,
} = require('../modules/roomModule/roomController')
const validateToken = require('../middleware/authMiddleware')

router.route('/').get(validateToken, getRoom).post(validateToken, addRoom)

router
	.route('/:id')
	.put(validateToken, updateRoom)
	.delete(validateToken, deleteRoom)

module.exports = router
