import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCompletedChore,
  getCompletedChores,
} from "../../data/fireStoreModule";
import { CompletedChore } from "../../interfaces/completedChore";
import { ThunkConfig } from "../store";

interface CompletedChoreState {
  compltedChores: CompletedChore[];
  error: string | undefined;
}

const initialState: CompletedChoreState = {
  compltedChores: [],
  error: undefined,
};

export const getCompletedChoresAction = createAsyncThunk<
  { response: CompletedChore[] },
  string,
  ThunkConfig
>("getCompletedChores", async (householdId, { rejectWithValue }) => {
  try {
    const response = await getCompletedChores(householdId);
    return { response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

export const addCompletedChoreAction = createAsyncThunk<
  CompletedChore,
  CompletedChore,
  ThunkConfig
>("addCompletedChore", async (newCompletedChore, { rejectWithValue }) => {
  try {
    await addCompletedChore(newCompletedChore);
    return newCompletedChore;
  } catch (e) {
    return rejectWithValue(false);
  }
});

const completedChoreSlice = createSlice({
  name: "completedChore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompletedChoresAction.fulfilled, (state, action) => {
      state.compltedChores = action.payload.response;
    }),
      builder.addCase(getCompletedChoresAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      }),
      builder.addCase(addCompletedChoreAction.fulfilled, (state, action) => {
        state.compltedChores.push(action.payload);
      }),
      builder.addCase(addCompletedChoreAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      });
  },
});

export default completedChoreSlice.reducer;
