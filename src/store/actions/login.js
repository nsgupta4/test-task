import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};
export const setUserSuccess = (name) => {
    return {
        type: actionTypes.AUTH_USER,
        name: name,
    };
};
export const setUserFail = (error) => {
    return{
        type: actionTypes.AUTH_USER_FAIL,
        error: error,
    }
}
export const authUserFail = (error) => {
    return {
        type: actionTypes.AUTH_USER_FAIL,
        error: error,
    };
};
export const getUserDetailsSuccess = (name) => {
    return{
        type: actionTypes.GET_USER_DETAILS_SUCCESS,
        username: name,
    };
};
export const getUserDetailsFail = (error) => {
    return{
        type: actionTypes.GET_USER_DETAILS_FAIL,
        error: error,
    };
};


export const setUserDetails = (userData) => {
    return dispatch => {
        axios.post('https://test-task-2ae5b.firebaseio.com/userdetails.json', userData)
        .then(response=> {
            //dispatch(setUserSuccess(response.data.name));
            //localStorage.setItem('name',response.data.name);
            console.log('All set');
        })
        .catch(error => {
            dispatch(setUserFail(error));
        });
    };
}
export const getUserDetails = (token, email) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="email"&equalTo="' + email + '"';
        axios.get('https://test-task-2ae5b.firebaseio.com/userdetails.json' + queryParams)
        .then(response => {
            console.log(response);
           // const newDetails = [];
          /*  const nn = {
                    ...response.data,
                    ui:{
                        ...response.data.userInfo,
                    }
                }*/
            console.log();
            dispatch(getUserDetailsSuccess(response));
        })
        .catch(err=> {
            console.log(err);
            dispatch(getUserDetailsFail(err.response.data.error));
        })
    };
};
export const signUp = (email, password, name, username, sex) => {
    return dispatch => {
        dispatch(authStart());
        const userInfo = {
            name: name,
            username: username,
            sex: sex,
        };
        const orderData = {
            userInfo: userInfo ,
            email: email,
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBxSji4t4TnT_eaD8YPOZNK6cMEK3Bn4Qs';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000 );
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(setUserDetails(orderData));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    };
};
export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBxSji4t4TnT_eaD8YPOZNK6cMEK3Bn4Qs';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000 );
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('email', email);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(getUserDetails(response.data.idToken, email));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))
        })
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000 );
    };
};


/*
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfvuLcgfs8SM0aPaFrq-2EJ6h8QO-0EUE';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfvuLcgfs8SM0aPaFrq-2EJ6h8QO-0EUE';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000 );
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    };
};  */

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if(expirationDate <= new Date()){
              dispatch(logout());
          }else {
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()/ 1000 ));
          }
        } 
    };
};