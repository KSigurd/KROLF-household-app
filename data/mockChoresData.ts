import { Chore } from "../types/chore";

export const Chores: Chore[] = [
  {
    id: 0,
    title: "Städa",
    description: "Damma och dammsuga",
    points: 6,
    repeatability: 7,
  },
  {
    id: 1,
    title: "Diska",
    description: "Gört bara",
    points: 4,
    repeatability: 1,
  },
  {
    id: 2,
    title: "Gå ut med katten",
    description: "Glöm inte katten",
    points: 2,
    repeatability: 2,
  },
  {
    id: 3,
    title: "Tvätta",
    description: "Strumpor och skor",
    points: 6,
    repeatability: 10,
  },
  {
    id: 4,
    title: "Ta in posten",
    description: "Från brevlådan",
    points: 1,
    repeatability: 1,
  },
];
