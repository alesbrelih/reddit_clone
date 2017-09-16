const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } = require("graphql");
const moment = require("moment");
// mongoose
const mongoose = require("mongoose");

// mongoose models
const Comment = mongoose.model("Comment");
const RedditPost = mongoose.model("Post");
const User = mongoose.model("User");

//user type in graphql
const userType = new GraphQLObjectType({
    name: 'userType',
    description: 'Information about user object',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: (user) => {
                return user._id;
            }
            
        },
        username: {
            type: GraphQLString,
            resolve: (user) => {
                return user.username;
            }
        },
        email: {
            type: GraphQLString,
            resolve: (user) => {
                return user.email;
            }
        },
        comments: {
            type: new GraphQLList(commentType),
            resolve: (user) => {
                return user._comments.map(commentId => {
                    return Comment.findById(commentId);
                });
            }
        },
        redditposts: {
            type: new GraphQLList(redditPostType),
            resolve: (user) => {
                return user._redditposts.map(postId => {
                    console.log(postId);
                    return RedditPost.findById(postId);
                });
            }
        },
        deleted: {
            type: GraphQLBoolean,
            resolve: (user) => {
                return user.deleted;
            }
        },
        created: {
            type: GraphQLString,
            resolve: (user) => {
                return moment(user.created).format('YYYY-MM-DD');
            }
        }

    })
});

//cooment post type
const commentType = new GraphQLObjectType({
    name: 'commentType',
    descriptions: 'Information about comment object in db',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: (comment) => {
                return comment._id;
            }
        },
        content: {
            type: GraphQLString,
            resolve: (comment) => {
                return comment.content;
            }
        },
        user: {
            type: userType,
            resolve: (comment) => {
                return User.findById(comment._userID);
            }
        },
        post: {
            type: redditPostType,
            resolve: (comment) => {
                console.log("post id in comment ",comment._postId);
                return RedditPost.findById(comment._postId)
            }
        },
        deleted: {
            type: GraphQLBoolean,
            resolve: (comment) => {
                return comment.deleted;
            }
        },
        created: {
            type: GraphQLString,
            resolve: (comment) => {
                return moment(comment.created).format('YYYY-MM-DD');
            }
        }
    })
});


//reddit post type
const redditPostType = new GraphQLObjectType({
    name: 'redditPostType',
    description: 'Information about reddit post',
    fields: () => ({
        id:{
            type: GraphQLID,
            resolve: (post) => {
                return post._id;
            }
        },
        title: {
            type: GraphQLString,
            resolve: (post) => {
                return post.title;
            }
        },
        content: {
            type: GraphQLString,
            resolve: (post) => {
                return post.content;
            }
        },
        user: {
            type: userType,
            resolve: (post) => {
                return User.findById(post._userId);
            }
        },
        comments: {
            type: new GraphQLList(commentType),
            resolve: (post) => {
                return post._comments.map(commentId => {
                    return Comment.findById(commentId);
                })
            }
        },
        deleted: {
            type: GraphQLBoolean,
            resolve: (post) => {
                return post.deleted;
            }
        },
        votes: {
            type: GraphQLInt,
            resolve: (post) => {
                return post.votes;
            }
        },
        created: {
            type: GraphQLString,
            resolve: (post) => {
                return moment(post.created).format('YYYY-MM-DD');
            }
        }
    })
});


module.exports = {
    UserType: userType,
    PostType: redditPostType,
    CommentType: commentType
}