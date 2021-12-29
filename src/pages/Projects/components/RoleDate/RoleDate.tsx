import Select from "../../../../components/Select";

import styles from "./RoleDate.module.scss";

export default function RoleDate({
  title,
  date,
  confidence,
  onChange,
}: {
  title: "Start Date" | "End Date";
  date: Date | undefined;
  confidence: number | undefined;
  onChange: (estimation: { date?: Date; confidence?: number }) => void;
}): JSX.Element {
  return (
    <div className={styles.dateContainer}>
      <label>
        {title}
        <input
          type="date"
          defaultValue={date?.toString()}
          onBlur={(e) => {
            onChange({
              date: new Date(e.target.value),
            });
          }}
        />
      </label>
      <Select
        name={`${title.replace(" ", "")}Confidence`}
        label="Confidence:"
        value={confidence}
        onChange={(value) => {
          value && onChange({ confidence: value });
        }}
        options={[...Array(21).keys()].map((n) => ({
          value: n * 5,
          label: `${n * 5}%`,
        }))}
      />
    </div>
  );
}
