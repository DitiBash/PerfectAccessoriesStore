import{configureStore} from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice"
import basketSlice from "../features/orders/basketSlice";
import managerSlice from "../features/manager/managerSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
    reducer:{
        product: productSlice,
        basket:basketSlice,
        manager:managerSlice,
        user:userSlice
    },
})