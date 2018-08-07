import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchProductSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        products: products
    };
};
export const fetchProductFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error
    };
};
export const fetchProducts = () => {
    return dispatch =>{
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response =>{
            const products= response.data.slice(0,20);
            const updatedProducts = products.map(photos =>{
                return {
                    ...photos,
                    Name:'Product-1',
                    price: '100$'
                };
            });
            console.log('In Products.js',products, updatedProducts);
            dispatch(fetchProductSuccess(updatedProducts));
            //this.setState({products: updatedProducts});

            //console.log(response);
 }).catch(error =>{
    //this.setState({error:true});
    console.log(error);
 });
    };
};