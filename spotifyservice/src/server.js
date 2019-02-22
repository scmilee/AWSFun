import 'babel-polyfill'
const express = require('express');
const cors = require('cors');
const express_graphql = require('express-graphql');

const schema = require('./schema/schema');
const rootResolver = require('./resolver/rootResolver')

const app = express();
app.use(cors())

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));