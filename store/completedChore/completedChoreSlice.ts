import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCompletedChore,
  getCompletedChores,
  getStatistics,
} from "../../data/fireStoreModule";
import { CompletedChore } from "../../interfaces/completedChore";
import { ChoreStatisticsDTO } from "../../interfaces/statisticsDTO";
import { resetErrorAction } from "../globalActions";
import { ThunkConfig } from "../store";

interface CompletedChoreState {
  compltedChores: CompletedChore[];
  statistics: ChoreStatisticsDTO[];
  error: string | undefined;
}

const initialState: CompletedChoreState = {
  compltedChores: [],
  statistics: [],
  error: undefined,
};

export const getStatisticsAction = createAsyncThunk<
  { response: ChoreStatisticsDTO[] },
  string,
  ThunkConfig
>("getStatistics", async (householdId, { rejectWithValue }) => {
  try {
    const response = await getStatistics(householdId);
    return { response };
  } catch (e) {
    return rejectWithValue(false);
  }
});

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
      }),
      builder.addCase(getStatisticsAction.fulfilled, (state, action) => {
        state.statistics = action.payload.response;
      }),
      builder.addCase(getStatisticsAction.rejected, (state, action) => {
        state.error = "något gick fel";
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      })
  },
});

export default completedChoreSlice.reducer;
