import { Empty } from "antd";
import PropTypes, { any } from "prop-types";
import React from "react";

function DataNotFound({ message, children, ...props }) {
  return (
    <div className="py-4 text-danger font600 text-uppercase">
      <Empty
        description={<div className="text-danger">{message}</div>}
        {...props}
      />
      {children}
    </div>
  );
}
DataNotFound.defaultProps = {
  children: null,
  message: "Data Not Found",
};

DataNotFound.propTypes = {
  message: PropTypes.string,
  children: PropTypes.oneOf([any]),
};

export default DataNotFound;
