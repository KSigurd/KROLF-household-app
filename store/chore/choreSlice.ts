import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChore, getChores, removeChore } from "../../data/fireStoreModule";
import { Chore } from "../../interfaces/chore";
import { resetErrorAction } from "../globalActions";
import { ThunkConfig } from "../store";

interface ChoreState {
  chores: Chore[];
  error: string | undefined;
}

const initialState: ChoreState = {
  chores: [],
  error: undefined,
};

export const getChoresAction = createAsyncThunk<
  { response: Chore[] },
  string,
  ThunkConfig
>("getChores", async (householdId, { rejectWithValue }) => {
  try {
    const response = await getChores(householdId);
    return { response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addChoreAction = createAsyncThunk<Chore, Chore, ThunkConfig>(
  "addChore",
  async (newChore, { rejectWithValue }) => {
    try {
      await addChore(newChore);
      return newChore;
    } catch (e) {
      return rejectWithValue(false);
    }
  }
);

export const removeChoreAction = createAsyncThunk<boolean, string, ThunkConfig>(
  "removeChore",
  async (choreId, { rejectWithValue }) => {
    try {
      await removeChore(choreId);
      return true;
    } catch (e) {
      return rejectWithValue(false);
    }
  }
);

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChoresAction.fulfilled, (state, action) => {
      state.chores = action.payload.response;
    }),
      builder.addCase(getChoresAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(addChoreAction.fulfilled, (state, action) => {
        state.chores.push(action.payload);
      }),
      builder.addCase(addChoreAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(removeChoreAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      })
  },
});

export default choreSlice.reducer;
