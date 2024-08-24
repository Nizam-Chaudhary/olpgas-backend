require('dotenv').config({ path: `${process.cwd()}/.env` })

module.exports = {
	development: {
		url: process.env.DB_URL,
		dialect: 'postgres',
		dialectOptions: { ssl: { require: true } },
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
}
