import { CompletedChore } from "./completedChore";

export interface ChoreStatisticsDTO {
  choreTitle: string;
  points: number;
  completedChores: CompletedChoresByUserDTO[];
}


export interface CompletedChoresByUserDTO {
  completedChores: CompletedChore[];
  housholdUserId: string;
  avatarId: string;
}
