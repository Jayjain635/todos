"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => { 
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      password: DataTypes.STRING,
      profile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
