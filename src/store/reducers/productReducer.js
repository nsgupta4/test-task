import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';
const initialState = {
    products : [],
    error:'',
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail(state, action);
        default: return state;
    }
};

export default reducer;