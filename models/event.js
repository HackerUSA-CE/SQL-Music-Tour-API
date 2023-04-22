'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Stage, StageEvent, MeetGreet, SetTime }) {
			Event.belongsToMany(Stage, {
				through: StageEvent,
				foreignKey: 'event_id',
				as: 'stages'
			})
			Event.hasMany(MeetGreet, {
				foreignKey: 'event_id',
				as: 'meet_greets'
			})
			Event.hasMany(SetTime, {
				foreignKey: 'event_id',
				as: 'set_times'
			})
		}
	}
	Event.init(
		{
			event_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			start_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Event',
			timestamps: false,
		}
	);
	return Event;
};
