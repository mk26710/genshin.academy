import type { ChangeEvent, FC } from "react";

interface Props {
  setValue: (value: number) => void;
  placeholder?: string;
  step?: number;
  className?: string;
}

export const CalculatorInput: FC<Props> = ({
  setValue,
  placeholder,
  step = 0.1,
  className = ``,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  return (
    <input
      type="number"
      step={step}
      placeholder={placeholder}
      onChange={handleChange}
      className={`calculator-input ${className}`}
    />
  );
};
