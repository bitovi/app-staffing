import type { Employee } from "../../../../services/api";

import React, { useState } from "react";

import styles from "./EmployeeCard.module.scss";

export default function EmployeeCard({
  employee,
  editing,
  onEdit,
  onSave,
  onCancel,
}: {
  employee: Employee;
  editing: boolean;
  onEdit: () => void;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<Employee>(employee);
  const { name, startDate, endDate, skills } = formData;

  const allSkills = ["React", "Angular", "DevOps", "Node", "UX", "Design"];

  const handleAddSkill = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = evt.target.value
    
    setFormData((formData) => ({ ...formData, skills: [...skills, {name: skill}] }));
    // eslint-disable-next-line no-console
    console.log("Add skill button clicked!");
  };

  const handleCancel = () => {
    onCancel();
    setFormData(employee);
  };

  const updateField = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <div
          role="button"
          className={styles.detail}
          onClick={onEdit}
          onKeyDown={onEdit}
          tabIndex={-1}
        >
          <input
            name="name"
            value={name}
            disabled={!editing}
            onChange={updateField}
          />
        </div>
        <div
          role="button"
          className={styles.detail}
          onClick={onEdit}
          onKeyDown={onEdit}
          tabIndex={-1}
        >
       
        </div>
      </div>
      <div className={styles.details}>
        <div
          role="button"
          className={styles.detail}
          onClick={onEdit}
          onKeyDown={onEdit}
          tabIndex={-1}
        >
          <label>
            Start Date
            <input
              name="startDate"
              value={startDate}
              disabled={!editing}
              onChange={updateField}
            />
          </label>
        </div>
        <div
          role="button"
          className={styles.detail}
          onClick={onEdit}
          onKeyDown={onEdit}
          tabIndex={-1}
        >
          <label>
            End Date
            <input
              name="endDate"
              value={endDate}
              disabled={!editing}
              onChange={updateField}
            />
          </label>
        </div>
      </div>
      <div className={styles.details}>
        <span className={styles.label}>Skill</span>
        <ul className={styles.skills}>
          {skills.map(({ name }) => (
            <li key={name} className={styles.skill}>
              {name}
            </li>
          ))}
        </ul>
        {editing && ( 
          // @Todo: See if there is a different event
          // eslint-disable-next-line jsx-a11y/no-onchange
          <select onChange={handleAddSkill}>
            { 
            allSkills.map(skill => <option key={skill} value={skill} >{skill}</option>) }
          </select>
        )}
      </div>
      {editing && (
        <div className={styles.details}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={() => onSave(formData)}>Save</button>
        </div>
      )}
    </div>
  );
}
