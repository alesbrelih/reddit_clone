const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql");
const { UserType, PostType, CommentType } = require("../graphql.types");

// database
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

const userMutationsType = new GraphQLObjectType( {
	name: "User Mutations",
    description: "Mutates user information",
    fields: () => ({
        addUser: {
            type: UserType,
            args:{
                id:{
                    type: new GraphQLNonNull(GraphQLID),
                }
            },
            resolve: (parent, args) => {
                return User.
            }
        }
    })
} );

const commentMutationsType = new GraphQLObjectType( {

} );

const postMutationsType = new GraphQLObjectType ( {

} );

module.exports = {
	PostMutations: postMutationsType,
	CommentMutations: commentMutationsType,
	UserMutations: userMutationsType
};