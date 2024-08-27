const router = require('express').Router()
const {
	getUserDetail,
	updateUserDetail,
} = require('../controller/userController')
const validateToken = require('../middleware/authMiddleware')

router
	.route('/')
	.get(validateToken, getUserDetail)
	.patch(validateToken, updateUserDetail)

module.exports = router
