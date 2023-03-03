import { Primitive } from "../../../presentation/interfaces";

export const String: React.FC<{
  value: string;
  onUpdate: (value: Primitive) => void;
}> = ({ value, onUpdate }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};

export const Number: React.FC<{
  value: number;
  onUpdate: (value: Primitive) => void;
}> = ({ value, onUpdate }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onUpdate(window.Number(e.target.value))}
    />
  );
};

export const Boolean: React.FC<{
  value: boolean;
  onUpdate: (value: Primitive) => void;
}> = ({ value, onUpdate }) => {
  return (
    <input type="checkbox" checked={value} onChange={() => onUpdate(!value)} />
  );
};

export const Date: React.FC<{
  value: string;
  onUpdate: (value: Primitive) => void;
}> = ({ value, onUpdate }) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};
