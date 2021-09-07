import type { EstimatedDate } from "../../../../services/api/shared";

import styles from "./ProjectDate.module.scss";

export default function ProjectDate({
  title,
  estimatedDate,
  onConfidenceSelect,
  onDateChange,
}: {
  title: "Start Date" | "End Date";
  estimatedDate: EstimatedDate;
  onConfidenceSelect: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onDateChange: (evt: React.FormEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div className={styles.dateContainer}>
      <label>
        {title}
        <input value={estimatedDate.date} onChange={onDateChange} />
      </label>
      <label>
        Confidence:
        <select
          defaultValue={estimatedDate.confidence}
          onChange={onConfidenceSelect}
        >
          {Array.from(Array(21).keys()).map((n) => (
            <option value={n * 5} key={title + n}>{`${n * 5}%`}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
