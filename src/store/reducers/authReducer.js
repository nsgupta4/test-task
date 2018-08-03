import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';


const initialState = {
    name: null,
    username: null,
    token: null,
    userId: null,
    error: null,
    loading: false,
}
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
    });
};
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};

const authUser = (state, action) => {
    return updateObject(state, {
        name: action.name,
        username: action.username,
    });
};
const authUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};
const getUserDetailsSuccess = (state, action) => {
    return updateObject(state,{
        username: action.username,
        name: action.name,
    });
};
const getUserDetailsFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const updateProfileStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const updateProfileSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
};
const updateProfileFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};
const updatePasswordStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};
const updatePasswordSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
    });
};
const updatePasswordFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_USER: return authUser(state, action);
        case actionTypes.AUTH_USER_FAIL: return authUserFail(state,action);
        case actionTypes.GET_USER_DETAILS_SUCCESS: return getUserDetailsSuccess(state, action);
        case actionTypes.GET_USER_DETAILS_FAIL: return getUserDetailsFail(state, action);
        case actionTypes.UPDATE_POST_START: return updateProfileStart(state, action);
        case actionTypes.UPDATE_POST_SUCCESS: return updateProfileSuccess(state, action);
        case actionTypes.UPDATE_POST_FAIL: return updateProfileFail(state, action);
        case actionTypes.UPDATE_PASSWORD_START: return updatePasswordStart(state, action);
        case actionTypes.UPDATE_PASSWORD_SUCCESS: return updatePasswordSuccess(state, action);
        case actionTypes.UPDATE_PASSWORD_FAIL: return updatePasswordFail(state, action);
        default: return state;    
    }
};
export default reducer;