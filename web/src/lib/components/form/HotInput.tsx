import { Input } from "@/lib/components";
import { useState } from "react";

type Props = {
  value: string;
  onFinish: (value: string) => void;
};

export const HotInput = ({ value, onFinish }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const handleFinish = () => {
    if (inputValue === value) return;

    onFinish(inputValue);
  };

  const handleBlur = () => {
    handleFinish();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFinish();
    }
  };

  return (
    <Input
      value={inputValue}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
