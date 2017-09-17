const { GraphQLObjectType } = require("graphql");


const mutationsTypeObject = new GraphQLObjectType({
    name: "Root mutations",
    fields: {
        userMutations:{
            type: 
        }
    }
});


module.exports = mutationsTypeObject;