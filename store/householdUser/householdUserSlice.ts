import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addHouseholdUser,
  getHouseholdUsers,
  updateHouseholdUser
} from "../../data/fireStoreModule";
import { resetErrorAction } from "../globalActions";
import { CreateHouseholdUser, HouseholdUser } from "../../interfaces/householdUser";
import { ThunkConfig } from "../store";
import { householdUser } from "../../data/mockHouseholdData";

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

// export const updateHouseholdUserAction = createAsyncThunk<
//   HouseholdUser,
//   string,
//   ThunkConfig
// >("updateHouseholdUsers", async (householdId, { rejectWithValue }) => {
//   try {
//     const response = await updateHouseholdUser(householdId);
//     return { response };
//   } catch (e) {
//     return rejectWithValue(false);
//   }
// });

export const updateHouseholdUserAction = createAsyncThunk<
  HouseholdUser,
  HouseholdUser,
  ThunkConfig
>("updateHouseholdUser", async (household, { dispatch, rejectWithValue }) => {
  try {
    await updateHouseholdUser(household);
    return household;
  } catch (e) {
    return rejectWithValue(false);
  }
});



export const addHouseholdUserAction = createAsyncThunk<
  HouseholdUser,
  {inviteCode?: number, newHouseholdUser: CreateHouseholdUser},
  ThunkConfig
>("addUserToHousehold", async ({inviteCode, newHouseholdUser}, { rejectWithValue }) => {
  try {
    let householdUserId: string;
    if(inviteCode) {
      householdUserId = await addHouseholdUser(newHouseholdUser, inviteCode);
    } else {
      householdUserId = await addHouseholdUser(newHouseholdUser);
    }
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
      }),
      builder.addCase(updateHouseholdUserAction.fulfilled, (state, action) => {
        const index = state.householdUsers.findIndex(hu => 
          hu.id === action.payload.id
        );
        state.householdUsers[index] = action.payload;
      }),
      builder.addCase(updateHouseholdUserAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      })
  },
});

export default householdUserSlice.reducer;
