import React from 'react';

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "Enter text",
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-[0.8rem] outline-none rounded-[1rem] text-[#000]  ${className}`}
    />
  );
};

export default Input;
