'use strict'
const { DataTypes } = require('sequelize')

const sequelize = require('../../config/database')
const room = require('./room')

const user = sequelize.define(
	'User',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
		},
		gender: {
			type: DataTypes.ENUM('male', 'female'),
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		state: {
			type: DataTypes.STRING,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		paranoid: true,
		freezeTableName: true,
		modelName: 'User',
	}
)

user.hasMany(room, { foreignKey: 'ownerId' })
room.belongsTo(user, { foreignKey: 'ownerId' })

module.exports = user
