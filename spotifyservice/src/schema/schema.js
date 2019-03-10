const { buildSchema } = require('graphql');

export const schema = buildSchema(`
    type Query {
        genres: [Genre]
        artistsByGenre(genre: String!): [Artist]
        albumByArtist(genre: String!, sortKey: String!): [Album]
        songsByAlbum(genre: String!, sortKey: String!): [Song]
        song(genre: String!, sortKey: String!): SongUrl
        saveUser(id: String!, name: String!, email: String!): String
        play(artist: String!, album: String!, song: String!): String
    }
    type Genre {
        name: String!
    },
    type Artist {
        name: String!,
        albums: [String]
    },
    type Album {
        name: String!,
        songs: [String]
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