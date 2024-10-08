require('dotenv').config()

module.exports = {
	development: {
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
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
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		dialect: 'postgres',
		dialectOptions: { ssl: { require: true } },
	},
}
