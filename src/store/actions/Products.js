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
        axios.get('http://localhost:3000/products')
        .then(response =>{
            //const products= response.data.slice(0,20);
            const updatedProducts = response.data.map(photos =>{
                return {
                    ...photos
                };
            });
            console.log('In Products.js',response.data, updatedProducts);
            dispatch(fetchProductSuccess(updatedProducts));
            //this.setState({products: updatedProducts});

            //console.log(response);
 }).catch(error =>{
    //this.setState({error:true});
    console.log(error);
 });
    };
};

export const purchaseInitSuccess = (cart) => {
    return {
        type: actionTypes.PURCHASE_INIT_SUCCESS,
        cart: cart,
        cartLength: cart.length,
    };
};
export const purchaseInitFail = (error) => {
    return {
        error: error,
    };
};

export const purchaseInit = (cartItem) => {
    return dispatch=>{
        console.log('In action', cartItem);
        dispatch(purchaseInitSuccess(cartItem));
    };
};

export const removeCartItemSuccess = (updatedCart) => {
    return {
        type: actionTypes.REMOVE_CART_ITEM_SUCCESS,
        cart: updatedCart,
        cartLength: updatedCart.length,
    };
};

export const removeCartItemFail = (error) => {
    return {
        type: actionTypes.REMOVE_CART_ITEM_FAIL,
        error: error,
    };
};
export const removeCartItem = (id, cart) => {
    return dispatch => {
        console.log('In action',id);
        let newCart = cart;
        newCart.splice(id,1);
        dispatch(removeCartItemSuccess(newCart));
    };
};

export const addProductSuccess = (status) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        status:status,
    };
};
export const addProductFail = (error) => {
    
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error: error
    };
};
export const addProduct = (productData) => {
    return dispatch=>{
        axios.post('http://localhost:3000/products',productData)
        .then((response)=>{
            
            console.log('In addProduct response',response.status);
            dispatch(addProductSuccess(response.status));
            
        })
        .catch(error=>{
            
            dispatch(addProductFail(error));
        });
    };
};