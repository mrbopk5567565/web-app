import React, { useState, useEffect } from 'react';
import Header from '../../Header'
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, InputLabel ,MenuItem, FormControl, Checkbox } from '@material-ui/core';
import styles, { Errors } from './styles';
import * as userConstants from '../../../redux/constants/userConstants';
import { connect } from 'react-redux'

function Register(props) {
  const { register, handleSubmit ,errors, setValue, getValues, clearError } = useForm();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ name, setName ] = useState('');
  const [ mentor, setMentor ] = useState('');
  const [ team, setTeam ] = useState('');
  const [ school, setSchool ] = useState('');
  const [ date_of_birth, setDOB ] = useState('');
  const [ start_date, setStartDate ] = useState('');
  const [ checkbox, setCheckbox ] = useState(true);
  useEffect(() => {
    if (team !== ''){
      props.dispatch({ type: userConstants.LOAD_MENTORS_NAME_REQUEST, team})
    }
  },[team])

  const onSubmit = (data) => {
    console.log(data)
    // setEmail(data.email)
    // setConfirm(data.confirm_password)
    // setName(data.username)
    // setSchool(data.university)
    // setDOB(data.birthday)
    // setStartDate(data.start_date)

    const profile = new FormData()
    profile.append('email', data.email)
    profile.append('password', data.password)
    profile.append('password_confirmation', data.confirm_password)
    profile.append('name', data.username)
    profile.append('mentor_name', data.inputForMentor)
    profile.append('team', data.inputForTeam)
    profile.append('school', data.university)
    profile.append('date_of_birth', data.birthday)
    profile.append('start_date', data.start_date)
    props.dispatch({ type: userConstants.USER_SIGNUP_REQUEST, profile})
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
                className={ classes.inputFieldLeft }
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                inputRef={ register({ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              />
              { errors.email && errors.email.type === 'required' && <Errors>Required ! Please enter your email</Errors>}
              { errors.email && errors.email.type === 'pattern' && <Errors>Please enter your email</Errors>}
              <TextField
                // required
                className={ classes.inputFieldLeft }
                label="Username"
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                inputRef={ register({ required: true, minLength: 3 })}
              />
              { errors.username && errors.username.type === 'required' && <Errors>Required ! Please enter your name</Errors>}
              { errors.username && errors.username.type === 'minLength' && <Errors>Please minimum 3 characters</Errors>}
              <TextField
                // required
                className={ classes.inputFieldLeft }
                label="Password"
                placeholder="Password"
                type="text"
                name="password"
                id="password"
                // value={ password }
                onChange={ handleChange }
                inputRef={ register({ required: true, minLength: 8 })}
              />
              { errors.password && errors.password.type === 'required' && <Errors>Required  ! Please enter your password</Errors>}
              { errors.password && errors.password.type === 'minLength' && <Errors>Please minimum 8 characters</Errors>}
              <TextField
                // required
                className={ classes.inputFieldLeft }
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
                  id="checkbox"
                  type="checkbox"
                  onChange={ handleChange }
                  ref={ register({ required: true })}
                />
                <label htmlFor="checkbox">I do accept the Terms and Conditions of your site.</label>
              </div>
              { errors.checkbox && errors.checkbox.type === 'required' && <Errors>Required</Errors> }
              { props.message && props.status === "error" &&
                <p className={ classes.messageError }>{props.message}</p>
              }
              { props.message && props.status === true &&
                <p className={ classes.messageTrue }>{props.message}</p>
              }
            </div>
          </div>

          {/* General Infomation */}
          <div className={ classes.registerGeneral }>
            <div className={ classes.registerGeneralForm }>
              <p className={ classes.titleGeneralForm }>General Infomation</p>
              <TextField
                // required
                className={ classes.inputFieldRight }
                // classes = {{ focused: classes.labelFocus }}
                label="University"
                placeholder="University"
                type="text"
                name="university"
                id="university"
                inputRef={ register({ required: true, minLength: 3 })}
              />
              { errors.university && errors.university.type === 'required' && <Errors>Required ! Please enter your school</Errors>}
              { errors.university && errors.university.type === 'minLength' && <Errors>Please minimum 3 characters</Errors>}

              <FormControl
                className={ classes.inputFieldRight }
              >
                <InputLabel
                  id="team_label"
                  classes={{ focused: classes.labelFocus }}
                >Team</InputLabel>
                <Select
                  className={ classes.inputFieldRight }
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
                { errors.inputForTeam && errors.inputForTeam.type === 'required' && <Errors>Required ! Please enter your team</Errors>}
              </FormControl>
              
              <FormControl
                className={ classes.inputFieldRight }
              >
                <InputLabel
                  classes={{ focused: classes.labelFocus }} 
                  id="mentor_label"
                >Mentor</InputLabel>
                <Select
                  className={ classes.inputFieldRight }
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
                { errors.inputForMentor && errors.inputForMentor.type === 'required' && <Errors>Required ! Please enter your mentor</Errors>}
              </FormControl>

              <InputLabel
                className={ classes.inputDate }
                id="date_label">Start day</InputLabel>
              <TextField
                // required
                // labelId="date_label"
                className={ classes.inputFieldRight }
                type="date"
                name="start_date"
                id="start_date"
                inputRef={ register({ required: true })}
              />
              { errors.start_date && errors.start_date.type === 'required' && <Errors>Required</Errors>}

              <InputLabel
                className={ classes.inputDate }
                id="birthday_label"
              >Birthday</InputLabel>
              <TextField
                // required
                // labelId="birthday_label"
                className={ classes.inputFieldRight }
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
    message: state.user.user.message,
    status: state.user.user.status,
  })
}

export default connect(mapStateToProps)(Register);