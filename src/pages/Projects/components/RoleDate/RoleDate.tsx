import { Select } from "../../../../components/Select";
import type { EstimatedDate } from "../../../../services/api";

import styles from "./RoleDate.module.scss";

export default function RoleDate({
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
          data-testid={`role-${title.replace(" ", "-").toLowerCase()}`}
          type="date"
          defaultValue={estimatedDate.date}
          onBlur={(e) => {
            onChange({ ...estimatedDate, date: e.target.value });
          }}
        />
      </label>
      <Select
        name={`${title.replace(" ", "")}Confidence`}
        label="Confidence:"
        value={estimatedDate.confidence}
        onChange={(value) => {
          value && onChange({ ...estimatedDate, confidence: value });
        }}
        options={Array.from(Array(21).keys()).map((n) => ({
          value: `${n * 5}%`,
          label: `${n * 5}%`,
        }))}
      />
    </div>
  );
}
