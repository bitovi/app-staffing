import { useState } from "react";
import styles from "./EmployeeCard.module.css";

export default function EmployeeCard({
  children,
  employee,
  editing,
  onEdit,
  onSave,
  onCancel,
}: {
  children?: React.ReactNode;
  employee: Employee;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}): JSX.Element {
  const handleAddSkill = () => {
    // eslint-disable-next-line no-console
    console.log("Add skill button clicked!");
  };

  const handleCancel = () => {
    onCancel();
    setFormData({ ...employee });
  };

  const [formData, setFormData] = useState<Employee>({ ...employee });
  const { name, title, startDate, endDate, skills, avatar } = formData;

  const updateField = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className={`${styles.displayHorizontalContainer} ${styles.cardSpacing}`}
    >
      <div
        className={`${styles.displayHorizontalContainer} ${styles.horizontalMargin}`}
      >
        <div className="image-container">
          <img
            className={styles.profilePicture}
            src={avatar}
            placeholder="Profile Picture"
            alt="not found"
          />
        </div>
        <div className={styles.displayHorizontalContainer}>
          <div
            className={`${styles.employeeDetailsContainer} ${styles.displayVerticalContainer} ${styles.verticalMargin}`}
          >
            <div
              role="button"
              className={styles.employeeDetail}
              onClick={onEdit}
              onKeyDown={onEdit}
              tabIndex={-1}
            >
              <input
                name="name"
                id={name}
                value={name}
                disabled={!editing}
                onChange={updateField}
              />
            </div>
            <div
              role="button"
              className={styles.employeeDetail}
              onClick={onEdit}
              onKeyDown={onEdit}
              tabIndex={-1}
            >
              <input
                name="title"
                id={title}
                value={title}
                disabled={!editing}
                onChange={updateField}
              />
            </div>
          </div>
        </div>
        <div className={styles.displayVerticalContainer}>
          <div
            role="button"
            className={styles.dateContainer}
            onClick={onEdit}
            onKeyDown={onEdit}
            tabIndex={-1}
          >
            <label
              className={`${styles.bold} ${styles.displayVerticalContainer}`}
            >
              Start Date
              <input
                className={styles.verticalMargin}
                name="startDate"
                id={startDate}
                value={startDate}
                disabled={!editing}
                onChange={updateField}
              />
            </label>
          </div>
          <div
            role="button"
            className={styles.dateContainer}
            onClick={onEdit}
            onKeyDown={onEdit}
            tabIndex={-1}
          >
            <label
              className={`${styles.bold} ${styles.displayVerticalContainer}`}
            >
              End Date
              <input
                className={styles.verticalMargin}
                name="endDate"
                id={endDate}
                value={endDate}
                disabled={!editing}
                onChange={updateField}
              />
            </label>
          </div>
        </div>
        <div
          className={`${styles.displayVerticalContainer} ${styles.skillContainer}`}
        >
          <span className={styles.bold}>Skills</span>
          <div className={styles.displayHorizontalContainer}>
            {skills.map(({ name }) => (
              <div id={title + name} className={styles.skill} key={name}>
                {name}
              </div>
            ))}
          </div>
          <button className={styles.skillBtn} onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
        <div className={styles.displayVerticalContainer}>
          <span className={styles.bold}>Available</span>
          <div className={styles.availabilityContainer}>
            <input type="checkbox" />
            <span className={`${styles.round} ${styles.slider}`}></span>
          </div>
        </div>
      </div>
      {editing && (
        <div className="save-container">
          <button className="card-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="card-save" onClick={onSave}>
            Save
          </button>
        </div>
      )}
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
