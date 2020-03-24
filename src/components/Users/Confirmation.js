import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CONFIRM_USER_REQUEST } from '../../redux/constants/userConstants';
import { Link } from 'react-router-dom';

const Confirmation = (props) => {
  useEffect(() => {
    const token = props.match.params.token;
    props.dispatch({ type: CONFIRM_USER_REQUEST, token, props })
  })
  console.log(props)
  return(
    <>
      <h2>
        Confirming
      </h2>
      <Link to="/login">Return Login</Link>
    </>
  )
}

export default connect()(Confirmation);