const router = require('express').Router()
const { signup } = require('../controller/authController')

router.route('/signup').post(signup)

router.route('/login').get()

module.exports = router
