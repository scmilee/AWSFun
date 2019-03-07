import spotifyS3 from '../lib/Spotify.js'
const spotty = new spotifyS3();


const getGenres = async(args) => {
    return await spotty.getGenres(args); 
}
const getArtistsByGenre = async(args) => {
    return await spotty.getArtistsByGenre(args); 
}
const getAlbumByArtist = async(args) => {
    return await spotty.getAlbumByArtist(args); 
}
const getSongsByAlbum = async(args) => {
    return await spotty.getSongsByAlbum(args); 
}
const getSong = async(args) => {
    return await spotty.getSong(args); 
}

const saveUser = async(args) => {
    let id,name,email
    ({id,name,email } = args)
    return "200 boi"
}

export const root = {
    genres: getGenres,
    artistsByGenre: getArtistsByGenre,
    albumByArtist: getAlbumByArtist,
    songsByAlbum: getSongsByAlbum,
    song: getSong,
    saveUser: saveUser
};