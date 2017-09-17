const { GraphQLInputObjectType, GraphQLString, GraphQLID } = require("graphql");

// --- USERS --- //
const userInputType = new GraphQLInputObjectType({
    name: "User input type",
    description: "Input type when creating/mutating users.",
    fields : () => ({
        username:{
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        confirm: {
            type: GraphQLString
        }
    })
});

// --- POSTS --- //
const postInputType = new GraphQLInputObjectType({
    name: "Post input type",
    description: "Input type for when creating/mutating posts.",
    fields: () => ({
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        }
    })
});

// --- COMMENTS --- //
const commentInputType = new GraphQLInputObjectType({
    name: "Comment input type",
    description: "Input type for when creating/mutating comment.",
    fields: () => ({
        content: {
            type: GraphQLString
        },
        postId:{
            type: GraphQLID
        }
    })
});

module.exports = {
    UserInputType: userInputType,
    PostInputType: postInputType,
    CommentInputType: commentInputType
};