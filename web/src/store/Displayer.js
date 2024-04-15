import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: "Chat" };

const displayerSlice = createSlice({
    name: "displayer",
    initialState, 
    reducers: {
        switchCategory: (state, newCategory) => {
            if(newCategory.payload == "Accueil") return;
            state.category = newCategory.payload;
        }
    }
});

export const { switchCategory } = displayerSlice.actions;
export default displayerSlice.reducer;