import type { NewEmployee, SkillName } from "../../../../services/api";

import React, { useState } from "react";

import { skillList } from "../../../../services/api";

import styles from "./EmployeeCard.module.scss";

export default function EmployeeCard<EmployeeType extends NewEmployee>({
  employee,
  editing,
  onEdit,
  onSave,
  onCancel,
}: {
  employee: EmployeeType;
  editing: boolean;
  onEdit?: () => void;
  onSave?: (employee: EmployeeType) => void;
  onCancel: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<EmployeeType>(employee);
  const { name, startDate, endDate, skills } = formData;

  const handleAddSkill = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = evt.target.value;

    setFormData((formData) => ({
      ...formData,
      skills: [...skills, { name: skill as SkillName }],
    }));
  };

  const handleRemoveSkill = (evt: React.FormEvent<HTMLButtonElement>) => {
    const skill = evt.currentTarget.value;

    setFormData((formData) => ({
      ...formData,
      skills: skills.filter((x) => x.name != skill),
    }));

    // eslint-disable-next-line no-console
    console.log("remove skill button clicked!");
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
              <button
                className={!editing ? styles.disabled : styles.editing}
                onClick={handleRemoveSkill}
                onKeyDown={handleRemoveSkill}
                tabIndex={-1}
                value={name}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {editing && (
          <select onChange={handleAddSkill}>
            {skillList.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        )}
      </div>
      {editing && onSave && (
        <div className={styles.details}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={() => onSave(formData)}>Save</button>
        </div>
      )}
    </div>
  );
}
