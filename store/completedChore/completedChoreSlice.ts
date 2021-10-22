import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { completedChores } from "../../data/mockHouseholdData";
import { CompletedChore } from "../../interfaces/completedChore";

interface CompletedChoreState {
    completedChore: CompletedChore[];
}

const initialState: CompletedChoreState = {
    completedChore: completedChores
};

const completedChoreSlice = createSlice({
    name: 'completedChore',
    initialState,
    reducers: {
        
    }
});

// export const { metoder från reducer } = userSlice.actions;

export default completedChoreSlice.reducer;