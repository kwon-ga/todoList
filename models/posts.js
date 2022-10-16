'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(models.Comments, {
        foreignKey: 'commentId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Posts.hasMany(models.Todos, {
        foreignKey: 'todoId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Posts.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade"
      });
    }
  }
  Posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    likesNum: {
      type: DataTypes.INTEGER
    },
    commentsNum: {
      type: DataTypes.INTEGER
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
    modelName: 'Posts',
  });
  return Posts;
};