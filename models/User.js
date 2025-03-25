import { DataTypes } from 'sequelize';

const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return UserModel;
};

export default User;
