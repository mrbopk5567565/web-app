import React from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from '../../components/Menu'
// import * as userConstant from '../../redux/constants/userConstants';
import { connect } from 'react-redux'

const MentorHome = (props) => {
  return (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  )
}

export default connect()(MentorHome);