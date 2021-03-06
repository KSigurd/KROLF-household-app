import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser, loginUser, logoutUser } from "../../data/fireStoreModule";
import { User } from "../../interfaces/user";
import { resetErrorAction } from "../globalActions";
import { ThunkConfig } from "../store";

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

export const loginUserAction = createAsyncThunk<
  { user: User; response: boolean },
  User,
  ThunkConfig
>("loginUser", async (user, { rejectWithValue }) => {
  try {
    const response = await loginUser(user);
    return { user, response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const logoutUserAction = createAsyncThunk<
  { user: User; response: boolean },
  User,
  ThunkConfig
>("logoutUser", async (user, { rejectWithValue }) => {
  try {
    const response = await logoutUser(user);
    return { user, response };
  } catch (e) {
    return rejectWithValue(false);
  }
});


export const addUserAction = createAsyncThunk<
  { user: User; response: boolean },
  User,
  ThunkConfig
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
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loggedIn = action.payload.response;
      if (action.payload.response) {
        state.user = action.payload.user;
      } else {
        state.error = "Felaktigt användarnamn eller lösenord";
      }
    }),
      builder.addCase(loginUserAction.rejected, (state, action) => {
        state.loggedIn = action.meta.rejectedWithValue;
        state.user = {} as User;
        state.error = "Problem med databasen. Kunde inte logga in";
      }),
      builder.addCase(addUserAction.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        if (action.payload.response) {
        } else {
          state.error =
            "Användaren finns redan. Gå tillbaka till inloggningsidan för att logga in!";
        }
      }),
      builder.addCase(addUserAction.rejected, (state, action) => {
        state.error = "Problem med databasen. Kunde inte registrera användaren";
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      }),
      builder.addCase(logoutUserAction.fulfilled, (state, action) => {
        state.loggedIn = action.payload.response;
      }),
      builder.addCase(logoutUserAction.rejected, (state, action) => {
        state.error = "Kunde inte logga ut";
      })
      
  },
});

export default userSlice.reducer;
