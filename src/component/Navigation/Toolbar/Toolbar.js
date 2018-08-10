import React from 'react';
import classes from './Toolbar.css';
import { Link } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <DrawerToggle clicked={props.drawerToggleClicked}/>
       <Link to="/">
       <div style={{color: 'White'}}>
        {props.username}
        </div>
        </Link>
        <div style={{color: 'White'}}>
        {localStorage.getItem('userName')===''? null: localStorage.getItem('userName')}
       </div>
         <nav className={classes.DesktopOnly}>
             <NavigationItems isAuthenticated={props.isAuth} cartLength={props.cartLength}/>
         </nav>
    </header>
);

export default toolbar;