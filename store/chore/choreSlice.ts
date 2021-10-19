import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chores } from "../../data/mockChoresData";
import { households } from "../../data/mockHouseholdData";
import { Chore } from "../../interfaces/chore";

interface choreState {
    chores: Chore[];
}

const initialState: choreState = {
    chores: [],
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