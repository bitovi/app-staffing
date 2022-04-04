import { cloneDeep } from "lodash";
import {
  roles as baseRoles,
  skills as baseSkills,
} from "../../../mocks/fixtures";
import {
  calculateNeededForSkill,
  calculateNeededForSkillForPeriod,
} from "./needed";
import { SkillRole } from "./projections";
import getTimeline from "../timeline";

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

        expect(projectionNeeded).toEqual(0);
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

        expect(projectionNeeded).toEqual(startConfidence);
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

        expect(projectionNeeded).toEqual(0);
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

        expect(projectionNeeded).toEqual(
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
        const endConfidenceRole1 = roles[0].endConfidence;
        const endConfidenceRole2 = roles[1].endConfidence;

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
        // Role 1 ends at period 5 so we add its endConfidence to period 6
        // Role 2 ends at period 8 so we add its endConfidence to period 9
        // After that needed falls to 0
        const neededExpectedProjections = [
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole1 + startConfidenceRole2).toFixed(2),
          +(startConfidenceRole2 + (endConfidenceRole1 || 0)).toFixed(2),
          startConfidenceRole2,
          startConfidenceRole2,
          endConfidenceRole2,
          0,
        ];

        expect(neededProjections).toEqual(neededExpectedProjections);
      });
    });
  });
});
