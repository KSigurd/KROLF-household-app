export interface HouseholdUser {
  id: string;
  userId: string;
  householdId: string;
  name: string;
  isAdmin: boolean;
  avatarId: number;
}

export interface HouseholdUserOmit extends Omit<HouseholdUser, "id"> {}
