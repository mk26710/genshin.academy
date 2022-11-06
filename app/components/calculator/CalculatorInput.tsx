import type { ChangeEvent, FC } from "react";

import { Input } from "~/components/Input";

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
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
  };

  return (
    <Input
      value={value || ""}
      type="number"
      step={step}
      placeholder={placeholder}
      onChange={handleChange}
      fullWidth
      className={`dark:bg-neutral-900 [&:input]:mt-2 ${className} `}
    />
  );
};
