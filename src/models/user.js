'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      this.belongsToMany(models.Role, {
        through: 'User_Roles',

      });
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 300],
        isAlphanumeric: true,
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  //I think i should keep it as sync one only but here is the async version for learning purpose
  User.beforeCreate(async (user) => {
    try {
      const encryptedPassword = await bcrypt.hash(user.password, SALT);
      user.password = encryptedPassword;
    } catch (error) {
      throw new Error('Error hashing password:', error);
    }
  });

  return User;
};
