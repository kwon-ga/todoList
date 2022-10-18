'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Todos.hasMany(models.Users, {
        foreignKey: 'userId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Todos.belongsTo(models.Posts, {
        foreignKey: 'postId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
    }
  }
  Todos.init({
    todoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING
    },
    done: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};