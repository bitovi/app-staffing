import type { NewEmployee } from "../../../../services/api";

import React, { useState } from "react";

import { skillList, isSkillName } from "../../../../services/api";

import { Button } from "../../../../components/Layout/components/Button";
import styles from "./EmployeeCard.module.scss";

import { ReactComponent as XIcon } from "./assets/X.svg";
import { Select } from "../../../../components/Select";

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
  onSave: (employee: EmployeeType) => void;
  onCancel: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<EmployeeType>(employee);
  const { name, startDate, endDate, skills } = formData;

  const handleAddSkill = (skill: string) => {
    if (isSkillName(skill) && !skills.some((s) => s.name === skill)) {
      setFormData((formData) => ({
        ...formData,
        skills: [...skills, { name: skill }],
      }));
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData((formData) => ({
      ...formData,
      skills: skills.filter((x) => x.name != skillName),
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
        <input
          name="name"
          className={styles.name}
          value={name}
          aria-disabled={!editing}
          onFocus={onEdit}
          onChange={updateField}
          data-testid="name"
        />
      </div>
      <div className={styles.details}>
        <div role="button" className={styles.date} tabIndex={-1}>
          <label>
            Start Date
            <input
              name="startDate"
              value={startDate}
              aria-disabled={!editing}
              onFocus={onEdit}
              onChange={updateField}
            />
          </label>
        </div>
        <div role="button" className={styles.date} tabIndex={-1}>
          <label>
            End Date
            <input
              name="endDate"
              value={endDate}
              aria-disabled={!editing}
              onFocus={onEdit}
              onChange={updateField}
            />
          </label>
        </div>
      </div>
      <div className={styles.skills}>
        <span className={styles.label}>Skills</span>
        <ul data-testid="display-skills">
          {skills.map(({ name }) => (
            <li key={name} className={styles.skill}>
              {name}
              {editing && (
                <Button
                  className={styles.removeSkillButton}
                  onClick={() => handleRemoveSkill(name)}
                  onKeyDown={() => handleRemoveSkill(name)}
                  tabIndex={-1}
                  variant="link"
                  data-testid="remove-skill"
                >
                  <XIcon width="0.75em" height="0.75em" />
                </Button>
              )}
            </li>
          ))}
        </ul>
        {editing && (
          <Select
            className={styles.addSkill}
            data-testid="select-skills"
            label="Add skill"
            name="selectSkills"
            onChange={handleAddSkill}
            options={skillList
              .filter((skill) => !skills.some((s) => s.name === skill))
              .map((skill) => ({ label: skill, value: skill }))}
          />
        )}
      </div>
      <div className={styles.controls}>
        <label>
          Billable?
          <input type="checkbox" />
        </label>
        {editing && (
          <div>
            <Button onClick={handleCancel} onKeyDown={handleCancel}>
              CANCEL
            </Button>
            <Button
              className={styles.save}
              variant="primary"
              onClick={() => onSave(employee)}
              onKeyDown={() => onSave(employee)}
            >
              SAVE
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
