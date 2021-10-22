import { Chore } from "../interfaces/chore";

export const chores: Chore[] = [
  {
    id: "0",
    title: "Städa",
    description: "Damma och dammsuga",
    points: 6,
    repeatability: 7,
    householdId: "0",
  },
  {
    id: "1",
    title: "Diska",
    description: "Gört bara",
    points: 4,
    repeatability: 1,
    householdId: "0",
  },
  {
    id: "2",
    title: "Gå ut med katten",
    description: "Glöm inte katten",
    points: 2,
    repeatability: 2,
    householdId: "0",
  },
  {
    id: "3",
    title: "Tvätta",
    description: "Strumpor och skor",
    points: 6,
    repeatability: 10,
    householdId: "0",
  },
  {
    id: "4",
    title: "Ta in posten",
    description: "Från brevlådan",
    points: 1,
    repeatability: 1,
    householdId: "0",
  },
];
