import type { Employee, SkillName } from "../../../../services/api";

import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";

import { skillList } from "../../../../services/api";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Layout/components/Button";

import { ReactComponent as XIcon } from "./assets/X.svg";
import styles from "./EmployeeCard.module.scss";

function useTimeout(callback: () => void, delay: number | null) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedCallback = React.useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      timeoutRef.current = setTimeout(tick, delay);

      return () => {
        timeoutRef.current && window.clearTimeout(timeoutRef.current);
      };
    }
  }, [delay]);

  return timeoutRef;
}

export default function EmployeeCard<EmployeeType extends Employee>({
  employee,
  onSave,
}: {
  employee: EmployeeType;
  onSave: (employee: EmployeeType) => void;
}): JSX.Element {
  const [formData, setFormData] = useState<EmployeeType>(employee);
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const handleFocus = () => setHasFocus(true);
  const handleBlur = () => setHasFocus(false);

  useTimeout(
    () => {
      !isEqual(employee, formData) && onSave(formData);
    },
    hasFocus ? null : 300,
  );

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleAddSkill = (skillName: SkillName) => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: skillName }],
    });
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((x) => x.name != skillName),
    });
  };

  const updateField = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.wrapper} onFocus={handleFocus} onBlur={handleBlur}>
      <div className={styles.details}>
        <input
          name="name"
          className={styles.name}
          value={formData.name}
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
              value={formData.startDate}
              onChange={updateField}
            />
          </label>
        </div>
        <div role="button" className={styles.date} tabIndex={-1}>
          <label>
            End Date
            <input
              name="endDate"
              value={formData.endDate}
              onChange={updateField}
            />
          </label>
        </div>
      </div>
      <div className={styles.skills}>
        <span className={styles.label}>Skills</span>
        <ul data-testid="display-skills">
          {formData.skills.map(({ name }) => (
            <li key={name} className={styles.skill}>
              {name}
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
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.controls}>
        <Select
          label="Add skills"
          name="addSkills"
          value=" "
          onChange={handleAddSkill}
          onFocus={handleFocus} // react-select will prevent the event from bubbling if this isn't set
          data-testid="select-skills"
          options={skillList
            .filter(
              (skill) =>
                !formData.skills.some(
                  (activeSkill) => activeSkill.name === skill,
                ),
            )
            .map((skill) => ({ label: skill, value: skill }))}
        />
      </div>
    </div>
  );
}
