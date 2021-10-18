export interface Chore {
  id: number;
  title: string;
  description: string;
  points: number;
  repeatability: number;
  householdId: number;
}

export interface CompletedChore {
  choreId: number;
  date: Date;
}
