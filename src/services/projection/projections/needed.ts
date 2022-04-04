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

  let hasPrevEncConfidence = false;
  if (prevRoleEndConfidence) {
    arrayOfDays.push(Array(numOfDays).fill(prevRoleEndConfidence));
    hasPrevEncConfidence = true;
  }

  let projectionNeeded = 0;
  let nextPeriodEndConfidence = 0;

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    arrayOfDays.push([]);
    const arrayOfDaysIndex = hasPrevEncConfidence ? i + 1 : i;
    const daysInPeriod = arrayOfDays[arrayOfDaysIndex];

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
        orderedAssignments = sortBy(role.assignments, ["startDate"]);

        daysLoop: for (
          let j = new Date(periodStart);
          j <= periodEnd;
          j.setDate(j.getDate() + 1)
        ) {
          if (role.endDate) {
            if (datesAreOnSameDay(j, role.endDate)) {
              nextPeriodEndConfidence += role.endConfidence || 0;
            }
          }

          for (const assignment of orderedAssignments) {
            if (
              assignment.startDate <= j &&
              (assignment.endDate ? assignment.endDate > j : true)
            ) {
              daysInPeriod.push(0);
              continue daysLoop;
            }
          }
          daysInPeriod.push(role.startConfidence);
        }
      } else {
        arrayOfDays[arrayOfDaysIndex] = Array(numOfDays).fill(
          role.startConfidence,
        );
      }
    } else {
      arrayOfDays[arrayOfDaysIndex] = Array(numOfDays).fill(0);
    }
  }

  const resultArray = arrayOfDays.reduce((a, b) =>
    a.map((c, i) => +(c + b[i]).toFixed(2)),
  );

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
