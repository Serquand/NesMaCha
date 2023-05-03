import { configureStore } from "@reduxjs/toolkit";
import displayer from "./Displayer";
import user from "./User";

export const store = configureStore({
    reducer: { 
        user: user, 
        displayer: displayer, 
    }
});