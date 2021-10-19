import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { completedChores } from "../../data/mockHouseholdData";
import { CompletedChore } from "../../interfaces/completedChore";

interface CompletedChoreState {
    compltedChore: CompletedChore[];
}

const initialState: CompletedChoreState = {
    compltedChore: completedChores
};

const completedChoreSlice = createSlice({
    name: 'completedChore',
    initialState,
    reducers: {
        
    }
});

// export const { metoder från reducer } = userSlice.actions;

export default completedChoreSlice.reducer;