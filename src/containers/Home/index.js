import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header'
// import * as type from '../../redux/type/type';

function Home(props){

  return(
    <div>
      <Header/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    test: state.test.data,
    show: state.test.isShow,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default Home;