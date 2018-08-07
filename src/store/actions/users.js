import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getUsersStart = () => {
    return {
        type: actionTypes.GET_USERS_START
    };
};

export const getUsersSuccess = (users) => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users: users,
        error: null
    };
};

export const getUsersFail = (error) => {
    return {
        type: actionTypes.GET_USERS_FAIL,
        error: error,
    };
};
export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersStart());
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const queryParams = '?auth=' + token;
        axios.get('https://test-task-2ae5b.firebaseio.com/userdetails.json' + queryParams)
        .then(response => {
           // console.log('GET USERS',response.data);
           const newDetails = [];
            for(let key in response.data){
              if(response.data[key].userId !== userId) {
                newDetails.push({
                  ...response.data[key],
                  id: key
                }); 
            }
        }
        //console.log('newDetails', newDetails);
        dispatch(getUsersSuccess(newDetails));
        })
        .catch(err=> {
           // console.log(err);
            dispatch(getUsersFail(err.response.data.error));
        });
    };
};

