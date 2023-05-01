import { configureStore } from "@reduxjs/toolkit";
import displayerReducers from "./Displayer";
import userReducers from "./User";

export const store = configureStore({
    reducer: { 
        user: userReducers, 
        displayer: displayerReducers
    }
});