import React, { Component } from 'react';
import {connect} from 'react-redux';
import Signup from './containers/Auth/Signup';
import Login from './containers/Auth/Login';
//import Posts from './containers/dashboard/Posts/Posts';
import Layout from './component/Layout/Layout';
import { Route, Switch,Redirect, withRouter} from 'react-router-dom';
import './App.css';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions/index';
import dashboard from './containers/dashboard/dashboard';
import profile from './component/profile/profile';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (<Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      </Switch>
    );
    if(this.props.isAuthenticated){
     routes = (<Switch>
      <Route path="/dashboard" component={dashboard} />
      <Route path="/logout" component={Logout} />
      <Redirect path="/" to="/dashboard" /> 
      </Switch>)
    }
    return (
      <div>
      <Layout>
     {routes}
       </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.login.token !== null ,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
