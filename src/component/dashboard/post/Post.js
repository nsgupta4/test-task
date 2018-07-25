import React from 'react';
import classes from './Post.css';
const post = (props) => {
    const posts = [];
    for(let index in props.postData){
        posts.push({
            name: index,
            content: props.postData[index],
        });
    }
    const postOutput = posts.map(ig=>{
        return <span 
        key={ig.name}
        >{ig.name} ({ig.content}) </span>
     })
    return (
        <div className={classes.Post}>
        <h1>Post {props.number}</h1>
        <p>{postOutput} </p>
        </div>
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