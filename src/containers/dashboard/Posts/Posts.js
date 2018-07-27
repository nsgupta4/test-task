import React, { Component } from 'react';
//import AddPost from '../../../component/dashboard/AddPost/AddPost';
import Post from '../../../component/dashboard/post/Post';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux';
class Posts extends Component {
    state = {
        posts: {
            content: '',
        },
    }
componentDidMount(){
        this.props.onFetchHandler(this.props.token); 
}
/*componentDidUpdate(){
    this.props.onFetchHandler(this.props.token, this.props.userId);
}*/
changedHandler = (event) => {
    this.setState({posts:{content: event.target.value}});
};
    render () {
        const postInfo ={
            postData: this.state.posts,
            userId: this.props.userId,
        };
        console.log('111111',this.props.posts)
        return (
            
             <Aux>
             <textarea class="form-control" rows="3"  onChange={this.changedHandler} 
             value={this.state.tweet} maxLength="140" placeholder="Write Something! limit char to 140"></textarea>
             <button type="button" className="btn btn-primary" onClick={() => this.props.onFetchHandler(this.props.token)}>Fetch Post</button>
                <button type="button" className="btn btn-primary" onClick={() => this.props.onAddHandler(this.props.token, postInfo)}>Add Post</button>
                {this.props.posts.map(post => (
                    <Post 
                        key={post.id}
                        number={post.id}
                        postData={post.postData}    
                        clicked={() => this.props.onDeleteHandler(this.props.token, post.id, this.props.userId)}/>
                ))}
            </Aux>
    
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.login.token,
        userId: state.login.userId,
        posts: state.fetch.posts,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddHandler: (token, userId, content) => dispatch(actions.addPost(token, userId, content)),
        onFetchHandler: (token, userId) => dispatch(actions.fetchPost(token)),
        onDeleteHandler: (token, postid, userId) => dispatch(actions.deletePost(token, postid, userId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Posts);
