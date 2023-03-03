import { TextField } from "@mui/material";
import type { Primitive } from "../../../interfaces";

export const String: React.FC<{
  value: string;
  onUpdate: (value: Primitive) => void;
}> = ({ value, onUpdate }) => {
  return (
    <TextField
      label=""
      variant="outlined"
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};
