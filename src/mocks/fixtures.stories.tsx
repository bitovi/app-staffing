// import {
//   useAssignment,
//   useAssignments,
//   useAssignmentMutations,
//   useEmployee,
//   useEmployees,
//   useEmployeeMutations,
//   useProject,
//   useProjects,
//   useProjectMutations,
//   useRole,
//   useRoles,
//   useRoleMutations,
//   useSkill,
//   useSkills,
//   useSkillMutations,
// } from "../services/api";

export default {
  title: "Fixtures",
};

export const Test = (): JSX.Element => {
  console.log("############################################################");

  // console.log("Assignments");
  // console.log(useAssignments());
  // console.log(useAssignment("15888a22-b7ef-484c-910b-5227c9e8d01b"));
  // const { createAssignment, updateAssignment, destroyAssignment } = useAssignmentMutations();

  // console.log("Employees");
  // console.log(useEmployees());
  // console.log(useEmployee("15888a22-b7ef-484c-910b-5227c9e8d01b"));
  // const { createEmployee, updateEmployee, destroyEmployee } = useEmployeeMutations();

  // console.log("Projects");
  // console.log(useProjects());
  // console.log(useProject("20f74fdd-4332-4c49-a1f7-8ea8619c0bf5"));
  // const { createProject, updateProject, destroyProject } = useProjectMutations();

  // console.log("Roles");
  // console.log(useRoles({ include: ["projects", "assignments"] }));
  // console.log(useRole("2a58057f-7321-4bd6-87f2-1e39f317405b"));
  // const { createRole, updateRole, destroyRole } = useRoleMutations();

  // console.log("Skills");
  // console.log(useSkills());
  // console.log(useSkill("f14f4056-8591-4973-b30a-f7ca1e6d2d0b"));
  // const { createSkill, updateSkill, destroySkill } = useSkillMutations();

  return (
    <div>
      <button
        onClick={() => {
          // createSkill({ name: "yetti" });
          // destroySkill("db57af76-6a06-40bb-adbc-31ff29a2350e");
        }}
      >
        run
      </button>
    </div>
  );
};
