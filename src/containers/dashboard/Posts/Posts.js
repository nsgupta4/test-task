import React, { Component } from 'react';
//import AddPost from '../../../component/dashboard/AddPost/AddPost';
import Post from '../../../component/dashboard/post/Post';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

class Posts extends Component {
    state = {
        posts: {
            content: 'hello this is post',
        }
    }
componentDidMount(){
    
        this.props.onFetchHandler(this.props.token, this.props.userId);
    
}

    render () {
        const postInfo ={
            postData: this.state.posts,
            userId: this.props.userId,
        };
        console.log('111111',this.props.posts)
        return (
            <div>
            <button onClick={() => this.props.onFetchHandler(this.props.token, this.props.userId)}>Fetch Post</button>
                <button onClick={() => this.props.onAddHandler(this.props.token, postInfo)}>Add Post</button>
                {this.props.posts.map(post => (
                    <Post 
                        key={post.id}
                        number={post.id}
                        postData={post.postData}    
                        clicked={() => this.props.onDeleteHandler(post.id)}/>
                ))}
            </div>
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
        onFetchHandler: (token, userId) => dispatch(actions.fetchPost(token, userId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Posts);