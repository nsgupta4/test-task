import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/authReducer';
import postReducer from './store/reducers/postReducer';
import userReducer from './store/reducers/userReducer';
import productReducer from './store/reducers/productReducer';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    form: reduxFormReducer,
    login: authReducer,
    fetch: postReducer,
    user: userReducer,
    item: productReducer,
});

const store= createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
