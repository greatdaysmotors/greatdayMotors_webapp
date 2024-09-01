import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`p-[0.8rem] font-[400] border outline-none rounded-[1rem] bg-[#fff] text-[#000] ${className} w-full`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options && options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
