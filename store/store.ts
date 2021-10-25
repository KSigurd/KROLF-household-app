import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "./user/userSlice";
import choreReducer from "./chore/choreSlice";
import householdReducer from "./household/householdSlice";
import completedChoreReducer from "./completedChore/completedChoreSlice";
import householdUserReducer from "./householdUser/householdUserSlice";

const store = configureStore({
    reducer: {
       user: userReducer,
       householdUser: householdUserReducer,
       chore: choreReducer,
       completedChore: completedChoreReducer,
       household: householdReducer,
    }
});

/* Derive types from our store */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkConfig = {
    state: RootState;
    dispatch: AppDispatch;
}

/* Redefine hooks with our types */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;