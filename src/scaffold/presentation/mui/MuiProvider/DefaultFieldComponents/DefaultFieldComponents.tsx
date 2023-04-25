import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import type { DefaultFieldComponentsTypes } from "../../../../components/ScaffoldPresentationProvider";

export const String: DefaultFieldComponentsTypes["String"] = ({
  value,
  label,
  onUpdate,
}) => {
  return (
    <TextField
      label={label}
      type="text"
      variant="outlined"
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};

export const Number: DefaultFieldComponentsTypes["Number"] = ({
  value,
  label,
  onUpdate,
}) => {
  return (
    <TextField
      label={label}
      type="number"
      variant="outlined"
      value={value}
      onChange={(e) => onUpdate(window.Number(e.target.value))}
    />
  );
};

export const Date: DefaultFieldComponentsTypes["Date"] = ({
  value,
  label,
  onUpdate,
}) => {
  return (
    <TextField
      label={label}
      type="date"
      variant="outlined"
      value={value?.split("T")[0] ?? ""}
      InputLabelProps={{ shrink: true }}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};

export const Boolean: DefaultFieldComponentsTypes["Boolean"] = ({
  value,
  label,
  onUpdate,
}) => {
  return (
    <FormControlLabel
      control={<Checkbox value={value} onChange={() => onUpdate(!value)} />}
      label={label}
      labelPlacement="end"
    />
  );
};

export const Relationship: DefaultFieldComponentsTypes["Relationship"] = ({
  values,
  options,
  label,
  onUpdate,
}) => {
  // values is array of ids, Autocomplete expects array of objects with a shape
  // that matches options
  const fullValues = values.map((value: string) => {
    return options.find((option) => option.id === value);
  });

  return (
    <Autocomplete
      value={fullValues}
      multiple
      filterSelectedOptions
      options={options}
      onChange={(_, values) => {
        const ids = values
          .filter((value) => value !== undefined)
          .map((value) => value?.id) as string[];
        onUpdate(ids);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
