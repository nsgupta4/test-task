import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addPostStart = () => {
    return {
        type: actionTypes.ADD_POST,
    };
};
export const addPostSuccess = () => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,

    };
};
export const addPostFail = (error) => {
    return {
        type: actionTypes.ADD_POST_FAIL,
        error: error,
    };
};
export const addPost = (token, postData) =>{
    return dispatch => {
        const userId = localStorage.getItem('userId');
                dispatch(addPostStart());
        axios.post('https://test-task-2ae5b.firebaseio.com/users.json?auth=' + token, postData)
        .then(response=> {
            dispatch(addPostSuccess());
            console.log(response);
            dispatch(fetchPost(token, userId));
        })
        .catch(error => {
            dispatch(addPostFail(error));
            console.log(error);
        });
    };
};

export const fetchPost = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://test-task-2ae5b.firebaseio.com/users.json' + queryParams)
        .then(response => {
         let fetchedPost = [];
            for(let key in response.data){
                fetchedPost.push({
                    ...response.data[key],
                    id: key,
                });
            }  
            dispatch(fetchPostSuccess(fetchedPost));
        })
        .catch(err=>{
            dispatch(fetchPostFail(err));
    });
    };
};
const fetchPostSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        posts: posts,
        error: null,
    };
};
const fetchPostFail = (error) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        error: error,
    }
}