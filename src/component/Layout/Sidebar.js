import React from 'react';
import classes from './Sidebar.css';
import Image from '../../assets/userDefault.png';
const Sidebar = (props) => {
    const { changed, my, profileClicked, uname } = props;
    //console.log('history');
    return (
       
        <div className={classes.Sidebar}>
            <div className="well well-sm">
            
           <img src={Image} alt="Profile" className={classes.Image}/>   
             </div>
             <p className={classes.Links}>Welcome! {uname}</p>
             <p><a onClick={changed}className={classes.Link}>Home</a></p>
            <p><a  onClick={my}  className={classes.Link}>My Posts</a></p>
           <a onClick={profileClicked} className={classes.Link} > Profile</a>
     
     </div>      
        
    );
};

export default Sidebar;

//<input type="file" onChange={ (e) => props.imgUpload() } /> 