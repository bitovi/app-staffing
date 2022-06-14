import Select from "../../../../components/Select";

import styles from "./RoleDate.module.scss";

export default function RoleDate({
  title,
  date,
  confidence,
  onConfidenceChange,
  onDateChange,
}: {
  title: "Start Date" | "End Date";
  date: Date | string | undefined;
  confidence: number | undefined;
  onConfidenceChange: (confidence?: number) => void;
  onDateChange: (date?: Date) => void;
}): JSX.Element {
  return (
    <div className={styles.dateContainer}>
      <label>
        {title}
        <input
          type="date"
          defaultValue={date?.toString()}
          onBlur={({ target: { value } }) => onDateChange(new Date(value))}
        />
      </label>
      <Select
        name={`${title.replace(" ", "")}Confidence`}
        label="Confidence:"
        value={confidence}
        onChange={onConfidenceChange}
        options={[...Array(21).keys()].map((n) => ({
          value: n * 5,
          label: `${n * 5}%`,
        }))}
      />
    </div>
  );
}
