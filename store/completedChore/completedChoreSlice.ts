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
  completedChores: CompletedChore[];
  statistics: ChoreStatisticsDTO[];
  error: string | undefined;
}

const initialState: CompletedChoreState = {
  completedChores: [],
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
      state.completedChores = action.payload.response;
    }),
      builder.addCase(getCompletedChoresAction.rejected, (state, action) => {
        state.error = "Kunde inte hämta data för hushållet";
      }),
      builder.addCase(addCompletedChoreAction.fulfilled, (state, action) => {
        state.completedChores.push(action.payload);
      }),
      builder.addCase(addCompletedChoreAction.rejected, (state, action) => {
        state.error = "Kunde inte markera sysslan som utförd";
      }),
      builder.addCase(getStatisticsAction.fulfilled, (state, action) => {
        state.statistics = action.payload.response;
      }),
      builder.addCase(getStatisticsAction.rejected, (state, action) => {
        state.error = "Kunde inte hämta statistik för hushållet";
      }),
      builder.addCase(resetErrorAction, (state, action) => {
        state.error = undefined;
      })
  },
});

export default completedChoreSlice.reducer;
