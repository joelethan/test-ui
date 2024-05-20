import React from "react";
import PropTypes, { object } from "prop-types";
import { Button, Tooltip } from "antd";

function SubmitButton({
  loading,
  text,
  type,
  loadingText,
  iconBefore,
  iconAfter,
  className,
  isAuthorized,
  ...props
}) {
  return (
    <>
      {isAuthorized ? (
        <Button
          htmlType="submit"
          type={type}
          size="small"
          className={`text-uppercase text-sm fw-bold ${className}`}
          loading={loading}
          icon={iconBefore}
          {...props}
        >
          {loading ? loadingText : text}
          {iconAfter}
        </Button>
      ) : (
        <Tooltip
          placement="topLeft"
          color="#ff7875"
          title="Authorization Required!"
        >
          <Button
            type={type}
            size="small"
            className={`text-uppercase text-sm fw-bold ${className}`}
            loading={loading}
            ghost
            icon={iconBefore}
            // {...props}
          >
            {loading ? loadingText : text}
            {iconAfter}
          </Button>
        </Tooltip>
      )}
    </>
  );
}

SubmitButton.defaultProps = {
  loading: false,
  text: "Save",
  type: "primary",
  loadingText: "Saving...",
  iconBefore: null,
  iconAfter: null,
  className: null,
  isAuthorized: true,
};

SubmitButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  isAuthorized: PropTypes.bool,
  iconBefore: PropTypes.oneOfType([object]),
  iconAfter: PropTypes.oneOfType([object]),
};

export default SubmitButton;
