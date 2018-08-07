import React from 'react';

import classes from './Product.css';

const product = (props) => (
    <article className={classes.Product} onClick={props.clicked}>
        <img alt="Product"/>
        <div>
            <div className={classes.Name}>{props.Name}</div>
        </div>
        <div>{props.Price}</div>
    </article>
);

export default product;