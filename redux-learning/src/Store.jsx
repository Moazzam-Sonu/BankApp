// import {applyMiddleware, combineReducers, createStore} from 'redux';
// import { thunk } from "redux-thunk";
// import {composeWithDevTools} from "redux-devtools-extension"
// import reducer from './features/accounts/accountSlice';
// import customerReducer from './features/customers/customerSlice';

// const rootReducer = combineReducers({
//     acount: reducer,
//     customer: customerReducer,
// })
// const store =createStore(rootReducer,applyMiddleware(thunk))

// export default store;


// for redux tolkit
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { thunk } from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit"
import reducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const store = configureStore({
    reducer:{
        acount: reducer,
        customer: customerReducer,
    }
})

export default store;