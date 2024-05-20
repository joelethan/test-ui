import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

function DataSpinner({ text }) {
  return (
    <div className="align-items-center py-5">
      <div className="text-center my-auto mx-auto text-warning">
        <Spinner
          variant="primary"
          animation="border"
          size="large"
          className="p-2 mb-2"
        />
        <div className="text-primary text-sm text-uppercase font500">
          {text}
        </div>
      </div>
    </div>
  );
}

DataSpinner.defaultProps = {
  text: "Loading Data...",
};

DataSpinner.propTypes = {
  text: PropTypes.string,
};

export default DataSpinner;
