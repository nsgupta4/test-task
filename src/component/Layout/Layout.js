import React, {Component} from 'react';
import  { connect }  from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSideDrawer: false,
            cartLength: 0,
        };
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    calculateCartLength = () => {
        this.setState({cartLength: this.props.cart.length});
    }
    render(){
        return( <Aux>
            <Toolbar
            username={this.props.name}
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}
            cartLength={this.props.cartLength}
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
        cartLength: state.item.cartLength, 
    };
};
export default connect(mapStateToProps)(Layout);