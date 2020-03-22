import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {props => 
      (
        localStorage.getItem('token') ? 
        ( <Component {...props}/> ) : 
        ( <Redirect to={{ pathname: "/login", state: { from: props.location } }}/> )
      )
    }
  />
)

export const InternPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {props =>
      (
        ( localStorage.getItem('token') && localStorage.getItem('role') === 'intern' ) ?
        ( <Component {...props}/> ) :
        ( <Redirect to={{ pathname: "/login", state: { from: props.location } }}/> )
      )
    }
  />
)

export const MentorPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {props =>
      (
        ( localStorage.getItem('token') && localStorage.getItem('role') === 'mentor' ) ?
        ( <Component {...props} />) :
        ( <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
      )
    }
  />
)