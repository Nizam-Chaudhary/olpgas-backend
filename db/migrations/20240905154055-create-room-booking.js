'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'RoomBookings',
			{
				id: {
					allowNull: false,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				userId: {
					type: Sequelize.UUID,
					allowNull: false,
					references: {
						model: 'User',
						key: 'id',
					},
				},
				roomId: {
					type: Sequelize.UUID,
					allowNull: false,
					references: {
						model: 'Room',
						key: 'id',
					},
				},
				totalPersonBookedFor: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				rentAmount: {
					type: Sequelize.FLOAT,
					allowNull: false,
				},
				payDate: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				paymentStatus: {
					type: Sequelize.ENUM('paid', 'pending'),
					allowNull: false,
				},
				createdAt: {
					type: Sequelize.DATEONLY,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				deletedAt: {
					type: Sequelize.DATE,
				},
			},
			{
				Sequelize,
				modelName: 'RoomBookings',
				tableName: 'RoomBookings',
				paranoid: true,
			},
		)
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('RoomBookings')
	},
}
