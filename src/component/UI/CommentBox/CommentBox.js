import React, { Component } from 'react';
import classes from './CommentBox.css';
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class CommentBox extends Component{
    state = {
       commentData:{
            comment:'',
            name:'',
        },
        out: '',
        message:'',
        hide: true,
   }   
   changeHandler = (event) => {
    this.setState({
      commentData:{
          comment: event.target.value,
          name: this.props.name,
      }
    });
    console.log('In Comment BOx', this.state.commentData, this.props.commentData);
   }
   showCommentHandler = () => {
       this.setState({hide: !this.state.hide, message: ''})
    let comments = [];
    for(let key in this.props.commentData){
        comments.push({
            comment:this.props.commentData[key].comment,
            name: this.props.commentData[key].name,
            id: key,        
        })
    }
    if(comments.length<=0){
        this.setState({message:"No comments to show"});
    }
    const output = comments.map((item,index) => {
        return (
            // Object.keys(item).map((commentKey, idx) => {
                // return (
                    <React.Fragment>
                        <div className={classes.singlecontainer}>
                        <span key={index}>
                    {item['name']}
                    </span>
                    <span key={item.id}>
                    {item['comment']}&nbsp;&nbsp;
                    </span>
                   <br/>
                    </div>
                </React.Fragment>
                // )
            // })
        );
        
    });
    this.setState({out:output});
    console.log('In Comment BOx show handler',this.props.commentData, comments, this.state.out);
}
    render(){
    return (
        <div onDoubleClick={this.showCommentHandler} className={classes.input}>
        <input 
        type="text" 
        value={this.state.commentData.comment} 
        onChange={this.changeHandler} 
        placeholder="Write a comment"
        className={classes.input}/>
        <button type="button" className="btn btn-primary" onClick={()=>this.props.onCommentHandler(this.props.postId, this.state.commentData)} style={{height: '30px'}}>Comment</button>
        <a onClick={this.showCommentHandler} className={classes.Expand}><i className="fas fa-chevron-circle-down fa-2x"></i></a>
      <div className={classes.singlecomment}>
      
      {this.state.message.length<=0 ? this.state.hide ? this.state.out : null : this.state.message}
      </div>
        </div>
    );
}
};
const mapStateToProps = state => {
    return {
        name: state.login.name,
        posts: state.fetch.posts,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onCommentHandler: (postId, commentData) => dispatch(actions.addComment(postId, commentData)), 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox); 

