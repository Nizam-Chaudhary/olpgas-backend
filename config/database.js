const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

const sequelize = new Sequelize(config)

;(async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database')
	}
})()

module.exports = sequelize
