import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import User from './components/User';
import Entries from './components/Entries';
import Printable from './components/Printable';
import RSPD from './components/RSPD';

const App = (props) => {
  return (

      <Router>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route path='/user' component={User}></Route>
          <Route path='/entries' component={Entries}></Route>
          <Route path = '/printable/:entry_id' component={Printable}></Route>
          <Route path='/RSPD/:entry_id' component={RSPD} ></Route>
          {/* <Route path='/user' component={User}></Route> */}
        </Switch>
      </Router>
  
  );
}

export default App;
