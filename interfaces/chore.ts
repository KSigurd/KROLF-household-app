export interface Chore {
  id: string;
  title: string;
  description: string;
  points: number;
  repeatability: number;
  householdId: string;
}

export interface ChoreOmit extends Omit<Chore, "id">{};


