import React, { Component } from 'react';
import Post from '../../../component/dashboard/post/Post';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Aux from '../../../hoc/Aux';
import InfiniteScroll from 'react-infinite-scroll-component';
class Posts extends Component {
   
   constructor(props){
       super(props);
       this.state = {
        posts: {
            content: '',
            date: '',
            time: '',
            like: 0,
            username:'',
            //userId:'',
        },
        updating: false,
        query: '',
        sortedPost:[],
        //clicked: false,
        totalLikes: 0,
        items: Array.from({ length: 5 }),
    };
    
   } 

fetchMoreData = () => { }
sortPosts = () => {
    let sorted = this.props.posts.sort((a,b)=>{
       //var re =(b.postData.time > a.postData.time ? new Date(b.postData.date) > new Date(a.postData.date) : 0 ? n.push({content: a.postData.content,date:a.postData.date,time:a.postData.time}): 0);
       return (b.postData.time > a.postData.time);
    });
    this.setState({
        sortedPost: sorted, 
    });
   
}
updateHandler = (postData, postId) => {
    localStorage.setItem('postId', postId);
    this.setState({posts:{content: postData.content}, updating: true});
    //console.log('In updateHandler',postData.content);
};
changedHandler = (event) => {
   let newDate = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
   let newTime = `${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
   let newContent = event.target.value;
   this.setState({posts:{content: newContent, 
    date: newDate,
    time: newTime,
    like: 0,
    username: this.props.username,
    //userId: this.props.userId,
}}); 
};
fetchSearchedPost = (postId) =>{
    this.props.onFetchPostSearched(postId);
    this.setState({
        query:''
    });
} 
likeHandler = (postId, initLikes) => {
    //console.log('checking clicked value',postId);
    this.setState({totalLikes: initLikes});
        let like = initLikes + 1;
    this.props.onPostLikedHandler(postId, {like});
    //}
    //console.log('checking totalLikes value',this.state.totalLikes);
}
render () {
    //console.log("Posts---------------")
    //console.log('checking clicked value',this.state.clicked);
        const postInfo ={
            postData: this.state.posts,
            userId: this.props.userId,
        };
        let button = (<button type="button" className="btn btn-primary" onClick={() => this.props.onAddHandler(this.props.token, postInfo)} >Add Post</button>);
        if(this.state.updating){
            button= ( <Aux><button type="button" className="btn btn-primary" onClick={() => {
                this.props.onUpdatePostHandler(this.props.token, localStorage.getItem('postId') , this.state.posts);}
                }>Update Post</button>
                <button type="button" className="btn btn-primary" onClick={()=>this.setState({posts:{content: ''},updating: false})}>Cancel</button></Aux>
        );
        }
        let fPosts = [];
       // fPosts.content.toLowerCase().indexOf(this.state.query);
        (this.props.posts.map(index=>(
            fPosts.push({
                postData:index.postData,
                id: index.id
            })
        )));
        let filtered = [];
            fPosts.map((post) => {
            if(post.postData.content.indexOf(this.state.query)=== -1){ 
            return null;
            }
           return filtered.push(post);
        });
       
       let cPosts = [];
       // fPosts.content.toLowerCase().indexOf(this.state.query);
        (this.props.posts.map(index=>(
            cPosts.push({
                name: index.postData,
            })
        )));
       //console.log('This is',fPosts, filtered);
        //console.log('In pOsts Component',this.props.posts)
        let post = <InfiniteScroll 
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={false}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
        >
            {(this.props.posts.sort((a,b)=>{
            return (new Date(b.postData.date) > new Date(a.postData.date)) > (b.postData.time > a.postData.time);
        }).map(post => (
            <Post 
                key={post.id}
                number={post.id}
                postData={post.postData}
                commentData={post.commentData}
                query={this.state.query}
                liked={()=>this.likeHandler(post.id,post.postData.like)}
                onClickMyPost={this.props.myPost}
                editClicked={()=> this.updateHandler(post.postData, post.id)}    
                clicked={() => this.props.onDeleteHandler(this.props.token, post.id, this.props.userId)}/>
            )))}</InfiniteScroll>;
        if(this.props.loading){
            post = <RingLoader 
            loaderStyle={{display: "block", margin: "0 auto", borderColor: 'red'}}
            sizeUnit={"px"}
            size={150}/>;
        }
        if(this.state.query !== ''){
            post = <Post 
            filteredPost={filtered}
            search="true"
            fetchPostSearched={(postId)=>this.fetchSearchedPost(postId)}
            />;
        }
        return (
            
             <React.Fragment>
                 
             <textarea className="form-control" rows="3"  onChange={this.changedHandler} 
             value={this.state.posts.content} id= "textArea" maxLength="140" placeholder="Write Something! limit char to 140"></textarea>
              {button}

              <p><input type="text" placeholder="Search" 
              value={this.state.query} 
              onChange={(event)=>this.setState({query: event.target.value})}
              style={{margin:'10px', position:'relative'}}/>
              </p>

                {this.props.posts.length<=0? <p style={{textAlign:'center'}}>No Post to show </p>: post}
            </React.Fragment>
    
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.login.token,
        userId: state.login.userId,
        posts: state.fetch.posts,
        loading: state.fetch.loading,
        message: state.fetch.message,
        username: state.login.username,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddHandler: (token, userId, content) => dispatch(actions.addPost(token, userId, content)),
        onFetchHandler: (token, userId, myPost) => dispatch(actions.fetchPost(token,userId, myPost)),
        onDeleteHandler: (token, postid, userId) => dispatch(actions.deletePost(token, postid, userId)),
        onUpdatePostHandler: (token, postId, content) => dispatch(actions.updatePost(token, postId, content)),
        onPostLikedHandler: (postId, like) => dispatch(actions.postLiked(postId, like)),
        onFetchPostSearched:(postId) => dispatch(actions.fetchPostSearched(postId)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Posts);