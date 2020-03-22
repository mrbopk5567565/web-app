import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from '../../components/Menu'
import Profile from '../../components/Profile'
import * as userConstant from '../../redux/constants/userConstants';
import { connect } from 'react-redux'

const InternHome = (props)=> {
  // useEffect(() => {
  //   props.dispatch({ type: userConstant.LOAD_USER_DETAIL_REQUEST })
  // }, [])
  return(
    <React.Fragment>
      <Menu/>
    </React.Fragment>
  )
}

export default connect()(InternHome);