import type { Project, SkillName } from ".";
import { skillList } from ".";

const [react, angular, devops, node, ux, design] = skillList;

export const employees = [
  {
    id: "1",
    avatar:
      "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Tom",
    title: "Software Developer",
    startDate: "08/19/2021",
    endDate: "12/12/2021",
    skills: [
      { name: react as SkillName },
      { name: node as SkillName },
      { name: devops as SkillName },
      { name: angular as SkillName },
      { name: design as SkillName },
      { name: ux as SkillName },
    ],
    available: false,
  },
  {
    id: "2",
    avatar:
      "https://images.pexels.com/photos/937483/pexels-photo-937483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Sally",
    title: "Software Developer",
    startDate: "06/01/2021",
    endDate: "08/18/2021",
    skills: [
      { name: react as SkillName },
      { name: node as SkillName },
      { name: devops as SkillName },
      { name: angular as SkillName },
      { name: design as SkillName },
      { name: ux as SkillName },
    ],
    available: false,
  },
  {
    id: "3",
    avatar:
      "https://st4.depositphotos.com/13193658/19840/i/600/depositphotos_198409160-stock-photo-handsome-young-businessman-smartphone-leaning.jpg",
    name: "Paul",
    title: "Visual Designer",
    startDate: "08/19/2021",
    endDate: "12/12/2021",
    skills: [
      { name: react as SkillName },
      { name: node as SkillName },
      { name: devops as SkillName },
      { name: angular as SkillName },
      { name: design as SkillName },
      { name: ux as SkillName },
    ],
    available: false,
  },
  {
    id: "4",
    avatar:
      "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Stephanie",
    title: "UX",
    startDate: "08/19/2021",
    endDate: "12/12/2021",
    skills: [
      { name: react as SkillName },
      { name: node as SkillName },
      { name: devops as SkillName },
      { name: angular as SkillName },
      { name: design as SkillName },
      { name: ux as SkillName },
    ],
    available: true,
  },
];

export const projects = [...Array(7).keys()].map((n) => {
  return {
    id: (100 + n).toString(),
    name: [
      "Acme Corporation",
      "Globex Corporation",
      "Soylent Corp",
      "Initech",
      "Umbrella Corporation",
      "Hooli",
      "Massive Dynamic",
    ][n],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    roles: [
      {
        id: (1000 + n).toString(),
        skill: { name: ux as SkillName },
        startDate: {
          confidence: "60%",
          date: "2014-02-09",
        },
        endDate: { confidence: "50%", date: "2014-02-10" },
        employees: [
          {
            ...employees[0],
            assignmentStartDate: "2014-02-09",
            assignmnetEndDate: "2014-02-10",
          },
        ],
      },
      {
        id: (2000 + n).toString(),
        skill: { name: react as SkillName },
        startDate: {
          confidence: "70%",
          date: "2014-02-19",
        },
        endDate: { confidence: "80%", date: "2014-02-20" },
        employees: [
          {
            ...employees[1],
            assignmentStartDate: "2014-02-19",
            assignmnetEndDate: "2014-02-20",
          },
          {
            ...employees[2],
            assignmentStartDate: "2014-02-19",
          },
          {
            ...employees[3],
          },
        ],
      },
    ],
  } as Project;
});
