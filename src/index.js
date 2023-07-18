import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productsSlice } from './redux/reducers/productsSlice';
import { cartSlice } from './redux/reducers/cartSlice';
import { userSlice } from './redux/reducers/userSlice';
import {store} from './redux/store'
// -------------------------------------------------------------------------------------
// const store = configureStore({
//   reducer: {
//     products: productsSlice.reducer,
//     cart: cartSlice.reducer,
//     user: userSlice.reducer,

//   },
//   middleware: [thunk],
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
