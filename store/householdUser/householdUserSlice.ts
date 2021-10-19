import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { householdUser } from "../../data/mockHouseholdData";
import { HouseholdUser } from "../../interfaces/householdUser";

interface HouseholdUserState {
    householdUsers: HouseholdUser[];
}

const initialState: HouseholdUserState = {
    householdUsers: householdUser,
};

const householdUserSlice = createSlice({
    name: 'householdUser',
    initialState,
    reducers: {
      
    }
});

// export const { metoder från reducer} = userSlice.actions;

export default householdUserSlice.reducer;