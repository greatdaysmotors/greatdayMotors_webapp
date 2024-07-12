import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const AppTheme = (props: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2F2FC8",
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

export default AppTheme;
