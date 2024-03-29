const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post', 
            key: 'id', 
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, 
{
    sequelize,
    modelName: 'comment',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
});

module.exports = Comment;