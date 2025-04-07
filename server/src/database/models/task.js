'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  }
  Task.init({
    title: DataTypes.STRING,
    tag: DataTypes.STRING,
    desc: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};