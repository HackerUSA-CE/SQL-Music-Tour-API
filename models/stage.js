'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Event, StageEvent, SetTime }) {
			Stage.belongsToMany(Event, {
				through: StageEvent,
				foreignKey: 'stage_id',
				as: 'events'
			})
			Stage.hasMany(SetTime, {
				foreignKey: 'stage_id',
				as: 'set_times'
			})
		}
	}
	Stage.init(
		{
			stage_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			stage_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			capacity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			sound_system: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Stage',
			timestamps: false,
		}
	);
	return Stage;
};
