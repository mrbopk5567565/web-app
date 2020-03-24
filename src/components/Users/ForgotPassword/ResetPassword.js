import React, { useState } from 'react';
import Header from '../../Header';
import { useForm } from 'react-hook-form';
import styles, { Errors } from './ResetPasswordStyles';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD_REQUEST } from '../../../redux/constants/userConstants'

const ResetPassword = (props) => {
  const [ password, setPassword ] = useState('')
  const classes = styles();
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  console.log(props)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    const token = props.match.params.token;
    console.log(data, 'data')
    const profile = new FormData();
    profile.append('token', token)
    profile.append('password', data.password)
    profile.append('password_confirmation', data.confirm_password)
    props.dispatch({ type: RESET_PASSWORD_REQUEST, profile, props})
  }

  const validateConfirmPassword = (value) => {
    if (value === password) {
      return true;
    }
    return false;
  }

  const handleChange = (e) => {
    switch (e.target.name){
      case 'password':
        setPassword(e.target.value);
        break;
    }
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
              label="Password"
              type="text"
              name="password"
              id="password"
              variant="outlined"
              className={ classes.inputField }
              onChange={ handleChange }
              inputRef={ register({ required: true, minLength: 8 })}
            />
            { errors.password && errors.password.type === 'required' && <Errors>Required  ! Please enter your password</Errors>}
            { errors.password && errors.password.type === 'minLength' && <Errors>Please minimum 8 characters</Errors>}
            <TextField
              color="secondary"
              label="Confirm Password"
              type="text"
              name="confirm_password"
              id="confirm_password"
              variant="outlined"
              className={ classes.inputField }
              inputRef={ register({ required: true, validate: validateConfirmPassword })}
            />
            { errors.password && errors.password.type === 'required' && <Errors>Required!</Errors>}
            { errors.confirm_password && <Errors>Please confirm password again</Errors>}
            { props.status && props.status.status === 'error' &&
              <p className={ classes.resetFailure }>{ props.status.message }</p>
            }
            { props.status && props.status.token &&
              <p className={ classes.resetSuccess }>{ `Reset password success :)` }</p>
            }
            <div className={ classes.buttons }>
              <Button 
                className={ classes.buttonLogIn } 
                type="submit"
              >
                Submit
              </Button>
              <Button className={ classes.buttonRegister }>
                <Link className={ classes.Link } to="/login" >Back</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProp = (state) => ({
  status: state.user.user.data,
})

export default connect(mapStateToProp)(ResetPassword);