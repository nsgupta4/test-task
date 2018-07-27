import React, {Component} from 'react';
import  { connect }  from 'react-redux';
import Aux from '../../hoc/Aux';
import Sidebar from '../../component/Layout/Sidebar';
import Posts from './Posts/Posts';
import * as actions from '../../store/actions/index';
class dashboard extends Component {     
    render(){
        return(
            <div className="row">
            <div className="col-sm-2">
            <Sidebar get={this.props.getUsername} toc={this.props.token}  uname={this.props.username}/>
            </div>
            <div className="col-sm-8">
            <Posts />
            </div>
            </div>

         );
    }
} 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null ,
        username: state.login.username,
        token: state.login.token, 
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getUsername: (token, email)=> dispatch(actions.getUserDetails(token, email)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(dashboard);