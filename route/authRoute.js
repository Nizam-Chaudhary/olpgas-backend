const router = require('express').Router()
const { signup, login } = require('../controller/authController')

router.route('/signup').post(signup)

router.route('/login').get(login)

module.exports = router
