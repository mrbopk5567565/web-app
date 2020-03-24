import React from 'react';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute, InternPrivateRoute, MentorPrivateRoute } from './startup/PrivateRoute';
import Home from './containers/Home';
import InternHome from './containers/InternHome';
import MentorHome from './containers/MentorHome';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Confirmation from './components/Users/Confirmation';
import ConfirmEmail from './components/Users/ForgotPassword/ConfirmEmail'
import ResetPassword from './components/Users/ForgotPassword/ResetPassword'
import PageNotFound from './containers/PageNotFound';
import Menu from './components/Menu';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <InternPrivateRoute exact path="/intern-home/" component={ InternHome }/>
            <MentorPrivateRoute exact path="/mentor-home/" component={ MentorHome }/>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/login" component={ Login }/>
            <Route exact path="/register" component={ Register }/>
            <Route exact path="/confirm_user/:token" component={ Confirmation }/>
            <Route exact path="/confirm_email" component={ ConfirmEmail }/>
            <Route exact path="/reset_password/:token" component={ ResetPassword }/>
            <Route path="/intern-home" component={ Menu }/>
            <Route path="/mentor-home" component={ Menu }/>
            <Route component={ PageNotFound }/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
