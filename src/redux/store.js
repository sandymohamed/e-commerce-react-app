import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productsSlice } from './reducers/productsSlice';
import { cartSlice } from './reducers/cartSlice';
import { userSlice } from './reducers/userSlice';
import { orderSlice } from './reducers/orderSlice';

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
  },
  middleware,
});
