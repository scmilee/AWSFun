import React from 'react';
import Catagory from '../cattyboi/cattyboi'
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_SONGS = gql`
{
   songs {
     key
     url
   }
}
`;

const Home = (props) => (
   <Query query={GET_SONGS}>
   {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`
      
      return(
         <Catagory data={data} {...props}/>
      );
   }}
   </Query>
);
export default Home