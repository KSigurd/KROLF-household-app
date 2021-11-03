import { RootState } from '../store';

export const selectHouseholdById = (id: string) => (state: RootState) => {
    return state.household.households.find(house => house.id === id);
}
export const removeHouseholdById = (id: string) => (state: RootState) => {
    return state.household.households.filter(house => house.id !== id);
}

export const selectHouseholdByInviteCode = () => (state: RootState) => {
    return state.household.households;
}
