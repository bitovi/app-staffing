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
    skills: [{ name: react as SkillName }, { name: node as SkillName }],
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
    skills: [{ name: angular as SkillName }],
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
    skills: [{ name: design as SkillName }, { name: react as SkillName }],
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
    skills: [{ name: ux as SkillName }, { name: design as SkillName }],
    available: true,
  },
];

export const projects = [...Array(7).keys()].map((n) => {
  return {
    id: (Math.floor(Math.random() * 1000) + 1).toString(),
    name: [
      "Acme Corporation",
      "Globex Corporation",
      "Soylent Corp",
      "Initech",
      "Umbrella Corporation",
      "Hooli",
      "Massive Dynamic",
    ][n],
    startDate: {
      date: "00/00/0000",
      confidence: "50%",
    },
    endDate: {
      date: "00/00/0000",
      confidence: "50%",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    roles: [
      {
        skill: { name: ux as SkillName },
        startDate: n == 3 ? "" : `${n + 1}/01/2022`,
        endDate: "",
      },
      {
        skill: { name: react as SkillName },
        startDate: "",
        endDate: "",
      },
      {
        skill: { name: devops as SkillName },
        startDate: "",
        endDate: n == 5 ? "12/30/2022" : "",
      },
    ],
  } as Project;
});
