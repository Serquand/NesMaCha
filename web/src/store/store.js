import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./User";

export const store = configureStore({
    reducer: { user: UserReducers }
});