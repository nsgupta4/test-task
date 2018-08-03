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
    console.log('In postData', props.postData, posts);
    //console.log(posts.content.indexOf(props.query));
    const postOutput = posts.map(ig=>{
        return (<Aux><span 
        key={ig.date}
        > {ig.content} </span>
        <p 
        style={{
            textAlign:'right', 
            padding:'4px',
        }}
        > {ig.date}|{ig.time} </p>
    </Aux>)
     });
    
     

     console.log('All posts',postOutput,posts);
    let deleteButton = null;
    let editButton = null;
    if(props.onClickMyPost){
        editButton = (<a onClick={props.editClicked}><i className="far fa-edit"></i></a>);
        deleteButton = (<a onClick={props.clicked}><i className="far fa-trash-alt"></i> </a>);
    }
    if(props.search === 'true'){
  /*  var filtered = (props.filteredPost.map(ig=>{
        return <span 
        key={ig.content}
    > {ig.content} </span>}) );
*/
   var newF = [];
   for(let index in props.filteredPost){
        newF.push({
            id: index,
            content:props.filteredPost[index].content,
        })}
        var filtered = (props.filteredPost.map(ig=>{
            return <span 
            key={ig.id}
        > {ig.content}</span>}) );
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
    console.log('In post filtered', props.filteredPost, newF,filtered);
    }
    //console.log('In post filtered', props.filteredPost, filtered);
    return (
        <Aux>
        <div className={classes.Post}>
    
        <p className="text-left">post</p>
        <p>{ (props.search==='true') ? filtered : postOutput} </p>
      {editButton} 
        {deleteButton}
       
       <div>
        {props.search !== 'true' && postOutput !== '' ?<a onClick={props.liked}><i class="far fa-thumbs-up"></i>{props.postData.like}</a>:null }
       </div>
        </div> 
                <CommentBox postId={props.number} commentData={props.commentData} /> 
                </Aux>
    );
};
export default post; 

/*
const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        });
    }
    const ingredientOutput = ingredients.map(ig=>{
       return <span 
       key={ig.name}
       style={{
           textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc',
        }}
       >{ig.name} ({ig.amount}) </span>
    })
    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price:<strong>USD: {props.price.toFixed(2)} </strong></p>
    </div>
    );
    
};
export default order;  */
