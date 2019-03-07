import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
    Link
  } from 'react-router-dom';
import Artist from '../Artist'


class Genre extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentgenre: null,
      loaded: false,
      genres: []
    };
  
  }

  componentDidMount() {
    this.setState({
        genres: this.props.data.genres,
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
            Genres
          </p>
          <ul className="menu-list">
            {this.state.loaded ? this.renderList() : null}
            {this.state.showModal? this.renderModal(this.state.modalType): null}
          </ul>
          <div><br/></div>
        </aside>
        <div className='column is-8'>
          {this.state.currentgenre !== null ? 
        
            null
        //   <Artist 
        //     {...this.props} 
        //     genre={this.state.currentgenre}
        //   />
          : <div></div>}
        </div>
      </section>
    )
  }

  renderList = () => {
    const { genres } = this.state;
    
    if( genres !== null ){
    return (
      Object.keys(genres).map((key, i )=> {
        
        return (
          <div className='level'key={i}>
            <li className='is-info button'id= {key} onClick={() => this.setGenre(genres[key].name)}>
                <Link to={{ pathname: '/artists-by-genre', state: { genre: genres[key].name} }}>{genres[key].name} </Link> 
            </li>
          </div>
        )
      })
    );
    }else  return (<li>You have no catagories.</li>) 
  };

  setGenre = (key) => {  
    this.setState({currentgenre: key},this.forceUpdate())
  }
}

const GET_GENRES = gql`
{
   genres {
      name
   }
}
`;

const genrePage = (props) => {
    return (
        <Query query={GET_GENRES}>
        {({ loading, error, data }) => {
           if (loading) return "Loading...";
           if (error) return `Error! ${error.message}`
           
           return(
              <Genre data={data} {...props}/>
           );
        }}
        </Query>
    )
}

export default genrePage;