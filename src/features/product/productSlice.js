import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("get all product", async () => {
  let res = await axios.get("http://localhost:4000/product");
  return res.data;
});
export const fetchProductById = createAsyncThunk("get product by id", async (id) => {
  let res = await axios.get("http://localhost:4000/product" + id);
  return res.data;
});

const initialState = {
  productArr: [],
  status: "idel"
}
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productArr.push(action.payload);
    },
    deleteProduct: (state, action) => {
      let index = state.productArr.findIndex(item => item.id === action.payload);
      state.productArr.splice(index, 1);
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.productArr = action.payload;
      state.status = "fulfilled";
    }).addCase(fetchAllProducts.rejected, (state, action) => {
      state.status = "error";
    }).addCase(fetchAllProducts.pending, (state, action) => {
      state.status = "pending";
    }).addCase(fetchProductById.fulfilled, (state, action) => {
      state.productArr = action.payload;
      state.status = "fulfilled";
    }).addCase(fetchProductById.rejected, (state, action) => {
      state.status = "error";
    }).addCase(fetchProductById.pending, (state, action) => {
      state.status = "pending";
    })
  }

});
export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;