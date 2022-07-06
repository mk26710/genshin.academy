import type { ChangeEvent, FC } from "react";

interface Props {
  setValue: (value: number) => void;
  placeholder?: string;
  step?: number;
  className?: string;
  value?: number;
}

export const CalculatorInput: FC<Props> = ({
  setValue,
  value,
  placeholder,
  step = 0.1,
  className = ``,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  return (
    <input
      value={value || ``}
      type="number"
      step={step}
      placeholder={placeholder}
      onChange={handleChange}
      className={`calculator-input ${className}`}
    />
  );
};
