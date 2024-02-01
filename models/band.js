const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URI);

export default class Band extends Model {}

Band.init({}, { sequelize, modelName: 'Band', tableName: 'band', timestamps: false });
