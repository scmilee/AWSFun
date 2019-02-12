import React, { Component } from 'react'
import List from '../List/List'
const ArtistPage = (props) => {
    return (
        <Artist {...props}/>
    )
}

class Artist extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentArtist: null,
      modalType: null,
      loaded: false,
      urls: this.props.data.songs,
      artists: [],
      albums: [],
      songs: []
    };
  
  }

  parseSongInfo(songs){
    let ar = {}

    songs.map(song => {
      if (ar[song.artist] === undefined) ar[song.artist] = {}
      if (ar[song.artist][song.album] === undefined) ar[song.artist][song.album] = []
      
      let songDirectory = ar[song.artist][song.album];

      songDirectory.push({
      name : song.name,
      url: song.url
      })
      return true
    })

    this.setState({
      ...this.state,
      loaded:true,
      artists: ar
    })
  }

  
  componentDidMount() {
    this.parseSongInfo(this.props.data.songs)
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section className="main-content columns is-fullheight ">
        <aside className="menu column section is-3 ">
          <p className="menu-label">
            Artists
          </p>
          <ul className="menu-list">
            {this.state.loaded ? this.renderList() : null}
            {this.state.showModal? this.renderModal(this.state.modalType): null}
          </ul>
          <div><br/></div>
        </aside>
        <div className='column is-8'>
          {this.state.currentArtist !== null ? 
          <List 
            {...this.props} 
            albums={this.state.artists[this.state.currentArtist]}
          /> 
          : <div></div>}
        </div>
      </section>
    )
  }

  renderList = () => {
    const { artists } = this.state;
    
    if( artists !== null ){
    return (
      Object.keys(artists).map((key, i )=> {
        
        return (
          <div className='level'key={i}>
            <li className='is-info button'id= {key} onClick={() => this.setArtist(key)}>
              {key}  
            </li>
          </div>
        )
      })
    );
    }else  return (<li>You have no catagories.</li>) 
  };

  renderModal = (modalType) => {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="field">
            <label className="label has-text-white">Title</label>
              <div className="control">
                <input className="input"
                  name="currentTitle"
                  value={this.state.currentTitle}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Title"
                />
              </div>
          </div>
          <button className={'button is-primary'} onClick={modalType}>Save</button>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
      </div>
      );
    };

  setArtist = (key) => {
    
    this.setState({currentArtist: key},this.forceUpdate())
  }
  createModal = () =>{
    
    this.setState({
      ...this.state,
      modalType: this.createOne,
      showModal: true,
      currentTitle: "",
    })
  }

  closeModal = () => {
    this.setState({...this.state, showModal: false})
  }


}

export default ArtistPage;