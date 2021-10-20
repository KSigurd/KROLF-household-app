import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { households } from "../../data/mockHouseholdData";
import { Household } from "../../interfaces/households";
import { HouseholdUser } from "../../interfaces/householdUser";
import { ThunkConfig } from "../store";

export const joinHouseHoldAction = createAsyncThunk<HouseholdUser, number, ThunkConfig>('household/joinhousehold', async (code, { dispatch, getState }) => {

    const respone = await fetch('/api/household/join', {
        method: 'POST',
        body: JSON.stringify({
            code,
            userId: getState().user.user.id
        })
    });
    
    const result = await respone.json();
    return result
})

interface HouseholdState {
    households: Household[];
}

const initialState: HouseholdState = {
    households: households,
};

const householdSlice = createSlice({
    name: 'household',
    initialState,
    reducers: {
        // createHousehold
        // updateHousehold
        // leaveHousehold
        // joinHousehold: (state, action) => 

        // deposit: (state, { payload }: PayloadAction<number>) => {
        //     state.balance += payload;
        //     state.transactions.push(payload);
        // },
        // withdrawal: (state, { payload }: PayloadAction<number>) => {
        //     state.balance -= payload;
        //     state.transactions.push(-payload);
        // }
    },
    extraReducers: (builder) => {
        /* JOIN HOUSEHOLD */
        builder.addCase(joinHouseHoldAction.fulfilled, (state, action) => {
            
        });
        builder.addCase(joinHouseHoldAction.pending, (state, action) => {

        });
        builder.addCase(joinHouseHoldAction.rejected, (state, action) => {

        });

        /* LEAVE HOUSEHOLD */
        
    }
});

// export const { deposit, withdrawal } = userSlice.actions;

export default householdSlice.reducer;