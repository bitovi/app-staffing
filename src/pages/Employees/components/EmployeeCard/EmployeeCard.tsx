import type { Employee, SkillName } from "../../../../services/api";

import React, { useState } from "react";

import { skillList } from "../../../../services/api";

import styles from "./EmployeeCard.module.scss";
import { Button } from "../../../../components/Layout/components/Button";

import { ReactComponent as XIcon } from "./assets/X.svg";

export default function EmployeeCard({
  employee,
  editing,
  onEdit,
  onSave,
  onCancel,
}: {
  employee: Employee;
  editing: boolean;
  onEdit?: () => void;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}): JSX.Element {
  const [formData, setFormData] = useState<Employee>(employee);
  const { name, startDate, endDate, skills } = formData;

  const handleAddSkill = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = evt.target.value;

    setFormData((formData) => ({
      ...formData,
      skills: [...skills, { name: skill as SkillName }],
    }));
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
              <Button
                disabled={!editing}
                className={styles.removeSkillButton}
                onClick={() => handleRemoveSkill(name)}
                onKeyDown={() => handleRemoveSkill(name)}
                tabIndex={-1}
                variant="link"
                data-testid="remove-skill"
              >
                <XIcon width="0.75em" height="0.75em" />
              </Button>
            </li>
          ))}
        </ul>
        {editing && (
          <select onChange={handleAddSkill} data-testid="select-skills">
            {skillList.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className={styles.controls}>
        <label>
          Billable?
          <input type="checkbox" />
        </label>
        <div>
          <Button
            disabled={!editing}
            onClick={handleCancel}
            onKeyDown={handleCancel}
          >
            CANCEL
          </Button>
          <Button
            disabled={!editing}
            className={styles.save}
            variant="primary"
            onClick={() => onSave(employee)}
            onKeyDown={() => onSave(employee)}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
}
