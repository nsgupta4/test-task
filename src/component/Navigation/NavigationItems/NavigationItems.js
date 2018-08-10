import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
     <NavigationItem link="/product" exact>Products</NavigationItem>
     <NavigationItem link="/checkout" exact>Cart ({props.cartLength})</NavigationItem>
     <NavigationItem link="/addProduct" exact>Add Product</NavigationItem>
      {props.isAuthenticated 
        ? <NavigationItem link="/dashboard" exact>Home</NavigationItem>
        : <NavigationItem link="/login" exact>SignIn</NavigationItem> } 
       { !props.isAuthenticated 
        ? <NavigationItem link="/signup">Signup</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;