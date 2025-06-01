'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    phoneNo: DataTypes.STRING,
    email: DataTypes.STRING,
    userType: DataTypes.ENUM('SUPER', 'NORMAL'),
    isVerified: DataTypes.BOOLEAN,
    isEnabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};