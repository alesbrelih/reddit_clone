const graphqlHTTP = require("express-graphql");

const redditSchema = require("./schema/graphql.schema");

//ker je funkcija eksportana
module.exports = graphqlHTTP({
    schema: redditSchema,
    graphiql: true
});