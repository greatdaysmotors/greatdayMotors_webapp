import React from 'react';
import { Link } from 'react-router-dom';


interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string; 
}

const PrimaryBtn: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
  to,
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`py-[1.4rem] text-[1.4rem] lg:text-[1.6rem] rounded-[1rem] w-full ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );

  if (to) {
    return (
      <Link to={to}>
        <a>{buttonContent}</a>
      </Link>
    );
  }

  return buttonContent;
};

export default PrimaryBtn;
