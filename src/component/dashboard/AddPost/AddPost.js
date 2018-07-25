import React,{ Component } from 'react';

import classes from './AddPost.css';

class AddPost extends Component {
    
  
    render(){
        return (
            <div className={classes.AddPost}>
            <button onClick={ () => this.props.postAdded()}>Add Post</button>
        </div>
        );
    }
} 

export default AddPost;