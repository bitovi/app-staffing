import { sortBy } from "lodash";
import { Employee } from "../../api";
import { TimelineRange } from "../timeline";
import { SkillRole } from "./projections";

export function calculateBenchForSkill(
  skill: SkillRole,
  timeline: TimelineRange[],
): number[] {
  const benchBySkill: number[] = [];
  for (let i = 0; i < timeline.length; i++) {
    if (Array.isArray(skill.employees)) {
      const projectionbench = calculateBenchForSkillForPeriod(
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
  employees: Employee[],
  period: TimelineRange,
): number {
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

  let projectionBench = 0;

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    // How many skills this employee has
    // When an employee is on the bench, they're on the bench for each skill they have
    // so we need to divide their time between skills
    const employeeNoOfSkills = employee.skills.length;

    arrayOfDays.push({ employeeName: employee.name, days: [] });
    const daysInPeriod = arrayOfDays[i];

    // Verification that the employee is currently employed
    if (
      (!employee.startDate || employee.startDate <= periodStart) &&
      (!employee.endDate || employee.endDate >= periodEnd)
    ) {
      // If the employee has no assignments then he's on the bench
      // If he has assignments, we check the dates
      if (
        Array.isArray(employee.assignments) &&
        employee.assignments.length > 0
      ) {
        // Check assignments
        const orderedAssignments = sortBy(employee.assignments, ["startDate"]);

        let index = -1;
        // We iterate through each day of the week/month/quarter
        daysLoop: for (
          let j = new Date(periodStart);
          j <= periodEnd;
          j.setDate(j.getDate() + 1)
        ) {
          index += 1;

          for (const assignment of orderedAssignments) {
            // The days when the employee is assigned
            // The assignment has started and either it didn't end yet,
            // or it doesnt have an end date and we check if the role has ended
            if (
              assignment.startDate <= j &&
              (assignment.endDate
                ? assignment.endDate >= j
                : assignment.role.endDate && assignment.role.endDate >= j)
            ) {
              const benchValue = +(
                (1 - assignment.role.startConfidence) /
                employeeNoOfSkills
              ).toFixed(2);

              daysInPeriod.days.push(benchValue);
              continue daysLoop;
            }
            // If the assignment has ended, the assigned employee is now on the bench
            else if (assignment.endDate && assignment.endDate < j) {
              const benchValue = 1 / employeeNoOfSkills;

              // If there is already a bench value for this day, that means it comes from a previous assignment
              // We add this assignment's value by multiplying the numbers
              if (daysInPeriod.days[index]) {
                daysInPeriod.days[index] = +(
                  daysInPeriod.days[index] * benchValue
                ).toFixed(2);
              } else {
                daysInPeriod.days.push(benchValue);
              }
            }
            // If the assignment is unbound and the role has ended
            // the bench value will correspond to the role's end confidence
            else if (
              !assignment.endDate &&
              assignment.role.endDate &&
              assignment.role.endDate <= j
            ) {
              const benchValue =
                (assignment.role.endConfidence || 1) / employeeNoOfSkills;

              if (daysInPeriod.days[index]) {
                daysInPeriod.days[index] = +(
                  daysInPeriod.days[index] * benchValue
                ).toFixed(2);
              } else {
                daysInPeriod.days.push(benchValue);
              }
            }
          }
        }
      } else {
        daysInPeriod.days = Array(numOfDays).fill(1 / employeeNoOfSkills);
      }
    } else {
      daysInPeriod.days = Array(numOfDays).fill(0);
    }
  }

  const result = arrayOfDays.reduce((a, b) => {
    return a.map((c, i) => {
      if (b.days[i]) {
        return +(c + b.days[i]).toFixed(2) as number;
      }
      return c;
    });
  }, Array(numOfDays).fill(0) as number[]);

  projectionBench = Math.max(...result);

  return projectionBench;
}
