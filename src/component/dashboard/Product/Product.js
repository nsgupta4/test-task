import React from 'react';

import classes from './Product.css';

const product = (props) => (
    <article className={classes.Product} onClick={props.clicked}>
        <img src={props.img} alt="Product" className={classes.Image}/>
        <div>
            <div className={classes.Name}>{props.Name}</div>
        </div>
        <p>{props.title}</p>
        <div>{props.Price}$</div>
    </article>
);

export default product;