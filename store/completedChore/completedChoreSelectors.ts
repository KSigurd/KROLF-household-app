import { RootState } from "../store";

/**
 * Takes a choreId
 * Will only return the number of days since last date in the array
 * @requires ChoreId
 * @return number
 */
export const daysSinceLastDone = (choreId: string) => (state: RootState) => {
  const filteredCompletedChores = state.completedChore.compltedChores.filter(
    (chore) => chore.choreId === choreId
  );
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const lastDate = filteredCompletedChores
    .map((chore) => chore.date)
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const newDate = new Date();
  if (lastDate) {
    return Math.floor(
      (Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()) -
        Date.UTC(
          lastDate.getFullYear(),
          lastDate.getMonth(),
          lastDate.getDate()
        )) /
        _MS_PER_DAY
    );
  } else return undefined;
};
