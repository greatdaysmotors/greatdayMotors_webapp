import { Button, InputNumber } from "antd";
import React from "react";
import { HiMiniMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";

interface QuantityInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        onClick={handleDecrement}
        icon={<HiMiniMinusSmall size={15} />}
        className="w-[3rem] h-[3rem] rounded-r-[1px]"
      />
      <InputNumber
        min={min}
        max={max}
        value={value}
        onChange={(value) => onChange(value || min)}
        className="w-[3.25rem] h-[3rem] rounded-[1px]"
      />
      <Button
        onClick={handleIncrement}
        icon={<HiMiniPlusSmall size={15} />}
        className="w-[3rem] h-[3rem] rounded-l-[1px]"
      />
    </div>
  );
};

export default QuantityInput;
