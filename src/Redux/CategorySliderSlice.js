import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = { data: [] }

export const getCategoriesSlider = createAsyncThunk('CatSlider/getCategoriesSlider', async () => {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories').catch((error) => {
        console.log(error);
    })
    return data
})

const CategorySliderSlice = createSlice({
    name: 'CatSlider',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesSlider.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const categoriesSliderReducer = CategorySliderSlice.reducer