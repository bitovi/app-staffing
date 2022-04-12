import { sortBy } from "lodash";
import { Employee } from "../../api";
import { TimelineRange } from "../timeline";
import { SkillRole } from "./projections";

export function calculateBenchForSkill(
  skill: SkillRole,
  timeline: TimelineRange[],
) {
  const benchBySkill: number[] = [];
  for (let i = 0; i < timeline.length; i++) {
    if (Array.isArray(skill.employees)) {
      const projectionbench = calculateBenchForSkillForPeriod(
        skill.name,
        skill.employees,
        timeline[i],
      );
      benchBySkill.push(projectionbench);
    } else {
      benchBySkill.push(0);
    }
  }
  return benchBySkill;
}

export function calculateBenchForSkillForPeriod(
  skillName: string,
  employees: Employee[],
  period: TimelineRange,
) {
  const { startDate: periodStart, endDate: periodEnd } = period;

  // We start by instantiating a 2D array that will hold for each role an array of bench numbers
  // for every day of the period
  const arrayOfDays: { employeeName: string; days: number[] }[] = [];

  // We get the number of days in this period as a period can be either a week, a month or a quarter
  const numOfDays = Math.round(
    Math.abs(
      (periodStart.valueOf() - periodEnd.valueOf()) / (24 * 60 * 60 * 1000),
    ),
  );

  let hasPrevEndConfidence = false;

  let projectionBench = 0;

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const employeeNoOfSkills = employee.skills.length;

    arrayOfDays.push({ employeeName: employee.name, days: [] });
    const arrayOfDaysIndex = hasPrevEndConfidence ? i + 1 : i;
    const daysInPeriod = arrayOfDays[arrayOfDaysIndex];

    if (
      (!employee.startDate || employee.startDate <= periodStart) &&
      (!employee.endDate || employee.endDate >= periodEnd)
    ) {
      if (
        Array.isArray(employee.assignments) &&
        employee.assignments.length > 0
      ) {
        // check assignments
        const orderedAssignments = sortBy(employee.assignments, ["startDate"]);

        // We iterate through each day of the week/month/quarter
        daysLoop: for (
          let j = new Date(periodStart);
          j <= periodEnd;
          j.setDate(j.getDate() + 1)
        ) {
          const index = j.getDate() - periodStart.getDate();

          for (const assignment of orderedAssignments) {
            if (
              assignment.startDate <= j
              //   (assignment.endDate ? assignment.endDate > j : true)
            ) {
              // if(!assignment.endDate) {

              // }

              const benchValue = +(
                (1 - assignment.role.startConfidence) /
                employeeNoOfSkills
              ).toFixed(2);

              daysInPeriod.days.push(benchValue);
              continue daysLoop;
            } else if (assignment.endDate && assignment.endDate < j) {
              const benchValue =
                assignment.role.endConfidence || 1 / employeeNoOfSkills;
              if (daysInPeriod.days[index]) {
                daysInPeriod.days[index] = +(
                  daysInPeriod.days[index] * benchValue
                ).toFixed(2);
              }
              daysInPeriod.days.push(benchValue);
            }
          }
        }
      } else {
        daysInPeriod.days = Array(numOfDays).fill(1 / employeeNoOfSkills);
      }
    }
  }

  const result = arrayOfDays.reduce((a, b) => {
    return a.map((c, i) => {
      return +(c + b.days[i]).toFixed(2) as number;
    });
  }, Array(numOfDays).fill(0) as number[]);

  projectionBench = Math.max(...result);

  return projectionBench;
}
