const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
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
            model: 'User',
            key: 'id',
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post', 
            key: 'id', 
        }
    }
}, {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
});

module.exports = Comment;