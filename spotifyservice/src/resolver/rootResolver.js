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
    let id,name,email,status
    ({id,name,email } = args)
    try {  
        await spotty.saveUser(id,name,email);
        status = "200 baby"
    } catch (error) {
        status = "500 oh no"
    }
    return status
}

const play = async(args) => {
    let artist, album, song, status
    ({artist,album,song } = args)
    try {  
        await spotty.logPlay(artist, album, song);
        status = "200 baby"
    } catch (error) {
        status = "500 oh no"
    }
    return status
}

export const root = {
    genres: getGenres,
    artistsByGenre: getArtistsByGenre,
    albumsByArtist: getAlbumByArtist,
    songsByAlbum: getSongsByAlbum,
    song: getSong,
    saveUser: saveUser,
    play: play
};