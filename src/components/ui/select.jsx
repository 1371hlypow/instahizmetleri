export function Select({ onValueChange, defaultValue, children }) {
  return <select onChange={(e) => onValueChange(e.target.value)} defaultValue={defaultValue} className="w-full p-2 border rounded">{children}</select>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue() {
  return <></>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}