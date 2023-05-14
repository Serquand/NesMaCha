import { createSlice } from "@reduxjs/toolkit";
import { setupSession } from "../Socket/socket";

const initialState = { userName: "", userToken: "" };

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setLogin: (state, payload) => {
            state.userToken = payload.payload.userToken;
            state.userName = payload.payload.userName;
            setupSession(state.userName, state.userToken);
        }
    }
});

export const { auth, setLogin } = userSlice.actions;
export default userSlice.reducer;