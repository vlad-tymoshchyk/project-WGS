import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SideMenu from './components/SideMenu';
import Environment from './components/Environment';
import Performance from './components/Performance';
import Manage from './components/Manage';
import Operations from './components/Operations';
import Forecast from './components/Forecast';
import Traceability from './components/Traceability';
import AuthContainer from './components/AuthContainer';
import DropdownAccountMenu from './components/DropdownAccountMenu';
import { userLogOut } from './actions/actions';

import './App.scss';

const menuItems = [
  {
    title: 'Environment',
    href: '/environment',
    icon: '/icon-environment.svg',
  },
  {
    title: 'Performance',
    href: '/performance',
    icon: '/icon-performance.svg',
    submenu: [
      { title: 'Hatch rate', href: '/hatch-rate' },
      { title: 'FCR', href: '/fcr' },
      { title: 'Yield', href: '/yield' },
      { title: 'Pupation', href: '/pupation' },
      { title: 'Employees', href: '/employees' },
    ],
  },
  {
    title: 'Manage',
    href: '/manage',
    icon: '/icon-manage.svg',
    submenu: [
      { title: 'Streams', href: '/streams' },
      { title: 'Schedule', href: '/schedule' },
    ],
  },
  {
    title: 'Operations',
    href: '/operations',
    icon: '/icon-operations.svg',
  },
  {
    title: 'Forecast',
    href: '/forecast',
    icon: '/icon-forecast.svg',
  },
  {
    title: 'Traceability',
    href: '/traceability',
    icon: '/icon-traceability.svg',
    submenu: [
      { title: 'Registered Feed', href: '/registered-feed' },
      { title: 'Registered Substrate', href: '/registered-substrate' },
      { title: 'Registered Equipment', href: '/registered-equipment' },
    ],
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    const { handleLogOut } = props;
    axios.interceptors.response.use(null, err => {
      if (err.response.status === 401) {
        handleLogOut();
        console.log('Error: not authorized');
      }
      return err;
    });
  }

  componentDidMount() {
    const { logInFromStorage } = this.props;
    if (localStorage.getItem('token')) {
      logInFromStorage(
        localStorage.getItem('token'),
        localStorage.getItem('username'),
        localStorage.getItem('farmname'),
      );
    }
  }

  render() {
    const { isLoggedIn, username, farmname } = this.props;
    return (
      <Router>
        <Switch>
          <Route path="/(login|signup|forgot-password)">
            <AuthContainer />
          </Route>
          <Route path="/">
            {!isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <div className="App">
                <SideMenu menuItems={menuItems} />
                <div className="main">
                  <div className="page-top-bar">
                    <span className="user-name">
                      <span className="mr-2">{farmname}</span>
                    </span>
                    <div className="right-block">
                      <DropdownAccountMenu username={username} />
                    </div>
                  </div>
                  <div>
                    <Switch>
                      <Route path="/environment" component={Environment} />
                      <Route path="/performance" component={Performance} />
                      <Route path="/manage" component={Manage} />
                      <Route path="/operations" component={Operations} />
                      <Route path="/forecast" component={Forecast} />
                      <Route path="/traceability" component={Traceability} />
                    </Switch>
                  </div>
                </div>
              </div>
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    username: state.authReducer.username,
    farmname: state.authReducer.farmname,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleLogOut: () => {
      dispatch(userLogOut());
    },
    logInFromStorage: (token, username, farmname) => {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch({
        type: 'USER_LOGGED_IN',
        token,
        username,
        farmname,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
