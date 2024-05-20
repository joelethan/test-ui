import React from "react";
import { Spin } from "antd";

function BarLoader() {
  return (
    <div className="bar-loader">
      <Spin />
    </div>
  );
}

export default BarLoader;
