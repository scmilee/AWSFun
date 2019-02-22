import 'babel-polyfill'
import {root} from './resolver/rootResolver'
import {schema} from './schema/schema'
const express = require('express');
const cors = require('cors');
const express_graphql = require('express-graphql');

const app = express();
app.use(cors())

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));