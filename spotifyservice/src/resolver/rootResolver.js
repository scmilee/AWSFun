import spotifyS3 from '../lib/Spotify.js'
const spotty = new spotifyS3();


const root = {
    genres: getGenres,
    artistsByGenre: getArtistsByGenre,
    albumByArtist: getAlbumByArtist,
    songsByAlbum: getSongsByAlbum,
    song: getSong,
};

const getGenres = async(args) => {
    return await spotty.getGenres(args); 
}
const getArtistsByGenre = async(args) => {
    return await spotty.getSongs(args); 
}
const getAlbumByArtist = async(args) => {
    return await spotty.getSongs(args); 
}
const getSongsByAlbum = async(args) => {
    return await spotty.getSongs(args); 
}
const getSong = async(args) => {
    return await spotty.getSongs(args); 
}

export default root;