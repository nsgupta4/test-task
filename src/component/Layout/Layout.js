import React, {Component} from 'react';
import  { connect }  from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false,

    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render(){
        return( <Aux>
            <Toolbar
            username={this.props.name}
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}

            />
            <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>
             <main className={classes.Content}>
                 {this.props.children}
             </main>
         </Aux>);
    }
} 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null ,
        name: state.login.username, 
    };
};
export default connect(mapStateToProps)(Layout);