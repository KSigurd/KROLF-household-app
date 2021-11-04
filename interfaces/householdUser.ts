export interface HouseholdUser {
  id: string;
  userId: string;
  householdId: string;
  name: string;
  isAdmin: boolean;
  avatarId: string;
}

export type CreateHouseholdUser = Omit<HouseholdUser, "id">;
