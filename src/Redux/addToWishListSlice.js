import axios from 'axios';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addToWishList = createAsyncThunk('addToWishList/addToWishList', async (productId) => {
    try {
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`, { 'productId': productId }, { headers: { 'token': localStorage.getItem('userToken') } })
        return data
    } catch (error) {
        console.log(error);
    }
})

const initialState = { data: [] }

const addToWishListSlice = createSlice({
    name: 'addToWishList',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addToWishList.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const addToWishListSliceReducer = addToWishListSlice.reducer