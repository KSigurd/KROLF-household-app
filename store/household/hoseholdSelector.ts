import { RootState } from '../store';

export const selectHouseholdById = (id: string) => (state: RootState) => {
    return state.household.households.find(house => house.id === id);
}
