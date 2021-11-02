import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addChore,
  getChores,
  removeChore,
  updateChore,
} from "../../data/fireStoreModule";
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
      const choreId = await addChore(newChore);
      return {
        id: choreId,
        title: newChore.title,
        description: newChore.description,
        points: newChore.points,
        repeatability: newChore.repeatability,
        householdId: newChore.householdId,
      } as Chore;
    } catch (e) {
      return rejectWithValue(false);
    }
  }
);

export const updateChoreAction = createAsyncThunk<Chore, Chore, ThunkConfig>(
  "updateChore",
  async (chore, { rejectWithValue }) => {
    try {
      await updateChore(chore);
      return chore;
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
      }),
      builder.addCase(updateChoreAction.fulfilled, (state, action) => {
        const index = state.chores.findIndex((c) => c.id === action.payload.id);
        state.chores[index] = action.payload;
      }),
      builder.addCase(updateChoreAction.rejected, (state, action) => {
        state.error = "Något gick fel";
      });
  },
});

export default choreSlice.reducer;
