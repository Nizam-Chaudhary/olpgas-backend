'use strict'
const { DataTypes } = require('sequelize')

const sequelize = require('../../config/database')
const room = require('./room')
const bcrypt = require('bcrypt')
const AppError = require('../../utils/appError')

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
			validate: {
				notNull: {
					msg: 'Name cannot be null',
				},
				notEmpty: {
					msg: 'Name cannot be empty',
				},
				is: {
					args: '^[A-Za-z]+(?: {1,}[A-Za-z]+)*$',
					msg: 'Invalid name',
				},
			},
		},
		age: {
			type: DataTypes.INTEGER,
			validate: {
				isNumeric: {
					msg: 'Age contains only numbers',
				},
				is: {
					args: '^(1[2-9]|[2-9][0-9]|1[01][0-9]|120)$',
					msg: 'Invalid age',
				},
			},
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
				notNull: {
					msg: 'Email cannot be null',
				},
				notEmpty: {
					msg: 'Email cannot be empty',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8, 100],
					msg: 'Password length must be at least 8 characters',
				},
				notNull: {
					msg: 'Password cannot be null',
				},
			},
		},
		confirmPassword: {
			type: DataTypes.VIRTUAL,
			set(value) {
				if (value === this.password && value.length >= 8) {
					const hashPassword = bcrypt.hashSync(value, 10)
					this.setDataValue('password', hashPassword)
				} else if (value !== this.password) {
					throw new AppError('Password and Confirm Password must be same', 400)
				} else if (value.length <= 8) {
					throw new AppError('Password length must be greater than 8', 400)
				}
			},
		},
		phoneNumber: {
			type: DataTypes.STRING,
			validate: {
				is: {
					args: /^\d{10}$/,
					msg: 'Invalid mobile number',
				},
			},
		},
		address: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'Address cannot be empty',
				},
			},
		},
		city: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'City cannot be empty',
				},
			},
		},
		state: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					msg: 'State cannot be empty',
				},
			},
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
