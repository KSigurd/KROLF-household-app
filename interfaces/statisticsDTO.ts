import { CompletedChore } from "./completedChore";

export interface UserStatisticsDTO {
  avatarId: number;
  householdUserId: string;
  completedChores: ChoreStatisticsDTO[];
}

export interface ChoreStatisticsDTO {
  completedChore: CompletedChore;
  points: number
}
