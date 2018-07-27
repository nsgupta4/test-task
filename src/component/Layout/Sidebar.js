import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Sidebar.css';
const Sidebar = (props) => {
    return (
       
        <div className={classes.Sidebar}>
            <div className="well well-sm">
            <img  alt="Profile" />
              <h5> </h5>
              <p>Welcome !!{props.uname}</p>
             </div>
             
            <p><a onClick={() => props.get(props.toc, localStorage.getItem('email'))} >My Posts</a></p>
            <p><Link to={`/profile`} >Profile</Link></p>
            </div>
        
    );
};

export default Sidebar;