'use strict'
const { DataTypes } = require('sequelize')

const sequelize = require('../../config/database')

const roomDetail = sequelize.define(
	'RoomDetail',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			references: {
				model: 'Room',
				key: 'roomFeatureId',
			},
		},
		roomArea: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		shareable: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},
		occupancy: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		roomType: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		rentAmount: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		deposit: {
			allowNull: false,
			type: DataTypes.DOUBLE,
		},
		description: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
		suitableFor: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		features: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		ratings: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		images: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.BLOB),
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

module.exports = roomDetail
