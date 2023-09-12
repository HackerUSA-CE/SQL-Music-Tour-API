'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event,StageEvent,SetTime } ){
      // define association here
     
          // events
          Stage.belongsToMany(Event, {
            foreignKey: 'stage_id',
            as: 'events',
            through: StageEvent
          })
          //SET TIME
          Stage.hasMany( SetTime,{
            foreignKey:'set_time_id',
            as:'set_time'
          })
        }
      }
      
    
  
  Stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps: false
  })
  return Stage
}