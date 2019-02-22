const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        genres: [Genre]
        artistsByGenre(genre: String!): [Artist]
        albumByArtist(artist: String!): [Album]
        songsByAlbum(album: String!): [Song]
        song(title: String!): [SongUrl]
    }
    type Genre {
        name: String!
    },
    type Artist {
        name: String!,
        albums: [String]!
    },
    type Album {
        name: String!,
        albums: [String]!
    },
    type Song {
        name: String!
    },
    type SongUrl {
        key: String!,
        name: String!,
        url: String!
    },

`);

export default schema;