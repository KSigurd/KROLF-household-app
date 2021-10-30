import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addHouseholdUser,
  getHouseholdUsers
} from "../../data/fireStoreModule";
import { resetErrorAction } from "../globalActions";
import { CreateHouseholdUser, HouseholdUser } from "../../interfaces/householdUser";
import { ThunkConfig } from "../store";

interface HouseholdUserState {
  householdUsers: HouseholdUser[];
  error: string | undefined;
}

const initialState: HouseholdUserState = {
  householdUsers: [],
  error: undefined,
};

export const getHouseholdUserAction = createAsyncThunk<
  { response: HouseholdUser[] },
  string,
  ThunkConfig
>("getHouseholdUsers", async (householdId, { rejectWithValue }) => {
  try {
    const response = await getHouseholdUsers(householdId);
    return { response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addHouseholdUserAction = createAsyncThunk<
  HouseholdUser,
  CreateHouseholdUser,
  ThunkConfig
>("addUserToHousehold", async (newHouseholdUser, { rejectWithValue }) => {
  try {
    const householdUserId = await addHouseholdUser(newHouseholdUser);
        const householdUser = {
          ...newHouseholdUser,
          id: householdUserId,
        };
    return householdUser;
  } catch (e) {
    return rejectWithValue(false);
  }
});

const householdUserSlice = createSlice({
  name: "householdUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouseholdUserAction.fulfilled, (state, action) => {
      state.householdUsers = action.payload.response;
    }),
      builder.addCase(getHouseholdUserAction.rejected, (state, action) => {
        state.householdUsers = [];
        state.error = "Något gick fel";
      }),
      builder.addCase(addHouseholdUserAction.fulfilled, (state, action) => {
        state.householdUsers.push(action.payload);
      }),
      builder.addCase(addHouseholdUserAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      })
  },
});

export default householdUserSlice.reducer;
