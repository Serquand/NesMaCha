import { createSlice } from "@reduxjs/toolkit";

const initialState = { menuVisible: true };

const displayerSlice = createSlice({
    name: "displayer",
    initialState, 
    reducers: {
        toggleMenu: (state) => {
            state.menuVisible = !state.menuVisible; 
        }, 

        hideMenu: (state) => {
            state.menuVisible = false;
        }
    }
});

export const { toggleMenu, hideMenu } = displayerSlice.actions;
export default displayerSlice.reducer;