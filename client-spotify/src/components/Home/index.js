import React from 'react';
import Genres from "../Genres"
import {withAuthorization} from '../Session'

const Home = (props) => (
   <Genres {...props}/>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);