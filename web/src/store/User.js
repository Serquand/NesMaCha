import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    userMail: "", 
    userName: "", 
    userToken: "" 
};

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        auth: (state, informations) => {
            state.userMail = informations.payload.mail; 
        }
    }
});

export const { auth } = userSlice.actions;
export default userSlice.reducer;