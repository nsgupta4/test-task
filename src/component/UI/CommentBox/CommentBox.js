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
                    <p key={item.id} style={{
                        margin: '0 8px',
                        padding: '5px',
                        border: '1px solid #ccc',
                    }}>
                    {item['comment']}&nbsp;&nbsp;
                    </p>
                    <span key={index} style={{
                        margin: '0 8px',
                        padding: '5px',
                    }}>
                    {item['name']}
                    </span><br/>
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
        <div className={classes.Comment} onDoubleClick={this.showCommentHandler}>
        <i class="far fa-comment"></i>
        <input type="text" value={this.state.commentData.comment} onChange={this.changeHandler}/>
        <button type="button" className="btn btn-primary" onClick={()=>this.props.onCommentHandler(this.props.postId, this.state.commentData)}>Comment</button>
      <div>
      {this.state.message.length<=0? this.state.out: this.state.message}

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

