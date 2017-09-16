const { GraphQLSchema } = require("graphql");
const graphQLquery = require("./query/graphql.query")


const appSchema = new GraphQLSchema({
    query: graphQLquery
});

module.exports = appSchema;