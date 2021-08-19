import { useState } from "react";
import styles from "./EmployeeCard.module.css";

export default function EmployeeCard({
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
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const { name, title, startDate, endDate, skills, avatar } = data;

  return (
    <div className={styles.displayHorizontalContainer}>
      <div className={`${styles.displayHorizontalContainer} ${styles.horizontalMargin}`}>
        <div className="image-container">
            <img src={avatar} className={styles.profilePicture} placeholder="Profile Picture" alt="not found" />
        </div>
        <div className={styles.displayHorizontalContainer}>
          <div className={`${styles.employeeDetailsContainer} ${styles.displayVerticalContainer} ${styles.verticalMargin}`}>
            <div className={styles.employeeDetail}>
              <input id="name" value={name} disabled={!isEditing} />
            </div>
            <div className={styles.employeeDetail}>
              <input id="title" value={title} disabled={!isEditing} />
            </div>
          </div>
        </div>
        <div className={styles.displayVerticalContainer}>
          <div className={styles.dateContainer}>
            <label className={styles.displayVerticalContainer}>
              <span className={styles.bold}>Start Date</span>
              <input className={styles.verticalPadding} id="title" value={startDate} disabled={!isEditing} />
            </label>
          </div>
          <div className={styles.dateContainer}>
            <label className={styles.displayVerticalContainer}>
              <span className={styles.bold}>End Date</span>
              <input id="title" className={styles.verticalMargin} value={endDate} disabled={!isEditing} />
            </label>
          </div>
        </div>
        <div className={`${styles.displayVerticalContainer} ${styles.skillContainer}`}>
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
      {isEditing && (
        <div className="save-container">
          <button className="card-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="card-save" onClick={handleSave}>
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
