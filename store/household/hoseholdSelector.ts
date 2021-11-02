import { RootState } from '../store';

export const selectHouseholdById = (id: string) => (state: RootState) => {
    return state.household.households.find(house => house.id === id);
}

export const selectHouseholdByInviteCode = (inviteCode: number) => (state: RootState) => {
    return state.household.households.find(house => house.inviteCode === inviteCode);
}
