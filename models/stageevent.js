'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StageEvent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Stage, Event }) {
            StageEvent.belongsTo(Stage, {
                foreignKey: 'stage_id',
                as: 'stage',
            });
            StageEvent.belongsTo(Event, {
                foreignKey: 'event_id',
                as: 'event',
            });
        }
    }
    StageEvent.init(
        {
            stage_event_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            stage_id: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
            event_id: {
                type: DataTypes.SMALLINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'StageEvent',
            tableName: 'stages_events',
            timestamps: false,
        }
    );
    return StageEvent;
};
