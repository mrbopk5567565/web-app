import React from 'react';
import Menu from '../../components/Menu'
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import * as userConstant from '../../redux/constants/userConstants';
import { connect } from 'react-redux'

const InternHome = () => {
  return (
    <React.Fragment>
      <Menu />
    </React.Fragment>
  )
}

export default connect()(InternHome);