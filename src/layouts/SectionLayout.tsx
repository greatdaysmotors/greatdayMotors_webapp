import React, { ReactNode } from "react";

interface SectionLayoutProps {
  children: ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
  return <div className="px-[2.4rem] lg:px-[4.4rem]">{children}</div>;
};

export default SectionLayout;
