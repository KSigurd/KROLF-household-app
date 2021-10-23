import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChores } from "../../data/fireStoreModule";
import { chores } from "../../data/mockChoresData";
import { households } from "../../data/mockHouseholdData";
import { Chore } from "../../interfaces/chore";

interface ChoreState {
    chores: Chore[];
}

const initialState: ChoreState = {
    chores: []
};

const choreSlice = createSlice({
    name: 'chores',
    initialState,
    reducers: {
        // deposit: (state, { payload }: PayloadAction<number>) => {
        //     state.balance += payload;
        //     state.transactions.push(payload);
        //     return state;
        // },
        // withdrawal: (state, { payload }: PayloadAction<number>) => {
        //     state.balance -= payload;
        //     state.transactions.push(-payload);
        //     return state;
        // }
    }
});

// export const { deposit, withdrawal } = userSlice.actions;

export default choreSlice.reducer;