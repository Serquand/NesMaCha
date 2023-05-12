import { createSlice } from "@reduxjs/toolkit";

const initialState = { userName: "", userToken: "" };

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setLogin: (state, payload) => {
            state.userToken = payload.payload.userToken;
            state.userName = payload.payload.userName;
        }
    }
});

export const { auth, setLogin } = userSlice.actions;
export default userSlice.reducer;