import React from 'react';
import Header from '../../Header';
import { useForm } from 'react-hook-form';
import styles, { Errors } from './ResetPasswordStyles';
import { TextField, Button, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ResetPassword = (props) => {
  const classes = styles();
  
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {

  }
  return(
    <div>
      <Header/>
      <div className={ classes.Reset }>
        <div className={ classes.Wrapper }>
          <h2 className={ classes.h2 }>Reset Password</h2>
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
            <p className={ classes.forgot }>
              <Link className={ classes.forgotLink } to="/confirm_email">Forgot Password ?</Link>
            </p>
            <div className={ classes.buttons }>
              <Button 
                className={ classes.buttonLogIn } 
                type="submit"
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

export default connect(mapStateToProp)(ResetPassword);