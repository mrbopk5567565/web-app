import React from 'react';
import Header from '../../Header';
import { useForm } from 'react-hook-form';
import styles, { Errors } from './ConfirmEmailStyles';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CONFIRM_EMAIL_REQUEST } from '../../../redux/constants/userConstants'

const ConfirmEmail = (props) => {
  const classes = styles();
  
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    const email = data.email
    props.dispatch({ type: CONFIRM_EMAIL_REQUEST, email })
  }
  
  return(
    <div>
      <Header/>
      <div>
        <div className={ classes.Reset }>
        <div className={ classes.Wrapper }>
          <h2 className={ classes.h2 }>Confirm Email</h2>
          <form className={ classes.form } onSubmit={ handleSubmit(onSubmit) }>
            <TextField
              color="secondary"
              label="email"
              type="text"
              name="email"
              id="email"
              variant="outlined"
              className={ classes.inputField }
              inputRef={ register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
            />
            { errors.email && errors.email.type === 'required' && <Errors>Required ! Please enter your email</Errors>}
            { errors.email && errors.email.type === 'pattern' && <Errors>This is not Email</Errors>}
            { props.confirm && props.confirm.status === true &&
              <p className={ classes.confirmSuccess }>{ props.confirm.message }</p>
            }
            { props.confirm && props.confirm.status === 'error' &&
              <p className={ classes.confirmFailure }>{ props.confirm.message }</p>
            }
            <div className={ classes.buttons }>
              <Button 
                className={ classes.buttonLogIn } 
                type="submit"
              >
                Confirm
              </Button>
              <Button className={ classes.buttonRegister }>
                <Link className={ classes.Link } to="/login" >Back</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

const mapStateToProp = (state) => ({
  confirm: state.user.confirm_email
})

export default connect(mapStateToProp)(ConfirmEmail);