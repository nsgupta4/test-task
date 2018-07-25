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
export const setUserDetails = (userData) => {
    return dispatch => {
        axios.post('https://test-task-2ae5b.firebaseio.com/users.json', userData)
        .then(response=> {
            dispatch(setUserSuccess(response.data.name));
        })
        .catch(error => {
            dispatch(setUserFail(error));
        });
    };
}
export const signUp = (email, password, name, username, sex) => {
    return dispatch => {
        dispatch(authStart());
        const orderData = {
            email: email,
            username: username,
            sex: sex,
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
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
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