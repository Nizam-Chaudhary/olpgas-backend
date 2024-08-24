'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Room', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			roomName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			bookingStatus: {
				type: Sequelize.ENUM('empty', 'partial', 'full'),
				allowNull: false,
			},
			occupiedBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			roomFeatureId: {
				type: Sequelize.UUID,
				allowNull: false,
				unique: true,
			},
			ownerId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
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
		await queryInterface.dropTable('Room')
	},
}
