const Spotify = require('../../src/renderer/lib/Spotify')

describe('Spotify', () => {
    let spotify 
    before(()=>{
        spotify =  new Spotify('dylandrudgeshomework')
    })

    it('can build a proper aws s3 uri/key', ()=> {
        let names = [
            'Pink Floyd',
            'The Wall',
            'Comfortably Numb'
        ]
        let key = spotify.keyBuilder(names)
        expect(key).to.eq('')

    })



})