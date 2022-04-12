import { sortBy } from "lodash";
import { Assignment, Role } from "../../api";
import { TimelineRange } from "../timeline";
import { SkillRole } from "./projections";

export function calculateNeededForSkill(
  skill: SkillRole,
  timeline: TimelineRange[],
): number[] {
  const neededBySkill: number[] = [];
  let prevRoleEndConfidence;
  for (let i = 0; i < timeline.length; i++) {
    if (Array.isArray(skill.roles)) {
      // For each time period we calculate the needed number and we carry the end confidence
      // of any finished role to the next period
      const { projectionNeeded, nextPeriodEndConfidence } =
        calculateNeededForSkillForPeriod(
          skill.roles,
          timeline[i],
          prevRoleEndConfidence,
        );
      neededBySkill.push(projectionNeeded);
      prevRoleEndConfidence = nextPeriodEndConfidence;
    } else {
      // If a skill doesn't have roles, the needed number is simply 0 for all periods
      neededBySkill.push(0);
    }
  }

  return neededBySkill;
}

export const calculateNeededForSkillForPeriod = (
  roles: Role[],
  period: TimelineRange,
  prevRoleEndConfidence?: number,
): { projectionNeeded: number; nextPeriodEndConfidence: number } => {
  const { startDate: periodStart, endDate: periodEnd } = period;

  // We start by instantiating a 2D array that will hold for each role an array of needed numbers
  // for every day of the period
  const arrayOfDays: number[][] = [];

  // We get the number of days in this period as a period can be either a week, a month or a quarter
  const numOfDays = Math.round(
    Math.abs(
      (periodStart.valueOf() - periodEnd.valueOf()) / (24 * 60 * 60 * 1000),
    ),
  );

  // If some roles have ended in the last period, we need to add their end confidences to this period
  let hasPrevEndConfidence = false;
  if (prevRoleEndConfidence) {
    arrayOfDays.push(Array(numOfDays).fill(prevRoleEndConfidence));
    hasPrevEndConfidence = true;
  }

  // Final values
  let projectionNeeded = 0;
  let nextPeriodEndConfidence = prevRoleEndConfidence || 0;

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    // We add an empty array for each role
    arrayOfDays.push([]);
    const arrayOfDaysIndex = hasPrevEndConfidence ? i + 1 : i;
    const daysInPeriod = arrayOfDays[arrayOfDaysIndex];

    // We first check if the role happends during this time period
    // If not we fill the array with 0s as no one would be needed
    if (
      doDatesOverlap(
        role.startDate,
        role.endDate || undefined,
        periodStart,
        periodEnd,
      )
    ) {
      let orderedAssignments: Assignment[] = [];
      if (role.assignments && role.assignments.length > 0) {
        // If the role has assignments, we first sort them by date to be able to compare them
        orderedAssignments = sortBy(role.assignments, ["startDate"]);

        // We iterate through each day of the week/month/quarter
        daysLoop: for (
          let j = new Date(periodStart);
          j <= periodEnd;
          j.setDate(j.getDate() + 1)
        ) {
          if (role.endDate) {
            // If the role ends with an end confidence of less than 1,
            // we add its end confidence so we can carry it to next periods
            if (
              datesAreOnSameDay(j, role.endDate) &&
              role.endConfidence !== 1
            ) {
              nextPeriodEndConfidence += role.endConfidence || 0;
            }
          }

          // For each assignment, we check if its start date is before or equal to the current date
          // If it is true, it means someone is assigned for this role and so the needed value should be 0
          for (const assignment of orderedAssignments) {
            if (
              assignment.startDate <= j &&
              (assignment.endDate ? assignment.endDate > j : true)
            ) {
              daysInPeriod.push(0);
              continue daysLoop;
            }
          }

          // If there is no assignment for this day, the needed value is the role's start confidence
          daysInPeriod.push(role.startConfidence);
        }
      } else {
        // Similarly, if the role has no assignments, all days of this period will have a needed value
        // equal to the role's start confidence
        arrayOfDays[arrayOfDaysIndex] = Array(numOfDays).fill(
          role.startConfidence,
        );
      }
    } else {
      arrayOfDays[arrayOfDaysIndex] = Array(numOfDays).fill(0);
    }
  }

  // At the end we add up all arrays together so we can have an array of worst days for this period
  const resultArray = arrayOfDays.reduce((a, b) =>
    a.map((c, i) => +(c + b[i]).toFixed(2)),
  );

  // And then we take the max of that array which will be the single worst day of the period
  // That is what we will display in the dashboard
  // We also return any endConfidence to be used in the next periods
  projectionNeeded = Math.max(...resultArray);
  return { projectionNeeded, nextPeriodEndConfidence };
};

const doDatesOverlap = (
  startA: Date,
  endA: Date | undefined,
  startB: Date,
  endB: Date,
): boolean => {
  return startA <= endB && (endA ? endA >= startB : true);
};

const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
