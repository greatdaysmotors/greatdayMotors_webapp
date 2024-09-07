import React from "react";
import { Pagination } from "antd";

const PaginationComponent = ({ defaultCurrent = 1, total = 50, onChange }) => (
  <>
    <Pagination
      defaultCurrent={defaultCurrent}
      total={total}
      onChange={onChange}
    />
  </>
);

export default PaginationComponent;
