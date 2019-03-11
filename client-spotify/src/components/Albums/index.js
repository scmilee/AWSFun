import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  Link
} from 'react-router-dom';

class Albums extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      genre: props.location.state.genre,
      sortKey: props.location.state.sortKey,
      currentArtist: null,
      loaded: false,
      albums: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  componentDidMount() {
    this.setState({
      albums: this.props.albums,
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
            Albums
          </p>
          <ul className="menu-list">
            {this.state.loaded ? this.renderList() : null}
          </ul>
          <div><br/></div>
        </aside>
        <div className='column is-8'>
          {this.state.currentArtist !== null ? 
          null
          : <div></div>}
        </div>
      </section>
    )
  }

  renderList = () => {
    const { albums } = this.state;
    if( albums !== null ){
    return (
      Object.keys(albums).map((key, i )=> {
        let sortKey = this.state.sortKey 
        sortKey += "#"
        sortKey += albums[key].name
        return (
          <div className='level'key={i}>
            <li className='is-info button'id= {key} onClick={() => this.setArtist(albums[key])}>
            
            <Link to={{ pathname: '/songs-by-album', state: { sortKey: sortKey ,genre: this.state.genre }}}>{albums[key].name} </Link> 
            </li>
          </div>
        )
      })
    );
    }else  return (<li>You have no catagories.</li>) 
  };

  setArtist = (key) => {
    this.setState({currentArtist: key},this.forceUpdate())
  }
}
const GET_ALBUMS = gql`
query albumsByArtist($genre: String!,$sortKey: String!) {
   albumsByArtist(genre: $genre,sortKey: $sortKey) {
      name
   }
}
`;
const AlbumPage = (props) => {
  let {sortKey,genre} = props.location.state;
  return (
    <Query query={GET_ALBUMS} variables={{genre, sortKey}}>
        {({ loading, error, data }) => {
           if (loading) return "Loading...";
           if (error) return `Error! ${error.message}`
           return(
              <Albums albums={data.albumsByArtist} {...props}/>
           );
        }}
    </Query>
  )
}

export default AlbumPage;