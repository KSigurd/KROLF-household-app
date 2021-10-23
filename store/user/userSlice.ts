import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser, loginUser } from "../../data/fireStoreModule";
import { User } from "../../interfaces/user";

interface UserState {
  user: User;
  loggedIn: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: {
      id: "",
      email: "",
      password: "",
  } as User,
  loggedIn: false,
  error: undefined,
};

export const loginHouseholdUser = createAsyncThunk<
  { user: User; response: boolean },
  User,
  { rejectValue: boolean }
>("loginUser", async (user, { rejectWithValue }) => {
  try {
    const response = await loginUser(user);
    return { user, response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addHouseholdUser = createAsyncThunk<
  { user: User; response: boolean },
  User,
  { rejectValue: boolean }
>("addUser", async (user, { rejectWithValue }) => {
  try {
    const response = await addUser(user);
    return { user, response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginHouseholdUser.fulfilled, (state, action) => {
      state.loggedIn = action.payload.response;
      if(action.payload.response) {
          state.user = action.payload.user;
      }
      else {
          state.error = "Felaktigt användarnamn eller lösenord";
    }
      
    }),
    builder.addCase(loginHouseholdUser.rejected, (state, action) => {
        state.loggedIn = action.meta.rejectedWithValue;
        state.user = {} as User;
        state.error = "Något gick fel";
      }),
    builder.addCase(addHouseholdUser.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        if(action.payload.response) {
            //TODO: Något som talar om att användaren lagts till?
        }
        else {
            state.error = "Användaren finns redan. Gå tillbaka till inloggningsidan för att logga in!";
        }
    }),
    builder.addCase(addHouseholdUser.rejected, (state, action) => {
        state.error = "Något gick fel"
    })
  },
});

export default userSlice.reducer;
