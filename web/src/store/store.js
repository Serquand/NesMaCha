import { configureStore } from "@reduxjs/toolkit";

import user from "./User";
import displayer from "./Displayer";
import announce from "./Announce";


export const store = configureStore({
    reducer: { 
        user: user, 
        displayer: displayer,
        announce: announce
    }
});