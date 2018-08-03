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

export const fetchPost = (token, userId, myPost, userPost) => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let url = 'https://test-task-2ae5b.firebaseio.com/users.json'
        let queryParams = '?auth=' + token;
        if(myPost){
            url = 'https://test-task-2ae5b.firebaseio.com/users.json'
            queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        }
        if(userPost){
            url = 'https://test-task-2ae5b.firebaseio.com/users.json'
            queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        }
        axios.get(url + queryParams)
        .then(response => {
         let fetchedPost = [];
            for(let key in response.data){
                fetchedPost.push({
                    ...response.data[key],
                    id: key,
                });
            } 
            console.log('Inside action',response.data, fetchedPost); 
            dispatch(fetchPostSuccess(fetchedPost,myPost));
        })
        .catch(err=>{
            dispatch(fetchPostFail(err));
    });
    };
};
export const fetchPostSuccess = (posts,myPost) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        posts: posts,
        error: null,
        myPost: myPost,
    };
};
export const fetchPostFail = (error) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        error: error,
    }
}

export const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST,
    };
};
export const deletePostSuccess = (message) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        error: message, 
    };
};
export const deletePostFail = (error) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: error, 
    };
};

export const deletePost = (token, key, userId) => {
    return dispatch => {
        dispatch(deletePostStart());
        const queryParams =  key + '.json?auth=' + token;
        axios.delete('https://test-task-2ae5b.firebaseio.com/users/' + queryParams)
        .then(response => { 
            dispatch(deletePostSuccess(response.data));
        })
        .catch(err=>{
            dispatch(deletePostFail(err.response.data.error));
    });
    };
}

export const updatePostStart = () => {
    return {
        type: actionTypes.UPDATE_POST_START,
    };
};
export const updatePostSuccess = () => {
    return {
        type: actionTypes.UPDATE_POST_SUCCESS,
    };
};
export const updatePostFail = (error) => {
    return {
        type: actionTypes.UPDATE_POST_FAIL,
        error: error,
    };
};
export const updatePost = (token, key ,postData) =>{
    return dispatch => {
        const userId = localStorage.getItem('userId');
                dispatch(updatePostStart());
                const queryParams = key +'/postData.json/?auth=' + token;
        axios.patch('https://test-task-2ae5b.firebaseio.com/users/' + queryParams, postData)
        .then(response=> {
            dispatch(updatePostSuccess(response.data));
            console.log(response);
            dispatch(fetchPost(token, userId));
        })
        .catch(error => {
            dispatch(updatePostFail(error));
            console.log(error);
        });
    };
};

export const postLikedStart = () => {
    return {
        type: actionTypes.POST_LIKED_START,
    };
};
export const postLikedSuccess = () => {
    return {
        type: actionTypes.POST_LIKED_SUCCESS,
    };
};
export const postLikedFail = (error) => {
    return {
        type: actionTypes.POST_LIKED_FAIL,
        error: error,
    };
};
export const postLiked = (postId ,postData) =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
                dispatch(postLikedStart());
                const queryParams = postId +'/postData.json/?auth=' + token;
        axios.patch('https://test-task-2ae5b.firebaseio.com/users/' + queryParams, postData)
        .then(response=> {
            dispatch(postLikedSuccess(response.data));
            console.log(response);
            dispatch(fetchPost(token, userId));
        })
        .catch(error => {
            dispatch(postLikedFail(error));
            console.log(error);
        });
    };
};

export const fetchLikesSuccess = (count) =>{
    return {
        type: actionTypes.FETCH_LIKES_SUCCESS,
        count: count,
    };
};
export const fetchLikesFail = (error) =>{
    return {
        type: actionTypes.FETCH_LIKES_FAIL,
        error: error,
    };
};
export const fetchLikes = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let url = 'https://test-task-2ae5b.firebaseio.com/users.json'
        let queryParams = '?auth=' + token;
        axios.get(url + queryParams)
        .then(response => {
         let fetchedPost = [];
            for(let key in response.data){
                fetchedPost.push({
                    ...response.data[key],
                    id: key,
                });
            } 
            console.log('Inside action',response.data, fetchedPost); 
            dispatch(fetchLikesSuccess());
        })
        .catch(err=>{
            dispatch(fetchLikesFail(err));
    });
    };  
}