import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import "./basket.css";


const showBasket = createAsyncThunk("show all order in the basket", async () => {
    await axios.post("http://localhost:4000/orders/");
});

const initialState = {
    orderDetails: {
        id: 0,
        orderDate: "",
        getOrder: "",
        phone: "",
        addres: "",
    },
    arrBasket: [],
    status: "idle",
    payment: 0,
    amount: 0
}
const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        UpdateOrderDetails: (state, action) => {
            state.orderDetails = { ...action.payload };
        },
        addProdToBasket: (state, action) => {
            let i = state.arrBasket.findIndex(item => item.id === action.payload.id);
            if (i === -1)
                state.arrBasket.push({ ...action.payload, qty: 1 })
            else
                state.arrBasket[i].qty++;
                console.log("payment before");
                console.log(action.payload.price);
            state.payment += action.payload.price;
            console.log("payment after");
                console.log(action.payload.price);
            state.amount++;
        },
        removeProdFromBasket: (state, action) => {
            let i = state.arrBasket.findIndex(item => item.id === action.payload);
            let p = state.arrBasket[i].price;
            let q = state.arrBasket[i].qty;
            state.arrBasket.splice(i, 1);
            state.payment -= p * q;
            state.amount -= q;
        }, 
        enterBasket:(state,action)=>{
            console.log(action.payload);
            state.arrBasket=action.payload;

        },
        decProductFromBasket: (state, action) => {
            let i = state.arrBasket.findIndex(item => item.id === action.payload);
            let p = state.arrBasket[i].price;
            if (state.arrBasket[i].qty === 1) {
                state.arrBasket.splice(i, 1);
            }
            else {
                state.arrBasket[i].qty--;
            }
            state.payment -= p;
            state.amount--;
        },
        addAmount: (state, action) => {
            state.num += action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(showBasket.fulfilled, (state, action) => {
            state.status = "fulfilled";
        }).addCase(showBasket.rejected, (state, action) => {
            state.status = "error";
        }).addCase(showBasket.pending, (state, action) => {
            state.status = "pending";
        })
    }
})
export const { UpdateOrderDetails, addProdToBasket, removeProdFromBasket, decProductFromBasket, } = basketSlice.actions;
export default basketSlice.reducer;
