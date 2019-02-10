import 'babel-polyfill'
import spotifyS3 from './lib/Spotify.js'
const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const spotty = new spotifyS3();

const schema = buildSchema(`
    type Query {
        songs(title: String): [Url]
    }
    type Url {
        key: String
        url: String
    }
`);

const getSongs = async(args) => {
    const result = await spotty.getSongs(args)
    return result
}

const root = {
    songs: getSongs
};
const app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log('Express GraphQL Server Now Running On localhost:3000/graphql'));