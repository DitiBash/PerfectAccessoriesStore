import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";


export const addProductBymanager = createAsyncThunk("add product by manager", async (item, thunkApi) => {
    console.log("i come in thunk " + thunkApi);
    console.log(item);
    let res = await axios.post("http://localhost:4000/product/", item);///add product by manager to db
    return res.data;
});
export const editProductBymanager = createAsyncThunk("edit product by manager", async (item, thunkApi) => {
    console.log("item+++++++++++: ");
    console.log(item);
    let res = await axios.put("http://localhost:4000/product/" + item.id, item);///add product by manager to db
    return res.data;
});
export const deleteProductBymanager = createAsyncThunk("delete product by manager", async (id, thunkApi) => {
    let res = await axios.delete(`http://localhost:4000/product/${id}`);///delete product by manager from db
    return res.data;
});

const initialState = {
    status: "idle",
    message: undefined,
    forEdit: JSON.parse(localStorage.getItem("isEdit")),
    savingStatus: undefined,
}


const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        selectForEdit: (state, action) => {
            state.forEdit = action.payload;
            localStorage.setItem("isEdit",JSON.stringify(action.payload))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProductBymanager.fulfilled, (state, action) => {
            state.savingStatus = "fulfilled";
        }).addCase(addProductBymanager.rejected, (state, action) => {
            state.savingStatus = "error";
            state.message = "saving in server failed";
        }).addCase(addProductBymanager.pending, (state, action) => {
            state.savingStatus = "pending";
        }).addCase(editProductBymanager.fulfilled, (state, action) => {
            state.forEdit=false
            localStorage.setItem("isEdit",false)
        }).addCase(deleteProductBymanager.rejected, (state, action) => {
            state.savingStatus = "error";
            console.log("the products isn't deleted")
        }).addCase(deleteProductBymanager.pending, (state, action) => {
            state.savingStatus = "pending";
        }).addCase(deleteProductBymanager.fulfilled, (state, action) => {
            state.savingStatus = "fulfilled";
            console.log("The product has been successfully deleted")
           
        })

    }

});

export const {selectForEdit } = managerSlice.actions;
export default managerSlice.reducer;


