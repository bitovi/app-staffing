import { Select } from "../../../../components/Select";
import type { EstimatedDate } from "../../../../services/api/shared";

import styles from "./ProjectDate.module.scss";

export default function ProjectDate({
  title,
  estimatedDate,
  onChange,
}: {
  title: "Start Date" | "End Date";
  estimatedDate: EstimatedDate;
  onChange: (date: EstimatedDate) => void;
}): JSX.Element {
  return (
    <div className={styles.dateContainer}>
      <label>
        {title}
        <input
          defaultValue={estimatedDate.date}
          onBlur={(e) => {
            onChange({ ...estimatedDate, date: e.target.value });
          }}
        />
      </label>
      <Select
        label="Confidence:"
        name="confidence"
        value={estimatedDate.confidence}
        onChange={(value) => {
          onChange({ ...estimatedDate, confidence: value || "" });
        }}
        options={Array.from(Array(21).keys()).map((n) => ({
          value: `${n * 5}%`,
          label: `${n * 5}%`,
        }))}
      />
    </div>
  );
}
