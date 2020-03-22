import React from 'react';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute, InternPrivateRoute, MentorPrivateRoute } from './startup/PrivateRoute';
import Home from './containers/Home';
import InternHome from './containers/InternHome';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import PageNotFound from './containers/PageNotFound';
import Menu from './components/Menu';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <InternPrivateRoute exact path="/intern-home/discuss" component={ InternHome }/>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/login" component={ Login }/>
            <Route exact path="/register" component={ Register }/>
            <Route path="/" component={ Menu }/>
            <Route component={ PageNotFound }/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
