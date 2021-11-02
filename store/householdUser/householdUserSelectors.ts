import { HouseholdUser } from "../../interfaces/householdUser";

export const isUserAdmin = (householdId: string, householdUsers: HouseholdUser[]) => {
    return householdUsers.find((hu) =>
      hu.householdId === householdId
    )?.isAdmin;
  };