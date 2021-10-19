import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { households } from "../../data/mockHouseholdData";
import { Household, HouseholdUser } from "../../interfaces/households";

interface HouseholdState {
    household: Household[];
}

const initialState: HouseholdState = {
    household: households,
};

const householdSlice = createSlice({
    name: 'household',
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

export default householdSlice.reducer;