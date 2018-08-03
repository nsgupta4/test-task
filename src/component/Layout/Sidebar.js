import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Sidebar.css';
import Image from '../../assets/userDefault.png';
const Sidebar = (props) => {
    console.log('history');
    return (
       
        <div className={classes.Sidebar}>
            <div className="well well-sm">
            
           <button style={{width:'relative'}}> <img src={Image} alt="Profile" className={classes.Image}/> </button>
             </div>
             <p className={classes.Links}>Welcome! {props.uname}</p>
             <p><a  onClick={props.changed}>Home</a></p>
            <p><a  onClick={props.my}>My Posts</a></p>
           <a onClick={props.profileClicked} > Profile</a>
     
     </div>      
        
    );
};

export default Sidebar;

//<input type="file" onChange={ (e) => props.imgUpload() } /> 