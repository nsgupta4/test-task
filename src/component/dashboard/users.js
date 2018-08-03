import React from 'react';
import Image from '../../assets/userDefault.png';
import classes from './users.css';
const users = (props) => {
    
    return (
        <div className={classes.Users} onClick={props.clicked}>
        <img src={Image} alt="Profile" className={classes.Image}/>
       <p> Name: {props.name}</p>
     
        </div>
    );
};
export default users; 