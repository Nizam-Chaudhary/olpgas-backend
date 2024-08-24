'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('User', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			fullName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			age: {
				type: Sequelize.INTEGER,
			},
			gender: {
				type: Sequelize.ENUM('male', 'female'),
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phoneNumber: {
				type: Sequelize.STRING,
			},
			address: {
				type: Sequelize.STRING,
			},
			city: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('User')
	},
}
