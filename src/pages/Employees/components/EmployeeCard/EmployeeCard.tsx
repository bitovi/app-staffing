import type { Employee } from "../../../../services/api";

import { useState } from "react";

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
  onSave: () => void;
  onCancel: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<Employee>(employee);
  const { name, title, startDate, endDate, skills, avatar } = formData;

  const handleAddSkill = () => {
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
      <img
        className={styles.avatar}
        src={avatar}
        placeholder="Profile Picture"
        alt="not found"
      />
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
          <input
            name="title"
            value={title}
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
            </li>
          ))}
        </ul>
        {editing && (
          <button className={styles.addSkill} onClick={handleAddSkill}>
            Add Skill
          </button>
        )}
      </div>
      {editing && (
        <div className={styles.details}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      )}
    </div>
  );
}
