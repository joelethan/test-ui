import PropTypes from "prop-types";
import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { SubmitButton } from "../../components/common";

function FilledButton({ sectionFilled, notFilled, filled, ...props }) {
  return (
    <SubmitButton
      danger={!sectionFilled}
      size="small"
      className="text-sm"
      type={sectionFilled ? "primary" : "dashed"}
      text={sectionFilled ? filled : notFilled}
      loadingText={sectionFilled ? filled : notFilled}
      icon={
        sectionFilled ? (
          <FaCheckCircle className="me-1" />
        ) : (
          <FaTimesCircle className="me-1" />
        )
      }
      {...props}
    />
  );
}

FilledButton.defaultProps = {
  notFilled: "NOT FILLED",
  filled: "FILLED",
};

FilledButton.propTypes = {
  sectionFilled: PropTypes.bool.isRequired,
  notFilled: PropTypes.string,
  filled: PropTypes.string,
};

export default FilledButton;
