import { avatars } from "../data/avatarData";
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

interface ChartHouseholdUserData {
  householdUserId: string;
  key: string;
  value: number;
  avatar: string;
  svg: object;
}

export function convertFromDTOToTotalChartData(
  dataList: ChoreStatisticsDTO[]
): ChartHouseholdUserData[] {
  const result: ChartHouseholdUserData[] = [];

  for (const choreObject of dataList) {
    for (const userObject of choreObject.completedChores) {
      const points = userObject.completedChores.length * choreObject.points;
      const resultUser = result.find(
        (ru) => ru.householdUserId === userObject.housholdUserId
        );       

      if (resultUser) {
        resultUser.value += points;
      } else {
        result.push({
          householdUserId: userObject.housholdUserId,
          key: userObject.housholdUserId,
          value: points,
          avatar: avatars.find((a) => a.id === userObject.avatarId)?.avatar || "",
          svg: {fill: avatars.find((a) => a.id === userObject.avatarId)?.color} || {},
        });
      }
    }
  }

  return result.filter(v => v.value > 0);
}

// function convertForChore(dataList: ChoreStatisticsDTO): ChartData[] {

// }
