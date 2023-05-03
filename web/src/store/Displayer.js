import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    menuVisible: false, 
    category: "Chat"
};

const displayerSlice = createSlice({
    name: "displayer",
    initialState, 
    reducers: {
        toggleMenu: (state) => {
            state.menuVisible = !state.menuVisible; 
            console.log("Le menu est ouvert :", state.menuVisible)
        }, 
    
        switchCategory: (state, newCategory) => {
            if(state.category == newCategory.payload) state.menuVisible = !state.menuVisible; 
            else {
                state.menuVisible = true;
                state.category = newCategory.payload;
                console.log("Nous sommes passés à la catégorie ", newCategory.payload);
            }
        }
    }
});

export const { toggleMenu, switchCategory } = displayerSlice.actions;
export default displayerSlice.reducer;