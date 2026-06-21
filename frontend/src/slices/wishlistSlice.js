import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : { wishlistItems: [] };

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlistItem: (state, action) => {
            const item = action.payload;
            const exists = state.wishlistItems.find((x) => x._id === item._id);
            if (exists) {
                state.wishlistItems = state.wishlistItems.filter((x) => x._id !== item._id);
            } else {
                state.wishlistItems = [...state.wishlistItems, item];
            }
            localStorage.setItem("wishlist", JSON.stringify(state));
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((x) => x._id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state));
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
            localStorage.setItem("wishlist", JSON.stringify(state));
        },
    },
});

export const { toggleWishlistItem, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
