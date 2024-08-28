'use strict'
const { DataTypes } = require('sequelize')

const sequelize = require('../../config/database')
const roomDetail = require('./roomDetail')

const room = sequelize.define(
	'Room',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		roomName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bookingStatus: {
			type: DataTypes.ENUM('empty', 'partial', 'full'),
			allowNull: false,
		},
		occupancy: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		occupiedBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		roomFeatureId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		ownerId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id',
			},
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		deletedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		paranoid: true,
		freezeTableName: true,
		modelName: 'Room',
	}
)

room.hasOne(roomDetail, { foreignKey: 'id' })
roomDetail.belongsTo(room, { foreignKey: 'id' })

module.exports = room
