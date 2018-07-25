import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './utility';

const initialState = {
    posts:[],
    error: null,    
};

const addPostStart = (state, action) => {
    return updateObject(state, {
        error: null,
    });
};
const addPostSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
    });
};
const addPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};
const fetchPost = (state, action) => {
    return updateObject(state, {
        
        error: null,
    });
};
const fetchPostSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        error: null,
    });
};
const fetchPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_POST: return addPostStart(state, action);
        case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAIL: return addPostFail(state, action);
        case actionTypes.FETCH_POST: return fetchPost(state, action);
        case actionTypes.FETCH_POST_SUCCESS: return fetchPostSuccess(state, action);
        case actionTypes.FETCH_POST_FAIL: return fetchPostFail(state,action);
        default: return state;    
    }
};
export default reducer;