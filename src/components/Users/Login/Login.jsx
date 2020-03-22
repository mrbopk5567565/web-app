import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button, Input } from '@material-ui/core';
import * as userConstants from '../../../redux/constants/userConstants';
import Header from '../../Header'

import styles, { Errors } from './styles'

function Login(props) {
  // console.log('login', props)
  const classes = styles();
    
  const handleLogIn = () => {
  }
  
  const { register, handleSubmit, errors } = useForm()
  const onSubmit= (data) => {
    // console.log(data)
    const user = {email: data.email, password: data.password}
    props.dispatch({ type: userConstants.USER_LOGIN_REQUEST, user, props })
    // props.dispatch({ type: userConstants.LOAD_USER_DETAIL_REQUEST })
  }

  return(
    <div>
      <Header/>
      <div className={ classes.Login }>
        <div className={ classes.Wrapper }>
          <h2 className={ classes.h2 }>Log In</h2>
          <form className={ classes.form } onSubmit={ handleSubmit(onSubmit) }>
            <TextField
              color="secondary"
              label="email"
              type="text"
              name="email"
              id="email"
              variant="outlined"
              className={ classes.inputField }
              inputRef={ register({ required: true, minLength: 8 })}
              />
            { errors.email && errors.email.type === 'required' && <Errors>This is required 1</Errors>}
            { errors.email && errors.email.type === 'minLength' && <Errors>This is required 2</Errors>}
            <TextField
              color="secondary"
              label="password"
              type="text"
              name="password"
              id="password"
              variant="outlined"
              className={ classes.inputField }
              inputRef={ register({ required: true, minLength: 8 })}
            />
            { errors.password && errors.password.type === 'required' && <Errors>This is required 1</Errors>}
            { errors.password && errors.password.type === 'minLength' && <Errors>This is required 2</Errors>}
            { props.errors.length != 0 && !props.loggedIn ? <Errors>{ props.errors }</Errors> : ''}
            <div className={ classes.buttons }>
              <Button 
                className={ classes.buttonLogIn } 
                type="submit"
                onClick={ handleLogIn }
              >
                Log In
              </Button>
              <Button className={ classes.buttonRegister }>
                <Link className={ classes.Link } to="/register" >Register</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProp = (state) => ({
  errors: state.user.errors,
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProp)(Login);
