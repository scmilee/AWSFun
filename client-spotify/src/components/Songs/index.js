import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query ,withApollo}from "react-apollo";
import AudioPlayer from "react-h5-audio-player";

class Song extends Component {
  constructor(props) {
    super(props);
    this.client = this.props.client
    this.state = {
      genre: props.location.state.genre,
      sortKey: props.location.state.sortKey,
      loaded: false,
      songs: [],
      songUrls: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  componentDidMount() {
    this.setState({
      songs: this.props.songs,
      loaded: true
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section className="main-content columns is-fullheight ">
        <aside className="menu column section is-3 ">
          <p className="menu-label">
            Songs
          </p>
          <ul className="menu-list">
            {this.state.loaded ? this.renderList() : null}
          </ul>
          <div><br/></div>
        </aside>
        <div className='column is-8'>
          {this.state.currentSong !== null ? 
          null
          : <div></div>}
        </div>
      </section>
    )
  }

  renderList = () => {
    const { songs } = this.state;
    if( songs !== null ){
    return (
      Object.keys(songs).map((key, i )=> {
        let sortKey = this.state.sortKey
        sortKey += "#"
        sortKey += songs[key].name
        return (
          <div key={i}>
            <li className='is-info button'id= {key} onClick={() => this.getSongUrl(sortKey, key)}>
              {songs[key].name}
            </li>
            { this.state.songUrls[key] ? <AudioPlayer onPlay={()=> this.songPlayed(sortKey)} src={this.state.songUrls[key]}/> : null }
          </div>
        )
      })
    );
    }else  return (<li>You have no catagories.</li>) 
  };

  getSongUrl = (sortKey,key ) => {
    const genre = this.state.genre;
    const GET_SONG_URL = gql`
    query song($genre: String!, $sortKey: String!) {
      song(genre: $genre, sortKey: $sortKey) {
          url
      }
    }
    `;
    this.client.query({
      query: GET_SONG_URL,
      variables: {genre,sortKey}

    }).then(data => {
      let urls = this.state.songUrls
      urls[key] = data.data.song.url
      this.setState({
        songUrls: urls
      })
    }).catch(err => {
      console.log(err)
    })
  }
  songPlayed = (sortKey) => {
    const [artist, album, song] = sortKey.split('#')
    const SONG_LOG = gql`
    query play($artist: String!, $album: String!, $song: String!) {
      play(artist: $artist, album: $album, song: $song)
    }
    `;
    this.client.query({
      query: SONG_LOG,
      variables: {artist,album, song}

    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
}

const GET_SONGS = gql`
query songsByAlbum($genre: String!, $sortKey: String!) {
   songsByAlbum(genre: $genre, sortKey: $sortKey) {
      name
   }
}
`;
const SongPage = (props) => {
  let {genre, sortKey} = props.location.state
  return (
    <Query query={GET_SONGS} variables={{genre, sortKey}}>
        {({ loading, error, data }) => {
           if (loading) return "Loading...";
           if (error) return `Error! ${error.message}`
           return(
              <Song songs={data.songsByAlbum} {...props}/>
           );
        }}
    </Query>
  )
}

export default withApollo(SongPage);