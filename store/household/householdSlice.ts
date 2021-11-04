import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHoushold, getHouseHolds, updateHoushold, getOneHousehold } from "../../data/fireStoreModule";
import { resetErrorAction } from "../globalActions";
import { Household, CreateHousehold, CreateHouseholdData } from "../../interfaces/households";
import { addHouseholdUserAction, getHouseholdUserAction } from "../householdUser/householdUserSlice";
import { households } from "../../data/mockHouseholdData";
import { ThunkConfig, useAppSelector } from "../store";

interface HouseholdState {
  households: Household[];
  activeHouseholdId: string;
  temporaryHousehold: Household;
  error: string | undefined;
}

const initialState: HouseholdState = {
  households: [],
  activeHouseholdId: "",
  temporaryHousehold: {} as Household,
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

export const getOneHouseholdAction = createAsyncThunk<
Household,
  number,
  ThunkConfig
>("getOneHousehold", async (inviteCode, { dispatch, rejectWithValue }) => {
  try {
    const response = await getOneHousehold(inviteCode);
    await dispatch(getHouseholdUserAction(response.id));
    return response;
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const setActiveHousholdAction = createAsyncThunk<
  string,
  string
>("setActiveHousehold", async (householdId) => {
  return householdId
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
    dispatch(addHouseholdUserAction({newHouseholdUser: householdUser}));
    return household;
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const updateHouseholdAction = createAsyncThunk<
  Household,
  Household,
  ThunkConfig
>("updateHousehold", async (household, { rejectWithValue }) => {
  try {
    console.log(household, "thuuuunk")
    await updateHoushold(household);
    return household;
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
        state.error = "Kunde inte hämta hushåll";
      }),
      builder.addCase(addHouseholdAction.fulfilled, (state, action) => {
        state.households.push(action.payload);
      }),
      builder.addCase(addHouseholdAction.rejected, (state, action) => {
        state.error = "Kunde inte lägga till hushållet";
      }),
      builder.addCase(setActiveHousholdAction.fulfilled, (state, action) => {
        state.activeHouseholdId = action.payload;
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      }),
      builder.addCase(updateHouseholdAction.fulfilled, (state, action) => {
        const index = state.households.findIndex(hh => 
          hh.id === action.payload.id
        );
        state.households[index] = action.payload;
      }),
      builder.addCase(updateHouseholdAction.rejected, (state, action) => {
        state.error = "Kunde inte uppdatera hushållet";
      }),
      builder.addCase(getOneHouseholdAction.fulfilled, (state, action) => {
        if(state.households.find(hh => hh.inviteCode === action.payload.inviteCode)) {
          state.error = "Du är redan medlem i hushållet"
        } else {state.temporaryHousehold = action.payload;
        state.activeHouseholdId = action.payload.id}
      }),
        builder.addCase(getOneHouseholdAction.rejected, (state, action) => {
          state.error = "Kunde inte hämta hushåll";
        })
    },
});

export default householdSlice.reducer;
