import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';
import wishlistSliceReducer from './slices/wishlistSlice';

const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
        auth: authSliceReducer,
        wishlist: wishlistSliceReducer,
    },
    devTools: true,
});

export default store;