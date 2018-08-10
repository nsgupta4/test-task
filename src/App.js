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
import Profile from './component/profile/profile';
import Product from './containers/dashboard/Products/Products';
import Checkout from './containers/dashboard/Products/Checkout/Checkout';
import AddProduct from './containers/Product/AddProduct';
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  componentDidUpdate(){
    console.log('in CompoenntDidupdate');
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/product" component={Product}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/addProduct" component={AddProduct}/>
        <Redirect path="/" to="/login" />
      </Switch>
    );
    if(this.props.isAuthenticated){
     routes = (<Switch>
      <Route path="/dashboard" component={dashboard} />
      <Route path="/dashboard/profile" component={Profile} />
      <Route path="/logout" component={Logout} />
      <Route path="/product" component={Product}/>
      <Route path="/checkout" component={Checkout}/>
      <Redirect path="/" to="/dashboard" /> 
      </Switch>);
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
