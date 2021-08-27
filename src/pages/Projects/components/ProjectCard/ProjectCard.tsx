import type { Project } from "../../../../services/api";

const ProjectCard = ({
  project: {
    role,
    startDate,
    endDate,
    startConfidence,
    endConfidence,
    assignedEmployees,
  },
}: {
  project: Project;
}): JSX.Element => {
  return (
    <div>
      <div>ROLE: {role}</div>
      <div>
        <div>
          <label>
            Start Date
            <input value={startDate} />
          </label>

          <label>
            End Date
            <input value={endDate} />
          </label>
        </div>
        <div>
          <label>
            Confidence
            <input value={startConfidence} />
          </label>
          <label>
            Confidence
            <input value={endConfidence} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
