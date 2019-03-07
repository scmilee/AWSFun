import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";

class Artist extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentArtist: null,
      loaded: false,
      artists: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  componentDidMount() {
    this.setState({
      artists: this.props.artists,
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
            Artists
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
    const { artists } = this.state;
    console.log(artists)
    if( artists !== null ){
    return (
      Object.keys(artists).map((key, i )=> {
        
        return (
          <div className='level'key={i}>
            <li className='is-info button'id= {key} onClick={() => this.setArtist(artists[key])}>
              {artists[key].name}  
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
const GET_ARTISTS = gql`
query artistsByGenre($genre: String!) {
   artistsByGenre(genre: $genre) {
      name
   }
}
`;
const ArtistPage = (props) => {
  const {genre} = props.location.state
  return (
    <Query query={GET_ARTISTS} variables={{genre}}>
        {({ loading, error, data }) => {
            console.log(data)

           if (loading) return "Loading...";
           if (error) return `Error! ${error.message}`
           return(
              <Artist artists={data.artistsByGenre} {...props}/>
           );
        }}
    </Query>
  )
}

export default ArtistPage;