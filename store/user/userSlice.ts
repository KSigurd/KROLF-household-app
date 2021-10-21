import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {} as User
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // deposit: (state, { payload }: PayloadAction<number>) => {
        //     state.balance += payload;
        //     state.transactions.push(payload);
        //     return state;
        // },
        // withdrawal: (state, { payload }: PayloadAction<number>) => {
        //     state.balance -= payload;
        //     state.transactions.push(-payload);
        //     return state;
        // }
    }
});

// export const { deposit, withdrawal } = userSlice.actions;

export default userSlice.reducer;