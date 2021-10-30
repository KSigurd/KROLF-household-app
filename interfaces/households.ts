import { CreateHouseholdUser as CreateHouseholdUser } from "./householdUser";

export interface Household {
  id: string;
  inviteCode: number;
  name: string;
}

export type CreateHousehold = Omit<Household, "id">;

export interface CreateHouseholdData {
  household: CreateHousehold;
  householdUser: Omit<CreateHouseholdUser, "householdId">;
}