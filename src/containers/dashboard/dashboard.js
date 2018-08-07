import React, {Component} from 'react';
import  { connect }  from 'react-redux';
//import Aux from '../../hoc/Aux';
import Sidebar from '../../component/Layout/Sidebar';
import Posts from './Posts/Posts';
import Profile from '../../component/profile/profile';
import * as actions from '../../store/actions/index';
import { RingLoader } from 'react-spinners';
import { Redirect, withRouter} from 'react-router-dom';
import RightSideBar from '../../component/Layout/rightSideBar';
//import post from '../../component/dashboard/post/Post';
class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //myPosts: false,
            profile: false,
            //users: this.props.users,
            //clicked: false,
        };
        //this.routeFunction = this.routeFunction.bind(this); 
    }
componentDidMount(){
    this.fetchUsers();
    this.props.onFetchHandler(this.props.token, this.props.userId, this.state.myPosts);
}

    onMyPostClick = () =>{ 
    this.setState({
        profile: false,
    });
    this.props.onFetchHandler(this.props.token, this.props.userId, true);
    //console.log('In MyPOSt',this.props.posts,this.props.userId);
    }
    
    onHomeClick = () => {
        this.setState({
            myPosts: false, 
            profile: false,
            //clicked: true,
        });
        localStorage.removeItem('userName');
        this.props.history.push('/dashboard');
        this.props.onFetchHandler(this.props.token, this.props.userId, false);
    }
    
    onProfileClick = () => {
        //console.log('inside route',this.state.profile);
        this.props.history.push('/dashboard/profile');
        this.setState({profile: !this.state.profile});
    }
    fetchUsers = () => {
        //console.log('Inside fetchUsers');
        this.props.onFetchUsers();
    }
    showUser = (userId, userName) => {
        this.setState({
            profile:false,
        });
        this.props.history.push('/dashboard/'+userName);
        let token = localStorage.getItem('token');
        localStorage.setItem('userName', userName);
        this.props.onShowUsers(token ,userId, false, true);
    }
    render(){
        let redirect = null;
        if(!this.props.isAuthenticated){
            redirect = <Redirect path="/"/>;
        }
        let view = ( this.props.posts ? <Posts myPost={this.props.myPost} showUsers/>: <Posts />);
        if(this.props.loading){
            view =  <RingLoader loading={this.props.loading} 
            loaderStyle={{display: "block", margin: "0 auto", borderColor: 'red'}}
            sizeUnit={"px"}
            size={150}/>;
        }
        if(this.state.profile){
            view = <Profile />;
        }
        if(this.state.clicked){
            view = <Posts myPost={this.state.myPosts}/>;
        }
        return(
            <div className="row">
            {redirect}
            <div className="col-sm-2">
            <Sidebar
            get={this.props.getUsername} 
            profileClicked={this.onProfileClick} 
            toc={this.props.token} 
            changed={this.onHomeClick} 
            my={this.onMyPostClick} 
            imgUpload={this.handleChange} 
            uname={this.props.username}/>
            </div>
            <div className="col-sm-7">
           {view}
            </div>
            <div className="col-sm-3">
                <RightSideBar users={this.props.users} showUsers={(userId, userName)=>this.showUser(userId, userName)}/> 
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
        userId: state.login.userId,
        posts: state.fetch.posts,
        myPost: state.fetch.myPost,
        loading: state.fetch.loading,
        users: state.user.users,
        load: state.user.loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getUsername: (token, email)=> dispatch(actions.getUserDetails(token, email)),
        onFetchUsers: () => dispatch(actions.getUsers()),
        onFetchHandler: (token, userId, myPost) => dispatch(actions.fetchPost(token, userId, myPost)),
        onShowUsers: (token, userId, myPost, userPost) => dispatch(actions.fetchPost(token, userId, myPost, userPost)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(dashboard));


