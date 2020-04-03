import React from 'react';
// import { connect } from 'react-redux';
import Header from '../../components/Header'
// import * as type from '../../redux/type/type';
import styled from 'styled-components';

function Home(props) {

  return (
    <div>
      <Header />
      <Greeting>
        <p>
          Hello Everybody !!!
        </p>
        <p>
          Have a good day
        </p>
      </Greeting>
    </div>
  )
}

export default Home;

const Greeting = styled.div`
  text-align: center;
  padding: 100px;
  p {
    font-size: x-large;
    margin: 5px;
    color: #e21a22;
  }
`;