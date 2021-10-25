export interface Household {
  id: string;
  inviteCode: number;
  name: string;
}

export interface HouseholdOmit extends Omit<Household, "id">{};