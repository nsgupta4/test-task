import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';
const initialState = {
    products : [],
    cart: [],
    error:'',
    cartLength: 0,
    status: '',
};

const fetchProductSuccess = (state, action) => {
    return updateObject(state,{
        products: action.products
    });
};
const fetchProductFail = (state, action) => {
    return updateObject(state,{
        error: action.error
    });
};
const purchaseInitSuccess = (state, action) => {
    return updateObject(state,{
        cart: action.cart,
        cartLength: action.cart.length,
    });
};
const purchaseInitFail = (state, action) => {
    return updateObject(state,{
        error: action.error
    });
};
const removeCartSuccess = (state, action) => {
    return updateObject(state,{
        cart: action.cart,
        cartLength: action.cart.length,
    });
};
const removeCartFail = (state, action) => {
    return updateObject(state,{
        error: action.error
    });
};
const addProductSuccess = (state, action) => {
    return updateObject(state,{
        status: action.status
    });
};
const addProductFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
    });
};
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail(state, action);
        case actionTypes.PURCHASE_INIT_SUCCESS: return purchaseInitSuccess(state, action);
        case actionTypes.PURCHASE_INIT_FAIL: return purchaseInitFail(state, action);
        case actionTypes.REMOVE_CART_ITEM_SUCCESS: return removeCartSuccess(state, action);
        case actionTypes.REMOVE_CART_ITEM_FAIL: return removeCartFail(state, action);
        case actionTypes.ADD_PRODUCT_SUCCESS: return addProductSuccess(state, action);
        case actionTypes.ADD_PRODUCT_FAIL: return addProductFail(state, action);
        default: return state;
    }
};

export default reducer;