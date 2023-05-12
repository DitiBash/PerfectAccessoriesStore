import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const fetchOneUser = createAsyncThunk('login', async (user, thunkA) => {
    const res = await axios.get("http://localhost:4000/user/" + user.nameOrMail+ "/" + user.password);
    console.log("res.data+++++++++++++")
    console.log(res.data)
    return res.data;
})
// export const fetchUserByEmail = createAsyncThunk('login', async (user, thunkA) => {
//     const res = await axios.get(`http://localhost:4000/user/${user.nameOrMail}`);
//     console.log(res.data)
//     return res.data;
// })
export const fetchAllUsers = createAsyncThunk('getAllUser', async (thunkAPI) => {
    const res = await axios.get("http://localhost:4000/user");
    console.log("usersss:");
    console.log(res.data);
    return res.data;
})
export const postUser = createAsyncThunk('signIn', async (newUser, thunkA) => {
    const res = await axios.post("http://localhost:4000/user", newUser);
    console.log("usersss post:");
    console.log(res.data);
    return res.data;
})

const initialState = {
    currentUser: null,
    status: "idle",
    userArr: []
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        signIn:(state,action)=>{
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", action.payload);
        },
        // login: (state, action) => {
        //     // state.currentUser = action.payload.name;
        //     console.log("action.payload-------");
        //     console.log(action.payload)
        //     // localStorage.setItem('currentUser', JSON.parse(action.payload));
        //     state.currentUser=JSON.parse(localStorage.getItem("currentUser"));
        //     console.log("after saving from the local storage")
        //     console.log(state.currentUser)

        // },
        logout: (state, action) => {
            state.currentUser = null;
            localStorage.setItem("currentUser", null);  

        },
        loadUser:(state,action)=>{
            console.log("before "+state.currentUser)
            state.currentUser=JSON.parse((localStorage.getItem("currentUser")));
            console.log("after "+state.currentUser)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOneUser.rejected, (state, action) => {
            state.status = "error";
            console.log(action);
            state.currentUser = null;
            alert("not valid");
        }).addCase(fetchOneUser.pending, (state, action) => {
            state.status = "pending";
        }).addCase(fetchOneUser.fulfilled, (state, action) => {
            console.log("in fulfilled")
            console.log(action.payload.name)
            state.currentUser = action.payload;
            state.status = "fulfilled";
        }).addCase(postUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.status = "fulfilled";
            console.log("currentUser")
            console.log(action.payload)
            alert("new user is enered")
        }).addCase(postUser.rejected, (state, action) => {
            alert("the user wasn't enterd")
            state.status = "error";

        }).addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.userArr=action.payload;
            state.status="fulfilled";
        }).addCase(fetchAllUsers.pending, (state, action) => {
            state.status = "pending";
        }).addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = "error";
        })
    }
});

export const { logout, login, loadUser } = userSlice.actions;
export default userSlice.reducer;