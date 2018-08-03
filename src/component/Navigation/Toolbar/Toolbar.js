import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div style={{color: 'White'}}>
        {props.username}
        </div>

         <nav className={classes.DesktopOnly}>
             <NavigationItems isAuthenticated={props.isAuth}/>
         </nav>
    </header>
);

export default toolbar;