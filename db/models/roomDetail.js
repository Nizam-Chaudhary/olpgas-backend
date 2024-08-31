const { DataTypes } = require('sequelize')

const sequelize = require('../../config/database')

const roomDetail = sequelize.define(
	'RoomDetail',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			references: {
				model: 'Room',
				key: 'roomFeatureId',
			},
		},
		roomArea: {
			allowNull: false,
			type: DataTypes.INTEGER,
			validate: {
				notNull: {
					msg: 'Room area is required',
				},
				notEmpty: {
					msg: 'Room area cannot be empty',
				},
				min: {
					args: [100],
					msg: 'Room area must be greater than 100',
				},
			},
		},
		shareable: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},
		occupancy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Occupancy is required',
				},
				notEmpty: {
					msg: 'Occupancy cannot be empty',
				},
			},
		},
		roomType: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				notNull: {
					msg: 'Room type is required',
				},
				notEmpty: {
					msg: 'Room type cannot be empty',
				},
			},
		},
		rentAmount: {
			allowNull: false,
			type: DataTypes.DOUBLE,
			validate: {
				notNull: {
					msg: 'Rent amount is required',
				},
				notEmpty: {
					msg: 'Rent amount cannot be empty',
				},
			},
		},
		deposit: {
			allowNull: false,
			type: DataTypes.DOUBLE,
			validate: {
				notNull: {
					msg: 'Deposit is required',
				},
				notEmpty: {
					msg: 'Deposit cannot be empty',
				},
			},
		},
		description: {
			allowNull: false,
			type: DataTypes.TEXT,
			validate: {
				notNull: {
					msg: 'Description is required',
				},
				notEmpty: {
					msg: 'Description cannot be empty',
				},
			},
		},
		suitableFor: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.STRING),
			validate: {
				notNull: {
					msg: 'Suitable for is required',
				},
				notEmpty: {
					msg: 'Suitable for cannot be empty',
				},
				min: {
					args: 1,
					msg: 'Please add suitable for',
				},
			},
		},
		features: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.STRING),
			validate: {
				notNull: {
					msg: 'Features is required',
				},
				notEmpty: {
					msg: 'Features cannot be empty',
				},
				min: {
					args: 1,
					msg: 'Please add suitable for',
				},
			},
		},
		ratings: {
			allowNull: false,
			type: DataTypes.DOUBLE,
			validate: {
				notNull: {
					msg: 'Ratings is required',
				},
				notEmpty: {
					msg: 'Ratings cannot be empty',
				},
			},
		},
		imageUrls: {
			allowNull: true,
			type: DataTypes.ARRAY(DataTypes.BLOB),
			validate: {
				notEmpty: {
					msg: 'Images cannot be empty',
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

module.exports = roomDetail
