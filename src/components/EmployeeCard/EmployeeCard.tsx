import { useState } from "react";

export default function Layout({
  children,
  data,
}: {
  children?: React.ReactNode;
  data: Employee;
}): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddSkill = () => {
    /* TODO: Add skill button handler */
    console.log("Add skill button clicked!");
  };

  const handleSave = () => {
    /* TODO: Add save handler */
    console.log("Save button clicked!");
  };

  const handleCancel = () => {
    /* TODO: Add cancel handler */
    console.log("Cancel button clicked!");
  };

  const { name, title, startDate, endDate, skills, available, avatar } = data;

  return (
    <div className="card-container">
      <div className="card-details">
        <div className="person-container">
          <div className="image-container">
            <img src={avatar} placeholder="Profile Picture" alt="not found" />
          </div>
          <div className="employee-details-container">
            <div className="employee-name">
              <input id="name" value={name} disabled={!isEditing} />
            </div>
            <div className="employee-title">
              <input id="title" value={title} disabled={!isEditing} />
            </div>
          </div>
        </div>
        <div className="dates-container">
          <div className="start-date">
            <label>
              Start Date
              <input id="title" value={startDate} disabled={!isEditing} />
            </label>
          </div>
          <div className="end-date">
            <label>
              End Date
              <input id="title" value={endDate} disabled={!isEditing} />
            </label>
          </div>
        </div>
        <div className="skills-container">
          {skills.map(({ name }) => (
            <div id={title + name} className="skill" key={name}>
              {name}
            </div>
          ))}
          <button className="add-skill-btn" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
        <div className="availability-container"></div>
      </div>
      <div className="save-container">
        <button className="card-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="card-save" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="availability-container">
        <input type="checkbox">
          <span className="slider round"></span>
        </input>
      </div>
    </div>
  );
}

export interface Employee {
  id: string;
  avatar: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: Skills[];
  available: boolean;
}

export interface Skills {
  name: string;
}
