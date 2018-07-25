import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated 
        ? <NavigationItem link="/dashboard" exact>Home</NavigationItem>
        : <NavigationItem link="/login" exact>SignIn</NavigationItem> } 
       { !props.isAuthenticated 
        ? <NavigationItem link="/signup">Signup</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;