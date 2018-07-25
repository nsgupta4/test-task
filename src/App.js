import React, { Component } from 'react';
import {connect} from 'react-redux';
import Signup from './containers/Auth/Signup';
import Login from './containers/Auth/Login';
import Layout from './component/Layout/Layout';
import { Route, Switch,Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
      <Layout>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/logout" component={Logout} />
      <Redirect to="/" />
       </Switch>
       </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(null,mapDispatchToProps)(App));
