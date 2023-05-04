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
        }, 
    
        switchCategory: (state, newCategory) => {
            if(newCategory.payload == "Accueil") state.menuVisible = false; 
            else if(state.category == newCategory.payload) state.menuVisible = !state.menuVisible; 
            else {
                state.menuVisible = true;
                state.category = newCategory.payload;
            }
        }
    }
});

export const { toggleMenu, switchCategory } = displayerSlice.actions;
export default displayerSlice.reducer;