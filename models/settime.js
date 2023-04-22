'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class SetTime extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Band, Event, Stage }) {
			SetTime.belongsTo(Band, {
				foreignKey: 'band_id',
				as: 'band',
			});
			SetTime.belongsTo(Event, {
				foreignKey: 'event_id',
				as: 'event',
			});
			SetTime.belongsTo(Stage, {
				foreignKey: 'stage_id',
				as: 'stage',
			});
		}
	}
	SetTime.init(
		{
			set_time_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			event_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			stage_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			band_id: {
				type: DataTypes.INTEGER,
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
			modelName: 'SetTime',
			timestamps: false,
		}
	);
	return SetTime;
};
