import { CompletedChore } from "../../interfaces/completedChore";


/**
 * Takes an array of type CompletedChore[] filtered by choreId
 * Will only return the number of days since last date in the array
 * @requires CompletedChore[]
 * @return number
 */
export const daysSinceLastDone = (completedChores: CompletedChore[]) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const lastDate = completedChores
    .map((chore) => chore.date)
    .sort((a,b) => b.getTime() - a.getTime())[0];
  const newDate = new Date();
  return Math.floor(
    (Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()) -
      Date.UTC(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate()
      )) /
      _MS_PER_DAY
  );
};
