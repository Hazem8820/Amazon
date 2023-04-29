import { configureStore } from "@reduxjs/toolkit";
import { categoriesSliderReducer } from "./CategorySliderSlice";
import { productsReducer } from './ProductsSlice';
import { BrandsSliceReducer } from './BrandsSlice';
import { productDetailsReducer } from "./ProdetailsSlice";
import { brandsDetailsReducer } from "./BrandDetailsSlice";
import { categoryDetailsSliceReducer } from "./CategoryDetailsSlice";
import { addToCartSliceReducer } from "./AddToCartSlice";
import { loggedUserCartReducer } from "./getLoggedUserCartSlice";
import { removeItemReducer } from "./removeItemSlice";
import { updateCartQuantityReducer } from "./updateCartQuantitiy";
import { addToWishListSliceReducer } from "./addToWishListSlice";
import { loggedUserWishlistReducer } from "./getLoggedUserWishlist";
import { removeItemSliceReducer } from "./removeItemFromWishlistSlice";
import { cashPaymentSliceReducer } from "./cashPaymentSlice";

export const myStore = configureStore({
    reducer: {
        categorySlider: categoriesSliderReducer,
        Products: productsReducer,
        Brands: BrandsSliceReducer,
        ProductDetails: productDetailsReducer,
        BrandsDetails: brandsDetailsReducer,
        CategoryDetails: categoryDetailsSliceReducer,
        AddtoCart: addToCartSliceReducer,
        getLoggedUserCart: loggedUserCartReducer,
        removeItemFromCart: removeItemReducer,
        updateCartQuantity: updateCartQuantityReducer,
        addToWishList: addToWishListSliceReducer,
        getLoggedUserWishlist: loggedUserWishlistReducer,
        removeItemFromWishlist: removeItemSliceReducer,
        cashPayment: cashPaymentSliceReducer,
    }
})