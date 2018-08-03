import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './utility';

const initialState = {
    posts:[],
    error: null,
    loading: false,
    myPost: false,
    home: false,
    updating: false,
    count: '', 
    message:'',  
};

const addPostStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const addPostSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
};
const addPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};
const fetchPost = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const fetchPostSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        error: null,
        loading: false,
        myPost: action.myPost,
    });
};
const fetchPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};
const deletePost = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: true,
    })
};
const deletePostSuccess = (state, action) => {
    return updateObject(state,{
        error:null,
        loading: false,
    });
};
const deletePostFail = (state, action) => {
    return updateObject(state,{
        error:action.error,
        loading: false,
    });
};
const postLikedStart = (state, action) => {
    return updateObject(state, {
        error: null,
    });
};
const postLikedSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
    });
};
const postLikedFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};
const fetchLikesSuccess = (state, action) => {
    return updateObject(state,{
        count:action.count,
    })
}
const fetchLikesFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
    });
};
const addCommentStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const addCommentSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
};
const addCommentFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
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
        case actionTypes.DELETE_POST: return deletePost(state, action);
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state,action);
        case actionTypes.POST_LIKED_START: return postLikedStart(state, action);
        case actionTypes.POST_LIKED_SUCCESS: return postLikedSuccess(state, action);
        case actionTypes.POST_LIKED_FAIL: return postLikedFail(state, action);
        case actionTypes.FETCH_LIKES_SUCCESS: return fetchLikesSuccess(state, action);
        case actionTypes.FETCH_LIKES_FAIL: return fetchLikesFail(state, action);
        case actionTypes.ADD_COMMENT_START: return addCommentStart(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
        default: return state;    
    }
};
export default reducer;