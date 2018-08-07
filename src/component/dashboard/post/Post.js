import React from 'react';
import classes from './Post.css';
import Aux from '../../../hoc/Aux';
import CommentBox from '../../UI/CommentBox/CommentBox';
const post = (props) => {
    const posts = [];
  if(!props.filteredPost){  posts.push({
        content: props.postData.content,
        date: props.postData.date,
        time: props.postData.time,
        username: props.postData.username,
    });
}
    /*const newCheck = {
        content: props.postData.content,
    }
    const newPost = [];
    for(let key in posts){
        newPost.push({
            content:posts[key],  
        })
    }
    const np = [];
    for(let key in newPost){
        np.push({
            content:newPost[key],
        });
    }*/
   /*  const check= newPost.map( newP =>{
         return{
             content: newP.content,
             date: newP.date,
             time: newP.time,
         }
     })*/
    //console.log('In postData', props.postData, posts);
    //console.log(posts.content.indexOf(props.query));
    const postOutput = posts.map(ig=>{
        return (<span 
        key={ig.date}
        > {ig.content} </span>
    );
     });
    
     

     //console.log('All posts',postOutput,posts);
    let deleteButton = null;
    let editButton = null;
    if(props.onClickMyPost){
        editButton = (<a onClick={props.editClicked} className={classes.actionbutton}><i className="far fa-edit fa-2x"></i></a>);
        deleteButton = (<a onClick={props.clicked} className={classes.actionbutton}><i className="far fa-trash-alt fa-2x"></i> </a>);
    }
    if(props.search === 'true'){
  /*  var filtered = (props.filteredPost.map(ig=>{
        return <span 
        key={ig.content}
    > {ig.content} </span>}) );

   var newF = [];
   for(let index in props.filteredPost){
        newF.push({
            content:props.filteredPost[index].content,
        })} */
        var filtered = (props.filteredPost.map((ig,index)=>{
            return (
            <React.Fragment key={index}>
                <a onClick={()=>props.fetchPostSearched(ig.id)}><span key={index}>
                    {ig.postData['username']}
                </span></a> &nbsp;&nbsp;&nbsp;
                <span 
                    style={{
                    margin: '0 8px',
                    padding: '5px',
                    border: '1px solid #ccc',}}
                > {ig.postData['content']}</span><br/><br/>
        </React.Fragment>
    );
        }) );
       // var filt = [];
       // for(let key in newF){
       //     filt.push({key.content)
       // }
        /*
        var filtered = (newF.map(ig=>{
            return <span 
            key={ig.name}
        > {ig.content} </span>}) );*/
   /* for(let index in props.filteredPost){
        return <span>{props.filteredPost[index].content}</span>
    }*/
   //console.log('In post filtered', props.filteredPost,filtered);
    }
    //console.log('In post filtered', props.filteredPost, filtered);
    return (
        <Aux>
         <div className={classes.App}>  
        <div className={classes.creator}>
        {!props.filteredPost ? <img alt=""/>: null}
        <div>
        <p>{!props.filteredPost ? props.postData.username : null}</p>
        <p className="text-right">{!props.filteredPost ? props.postData.date : null } | { !props.filteredPost ? props.postData.time : null}</p></div>
        </div>
        <p className={classes.message}>{ (props.search==='true') ? filtered : postOutput} </p>
      
       
       <div className={classes.bar}>
        {props.search !== 'true' && postOutput !== '' ?<a onClick={props.liked} className={classes.actionbutton}><i className="far fa-thumbs-up fa-2x"></i>{props.postData.like}</a>:null }
        {props.search !== 'true' && postOutput !== '' ?<a className={classes.actionbutton} 
        >
        <i className="far fa-comment fa-2x"></i></a>:null }
        {editButton} 
        {deleteButton}
       </div>
       
       {!props.filteredPost ? <CommentBox postId={props.number} commentData={props.commentData} />: null }
               </div>
                </Aux>
    );
};
export default post;