import React, { useState, useEffect } from 'react';
import Header from '../../Header'
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, InputLabel ,MenuItem, FormControl, Checkbox } from '@material-ui/core';
import styles, { Errors } from './styles';
import * as userConstants from '../../../redux/constants/userConstants';
import { connect } from 'react-redux'

function Register(props) {
  const { register, handleSubmit ,errors, setValue, getValues, clearError } = useForm();
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ team, setTeam ] = useState('');
  const [ mentor, setMentor ] = useState('');
  const [ checkbox, setCheckbox ] = useState(true);
  useEffect(() => {
    if (team !== ''){
      props.dispatch({ type: userConstants.LOAD_MENTORS_NAME_REQUEST, team})
    }
  },[team])

  const onSubmit = (data) => {
    console.log(data)
  }

  const classes = styles();

  const handleChange = (e) => {
    switch (e.target.name){
      case 'team':
        setTeam(e.target.value);
        setValue('inputForTeam', e.target.value);
        clearError('inputForTeam')
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'mentor':
        setMentor(e.target.value);
        setValue('inputForMentor', e.target.value)
        clearError('inputForMentor')
        break;
      case 'checkbox':
        setCheckbox(!checkbox);
        break;
      default: break;
    }
  }

  const validateConfirmPassword = (value) => {
    if (value === password) {
      return true;
    }
    return false;
  }

  return(
    <div className={ classes.registerPage }>
      <Header/>
      <div className={ classes.register }>
        <form className={ classes.registerForm} onSubmit={ handleSubmit(onSubmit)}>
          {/* General Account */}
          <div className={ classes.registerAccount }>
            <div className={ classes.registerAccountForm }>
              <p className={ classes.titleAccountForm }>Register Account</p>
              <TextField
                // required
                className={ classes.inputField }
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                inputRef={ register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              />
              { errors.email && errors.email.type === 'required' && <Errors>Required</Errors>}
              { errors.email && errors.email.type === 'pattern' && <Errors>Please enter your email</Errors>}
              <TextField
                // required
                className={ classes.inputField }
                label="Username"
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                inputRef={ register({ required: true, minLength: 3 })}
              />
              { errors.username && errors.username.type === 'required' && <Errors>Required</Errors>}
              { errors.username && errors.username.type === 'minLength' && <Errors>Please minimum 3 characters</Errors>}
              <TextField
                // required
                className={ classes.inputField }
                label="Password"
                placeholder="Password"
                type="text"
                name="password"
                id="password"
                value={ password }
                onChange={ handleChange }
                inputRef={ register({ required: true, minLength: 8 })}
              />
              { errors.password && errors.password.type === 'required' && <Errors>Required</Errors>}
              { errors.password && errors.password.type === 'minLength' && <Errors>Please minimum 8 characters</Errors>}
              <TextField
                // required
                className={ classes.inputField }
                label="Confirm Password"
                placeholder="Confirm Password"
                type="text"
                name="confirm_password"
                id="confirm_password"
                
                inputRef={ register({ required: true, validate: validateConfirmPassword })}
              />
              { errors.confirm_password && errors.confirm_password.type === 'required' && <Errors>Required</Errors>}
              { errors.confirm_password && <Errors>Please confirm password again</Errors>}
              <div className={ classes.checkbox }>
                <input
                  name="checkbox"
                  type="checkbox"
                  onChange={ handleChange }
                  ref={ register({ required: true })}
                />
                <label for="checkbox">I do accept the Terms and Conditions of your site.</label>
              </div>
              { errors.checkbox && errors.checkbox.type === 'required' && <Errors>Required</Errors> }
            </div>
          </div>

          {/* General Infomation */}
          <div className={ classes.registerGeneral }>
            <div className={ classes.registerGeneralForm }>
              <p className={ classes.titleGeneralForm }>General Infomation</p>
              <TextField
                // required
                className={ classes.inputField }
                label="University"
                placeholder="University"
                type="text"
                name="university"
                id="university"
                inputRef={ register({ required: true, minLength: 3 })}
              />
              { errors.university && errors.university.type === 'required' && <Errors>Required</Errors>}
              { errors.university && errors.university.type === 'minLength' && <Errors>Please minimum 3 characters</Errors>}

              <FormControl>
                <InputLabel id="team_label">Team</InputLabel>
                <Select
                  className={ classes.inputField }
                  labelId="team_label"
                  placeholder="Team"
                  name="team"
                  id="team"
                  value={team}
                  onChange={ handleChange }
                >
                  <MenuItem value="php_web">PHP Web</MenuItem>
                  <MenuItem value="ROR_web">ROR Web</MenuItem>
                  <MenuItem value="android_mobile">Android</MenuItem>
                  <MenuItem value="ios_mobile">IOS</MenuItem>
                </Select>
                <input 
                  name="inputForTeam"
                  hidden
                  ref={ register({ required: true })}
                />
                { errors.inputForTeam && errors.inputForTeam.type === 'required' && <Errors>Required</Errors>}
              </FormControl>
              
              <FormControl>
                <InputLabel id="mentor_label">Mentor</InputLabel>
                <Select
                  className={ classes.inputField }
                  labelId="mentor_label"
                  name="mentor"
                  id="mentor"
                  value={mentor}
                  onChange={ handleChange }
                >
                  { (props.mentors && team) && props.mentors.map((item, key) => 
                    <MenuItem key={ key } value={ item }>{ item }</MenuItem>
                  )}
                </Select>
                <input 
                  name="inputForMentor"
                  hidden
                  ref={ register({ required: true })}
                />
                { errors.inputForMentor && errors.inputForMentor.type === 'required' && <Errors>Required</Errors>}
              </FormControl>

              <InputLabel id="date_label">Start day</InputLabel>
              <TextField
                // required
                // labelId="date_label"
                className={ classes.inputField }
                type="date"
                name="date"
                id="date"
                inputRef={ register({ required: true })}
              />
              { errors.date && errors.date.type === 'required' && <Errors>Required</Errors>}

              <InputLabel id="birthday_label">Birthday</InputLabel>
              <TextField
                // required
                // labelId="birthday_label"
                className={ classes.inputField }
                type="date"
                name="birthday"
                id="birthday"
                inputRef={ register({ required: true })}
              />
              { errors.birthday && errors.birthday.type === 'required' && <Errors>Required</Errors>}

              <button color="default" className={ classes.buttonSubmit } type="submit">
                Register
              </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return({
    mentors: state.user.mentors.data,
  })
}

export default connect(mapStateToProps)(Register);