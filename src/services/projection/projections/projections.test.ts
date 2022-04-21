import { cloneDeep } from "lodash";
import {
  assignments as baseAssignments,
  employees as baseEmployees,
  roles as baseRoles,
  skills as baseSkills,
} from "../../../mocks/fixtures";
import {
  calculateNeededForSkill,
  calculateNeededForSkillForPeriod,
} from "./needed";
import { getAction, SkillRole } from "./projections";
import getTimeline from "../timeline";
import {
  calculateBenchForSkill,
  calculateBenchForSkillForPeriod,
} from "./bench";

describe("projections", () => {
  describe("needed", () => {
    describe("calculateNeededForSkillForPeriod", () => {
      const period = {
        startDate: new Date(2022, 4, 4),
        endDate: new Date(2022, 4, 11),
        title: "Apr 4th",
        type: "week",
      };
      it("returns 0 if dates don't overlap", () => {
        const roles = cloneDeep(baseRoles.slice(0, 1));

        roles[0].startDate = new Date(2021, 1, 2);
        roles[0].endDate = new Date(2021, 5, 2);

        const { projectionNeeded } = calculateNeededForSkillForPeriod(
          roles,
          period,
        );

        expect(projectionNeeded.total).toEqual(0);
      });

      it("returns startConfidence if role dates overlap and assignment dates don't", () => {
        const roles = cloneDeep(baseRoles.slice(0, 1));

        const startConfidence = roles[0].startConfidence;

        roles[0].startDate = new Date(2021, 1, 2);
        roles[0].endDate = new Date(2022, 5, 2);

        if (roles[0].assignments) {
          roles[0].assignments[0].startDate = new Date(2024, 2, 2);
        }

        const { projectionNeeded } = calculateNeededForSkillForPeriod(
          roles,
          period,
        );

        expect(projectionNeeded.total).toEqual(startConfidence);
      });

      it("returns 0 if role dates assignment dates overlap", () => {
        const roles = cloneDeep(baseRoles.slice(0, 1));

        roles[0].startDate = new Date(2021, 1, 2);
        roles[0].endDate = new Date(2022, 5, 2);

        if (roles[0].assignments) {
          roles[0].assignments[0].startDate = new Date(2022, 2, 5);
          roles[0].assignments[0].endDate = new Date(2024, 4, 5);
        }

        const { projectionNeeded } = calculateNeededForSkillForPeriod(
          roles,
          period,
        );

        expect(projectionNeeded.total).toEqual(0);
      });

      it("returns sum of worst days for multiple overlapping roles", () => {
        const roles = cloneDeep(baseRoles.slice(0, 2));

        const startConfidenceRole1 = roles[0].startConfidence;
        const startConfidenceRole2 = roles[1].startConfidence;

        roles[0].startDate = new Date(2021, 1, 2);
        roles[0].endDate = new Date(2022, 5, 2);

        roles[1].startDate = new Date(2021, 1, 1);
        roles[1].endDate = new Date(2022, 5, 10);

        if (roles[0].assignments) {
          roles[0].assignments[0].startDate = new Date(2023, 2, 5);
          roles[0].assignments[0].endDate = new Date(2024, 4, 5);
        }

        if (roles[1].assignments) {
          roles[1].assignments[0].startDate = new Date(2023, 2, 5);
          roles[1].assignments[0].endDate = new Date(2024, 4, 5);
        }

        const { projectionNeeded } = calculateNeededForSkillForPeriod(
          roles,
          period,
        );

        expect(projectionNeeded.total).toEqual(
          startConfidenceRole1 + startConfidenceRole2,
        );
      });
    });

    describe("calculateNeededForSkill", () => {
      it("has a needed projection for each period", () => {
        const timeline = getTimeline(new Date());

        const skill = baseSkills[0];

        const neededProjections = calculateNeededForSkill(skill, timeline);

        expect(timeline.length).toEqual(neededProjections.length);
      });

      it("has accurate projection for each period", () => {
        const timeline = getTimeline(new Date(2022, 4, 4));

        const skill: SkillRole = baseSkills[0];

        const roles = cloneDeep(baseRoles.slice(0, 2));

        const startConfidenceRole1 = roles[0].startConfidence;
        const startConfidenceRole2 = roles[1].startConfidence;
        const endConfidenceRole1 = roles[0].endConfidence || 0;
        const endConfidenceRole2 = roles[1].endConfidence || 0;

        roles[0].startDate = new Date(2021, 1, 2);
        roles[0].endDate = timeline[4].endDate;

        roles[1].startDate = new Date(2021, 1, 1);
        roles[1].endDate = timeline[7].endDate;

        if (roles[0].assignments) {
          roles[0].assignments[0].startDate = new Date(2023, 2, 5);
          roles[0].assignments[0].endDate = new Date(2024, 4, 5);
        }

        if (roles[1].assignments) {
          roles[1].assignments[0].startDate = new Date(2023, 2, 5);
          roles[1].assignments[0].endDate = new Date(2024, 4, 5);
        }

        skill.roles = roles;

        const neededProjections = calculateNeededForSkill(skill, timeline);

        // In each of the periods from the start, we have two roles ongoing,
        // so we add their startConfidence to get our needed number.
        // Role 1 ends at period 5 so we add its endConfidence to the next periods
        // Role 2 ends at period 8 so we add its endConfidence to the next periods
        const neededExpectedProjections = [
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole2 + endConfidenceRole1).toFixed(2),
          +(startConfidenceRole2 + endConfidenceRole1).toFixed(2),
          +(startConfidenceRole2 + endConfidenceRole1).toFixed(2),
          +(endConfidenceRole1 + endConfidenceRole2).toFixed(2),
          +(endConfidenceRole1 + endConfidenceRole2).toFixed(2),
        ];

        const neededProjectionsTotals = neededProjections.map(
          (needed) => needed.total,
        );

        expect(neededProjectionsTotals).toEqual(neededExpectedProjections);
      });
    });
  });

  describe("bench", () => {
    describe("calculateBenchForSkillForPeriod", () => {
      const period = {
        startDate: new Date(2022, 3, 11),
        endDate: new Date(2022, 3, 17),
        title: "Apr 4th",
        type: "week",
      };
      it("returns 0 if employee no longer employed", () => {
        const employees = cloneDeep(baseEmployees.slice(0, 1));
        const employee = employees[0];

        employee.endDate = new Date(2009, 4, 4);
        employee.endDate = new Date(2021, 3, 14);

        employee.assignments = [];

        const projectionBench = calculateBenchForSkillForPeriod(
          employees,
          period,
        );

        expect(projectionBench.total).toEqual(0);
      });

      it("returns 1 if employee has no assignments", () => {
        const employees = cloneDeep(baseEmployees.slice(0, 1));
        const employee = employees[0];

        employee.endDate = new Date(2009, 4, 4);
        employee.endDate = new Date(2026, 3, 14);

        employee.assignments = [];
        employee.skills = [baseSkills[0]];

        const projectionBench = calculateBenchForSkillForPeriod(
          employees,
          period,
        );

        expect(projectionBench.total).toEqual(1);
      });

      it("returns 0.5 if employee has no assignments and 2 skills", () => {
        const employees = cloneDeep(baseEmployees.slice(0, 1));
        const employee = employees[0];

        employee.endDate = new Date(2009, 4, 4);
        employee.endDate = new Date(2026, 3, 14);

        employee.assignments = [];
        employee.skills = [baseSkills[0], baseSkills[1]];

        const projectionBench = calculateBenchForSkillForPeriod(
          employees,
          period,
        );

        expect(projectionBench.total).toEqual(0.5);
      });

      it("returns 0 if employee is assigned the full week", () => {
        const employees = cloneDeep(baseEmployees.slice(0, 1));
        const employee = employees[0];

        employee.endDate = new Date(2009, 4, 4);
        employee.endDate = new Date(2026, 3, 14);

        const assignment = baseAssignments[0];
        assignment.role.startDate = new Date(2022, 3, 11);
        assignment.role.startConfidence = 1;
        assignment.role.endDate = new Date(2022, 3, 17);

        assignment.startDate = new Date(2022, 3, 11);
        assignment.endDate = new Date(2022, 3, 17);

        employee.assignments = [assignment];
        employee.skills = [baseSkills[0]];

        const projectionBench = calculateBenchForSkillForPeriod(
          employees,
          period,
        );

        expect(projectionBench.total).toEqual(0);
      });
    });

    describe("calculateBenchForSkill", () => {
      it("has a bench projection for each period", () => {
        const timeline = getTimeline(new Date());

        const skill = baseSkills[0];

        const benchProjections = calculateBenchForSkill(skill, timeline);

        expect(timeline.length).toEqual(benchProjections.length);
      });
    });
  });

  describe("action badges", () => {
    it("Shows Sell if bench more than needed and difference more than threshold (2)", () => {
      const bench = 3;
      const needed = 0;

      const action = getAction(needed, bench);

      expect(action).toBe("Sell");
    });

    it("Shows Assign if bench more than needed", () => {
      const bench = 3;
      const needed = 2;

      const action = getAction(needed, bench);

      expect(action).toBe("Assign");
    });

    it("Shows Hire if bench less than needed", () => {
      const bench = 1;
      const needed = 2;

      const action = getAction(needed, bench);

      expect(action).toBe("Hire");
    });

    it("Shows OK if equal", () => {
      const bench = 0;
      const needed = 0;

      const action = getAction(needed, bench);

      expect(action).toBe("OK");
    });
  });
});
