import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHoushold, getHouseHolds } from "../../data/fireStoreModule";
import { households } from "../../data/mockHouseholdData";
import { Household } from "../../interfaces/households";
import { ThunkConfig } from "../store";

interface HouseholdState {
  households: Household[];
  activeHouseholdId: string,
  error: string | undefined;
}

const initialState: HouseholdState = {
  households: [],
  activeHouseholdId: "",
  error: undefined,
};

export const getHouseholdsAction = createAsyncThunk<
  { response: Household[] },
  string,
  ThunkConfig
>("getHouseholds", async (userId, { rejectWithValue }) => {
  try {
    const response = await getHouseHolds(userId);
    return { response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addHouseholdAction = createAsyncThunk<
  Household,
  Household,
  ThunkConfig
>("addHousehold", async (newHousehold, { rejectWithValue }) => {
  try {
    await addHoushold(newHousehold);
    return newHousehold;
  } catch (e) {
    return rejectWithValue(false);
  }
});


// TODO: s'tt activehousehold i firestore, och kunna hämta ut det
// export const setActiveHouseholdAction = createAsyncThunk<
//   Household,
//   Household,
//   ThunkConfig
// >("setActiveHousehold", async (newHousehold, { rejectWithValue }) => {
//   try {
//     await setActiveHousehold(newHousehold);
//     return newHousehold;
//   } catch (e) {
//     return rejectWithValue(false);
//   }
// });

const householdSlice = createSlice({
  name: "household",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouseholdsAction.fulfilled, (state, action) => {
      state.households = action.payload.response;
    }),
      builder.addCase(getHouseholdsAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(addHouseholdAction.fulfilled, (state, action) => {
        state.households.push(action.payload);
      }),
      builder.addCase(addHouseholdAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      });
  },
});

export default householdSlice.reducer;
