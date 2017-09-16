const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { CommentType, UserType, PostType} = require("../../types/graphql.types");

//mongoose
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

const queryObject = new GraphQLObjectType({
    name: 'Root',
    fields: {
        user: {
            type: UserType,
            args: {
                id:{
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () => {
                return User.find();
            }
        },
        comment: {
            type: CommentType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Comment.findById(args.id);
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Post.findById(args.id);
            }
        }
    }
});

module.exports = queryObject;