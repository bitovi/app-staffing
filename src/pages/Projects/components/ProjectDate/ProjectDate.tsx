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
          value={estimatedDate.date}
          onChange={(e) => {
            onChange({ ...estimatedDate, date: e.target.value });
          }}
        />
      </label>
      <label>
        Confidence:
        <select
          defaultValue={estimatedDate.confidence}
          onChange={(e) => {
            onChange({ ...estimatedDate, confidence: e.currentTarget.value });
          }}
        >
          {Array.from(Array(21).keys()).map((n) => (
            <option value={n * 5} key={title + n}>{`${n * 5}%`}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
