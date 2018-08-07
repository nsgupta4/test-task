import React from 'react';
import classes from './rightSideBar.css';
import Users from '../dashboard/users';
const RightSideBar = (props) => {
  //const users = props.users;
  //let listUsers = '';
  
   /*if(users.length){
   listUsers = users.map((user,index) =>
  <div key={index}>
    <a onClick={() => props.getPosts(user.id)}>{user.first_name}  {user.last_name}</a>
    <hr/>
  </div>
  );
} 
*///console.log('In right Side bar');
    return (
    <div className={classes.Sidebar}>
        <h5 className={classes.Users}>My Connections</h5>
        <div className={classes.Posts}>
      {  props.users.map(ig=>{
    return <Users 
                key={ig.name}
                name={ig.name}
                username={ig.username}
                clicked={()=>props.showUsers(ig.userId, ig.username)}
            />;
 }) }
        </div>
    </div>
    );
};

export default RightSideBar;