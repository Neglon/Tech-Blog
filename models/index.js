const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Set up associations
User.hasMany(Post, {
     foreignKey: 'userId' 
});

Post.belongsTo(User, { 
    foreignKey: 'userId' 
});

User.hasMany(Comment, { 
    foreignKey: 'userId' 
});

Comment.belongsTo(User, { 
    foreignKey: 'userId' 
});

Post.hasMany(Comment, { 
    foreignKey: 'postId' 
});

Comment.belongsTo(Post, { 
    foreignKey: 'postId' 
});