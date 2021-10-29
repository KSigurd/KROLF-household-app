import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHoushold, getHouseHolds } from "../../data/fireStoreModule";
import { Household, CreateHousehold, CreateHouseholdData } from "../../interfaces/households";
import { addHouseholdUserAction } from "../householdUser/householdUserSlice";
import { ThunkConfig, useAppSelector } from "../store";

interface HouseholdState {
  households: Household[];
  activeHouseholdId: string;
  error: string | undefined;
}

const initialState: HouseholdState = {
  households: [],
  activeHouseholdId: "4oayIiPjYZyDcbtPEJ2J",
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

export const setActiveHousholdAction = createAsyncThunk<
  string,
  string,
  ThunkConfig
>("setActiveHousehold", async (householdId, { rejectWithValue }) => {
  try {
    return householdId
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addHouseholdAction = createAsyncThunk<
  Household,
  CreateHouseholdData,
  ThunkConfig
>("addHousehold", async (createData, { dispatch, rejectWithValue }) => {
  try {
    const householdId = await addHoushold(createData.household);
    const household = {
      ...createData.household,
      id: householdId
    }
    const householdUser = {
      ...createData.householdUser,
      householdId,
    }
    dispatch(addHouseholdUserAction(householdUser));
    return household;
  } catch (e) {
    return rejectWithValue(false);
  }
});

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
      }),
      builder.addCase(setActiveHousholdAction.fulfilled, (state, action) => {
        state.activeHouseholdId = action.payload;
      }),
      builder.addCase(setActiveHousholdAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      })
    },
});

export default householdSlice.reducer;
