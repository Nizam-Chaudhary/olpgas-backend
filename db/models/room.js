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
			validate: {
				notNull: {
					msg: 'Room name cannot be null',
				},
				notEmpty: {
					msg: 'Room name cannot be empty',
				},
			},
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Address cannot be null',
				},
				notEmpty: {
					msg: 'Address cannot be empty',
				},
			},
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'City cannot be null',
				},
				notEmpty: {
					msg: 'City cannot be empty',
				},
			},
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'State cannot be null',
				},
				notEmpty: {
					msg: 'State cannot be empty',
				},
			},
		},
		bookingStatus: {
			type: DataTypes.ENUM('empty', 'partial', 'full'),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Booking status cannot be null',
				},
				isIn: {
					args: [['empty', 'partial', 'full']],
					msg: 'Booking status must be one of: empty, partial, full',
				},
				notEmpty: {
					msg: 'Booking status cannot be empty',
				},
			},
		},
		occupiedBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Occupied by cannot be null',
				},
				isInt: {
					msg: 'Occupied by must be an integer',
				},
				min: {
					args: [0],
					msg: 'Occupied by cannot be less than 0',
				},
				notEmpty: {
					msg: 'Occupied by cannot be empty',
				},
			},
		},
		roomFeatureId: {
			allowNull: false,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		ownerId: {
			type: DataTypes.UUID,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Owner ID cannot be null',
				},
				isUUID: {
					args: 4,
					msg: 'Owner ID must be a valid UUID',
				},
				notEmpty: {
					msg: 'Owner ID cannot be empty',
				},
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

room.hasOne(roomDetail, { foreignKey: 'id', sourceKey: 'roomFeatureId' })
roomDetail.belongsTo(room, { foreignKey: 'id' })

module.exports = room
