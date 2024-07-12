import { ReactNode } from "react";

const Container: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`px-[2.4rem] lg:px-[4.4rem] 2xl:px-0 w-full max-w-[1440px] mx-auto flex overflow-x-scroll scroll-container ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
