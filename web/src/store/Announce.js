import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    creation: false
};

const announceSlice = createSlice({
    name: "announce",
    initialState, 
    reducers: {
        toggleCreateAnnounce: (state) => {
            state.creation = !state.creation;
        }
    }
});

export const { toggleCreateAnnounce } = announceSlice.actions;
export default announceSlice.reducer;