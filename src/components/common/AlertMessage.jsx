import { Alert } from "antd";
import PropTypes from "prop-types";
import React from "react";

function AlertMessage({ message, ...props }) {
  if (message)
    return <Alert message={message} type="error" {...props} showIcon />;

  return null;
}

AlertMessage.defaultProps = {
  message: null,
};

AlertMessage.propTypes = {
  message: PropTypes.string,
};

export default AlertMessage;
