'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MeetGreet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Band, Event }) {
			MeetGreet.belongsTo(Band, {
				foreignKey: 'band_id',
				as: 'band'
			})
			MeetGreet.belongsTo(Event, {
				foreignKey: 'event_id',
				as: 'event'
			})
		}
	}
	MeetGreet.init(
		{
			meet_greet_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			event_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			band_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			meet_start_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			meet_end_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'MeetGreet',
			timestamps: false,
		}
	);
	return MeetGreet;
};
