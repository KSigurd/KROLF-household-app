import { RootState } from "../store";

export const selectChoreById = (id: string) => (state : RootState) => {
    return state.chore.chores.find((c) => c.id === id);
} 