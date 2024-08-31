'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('RoomDetail', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				references: {
					model: 'Room',
					key: 'roomFeatureId',
				},
			},
			roomArea: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			shareable: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			occupancy: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			roomType: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			rentAmount: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			deposit: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			suitableFor: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			features: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			ratings: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			imageUrls: {
				allowNull: true,
				type: Sequelize.ARRAY(Sequelize.BLOB),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('RoomDetail')
	},
}
