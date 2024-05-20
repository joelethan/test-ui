import PropTypes from "prop-types";
import React, { useState } from "react";
import { OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import FileUploader from "./FileUploader";

function FileUploaderContainer({ isAuthorized, ...props }) {
  const [tooltipShow, setTooltipShow] = useState(false);

  const showTooltip = (bool) => {
    setTooltipShow(bool);
  };

  return (
    <>
      {isAuthorized ? (
        <Row style={{ paddingTop: "20px" }}>
          <FileUploader {...props} />
        </Row>
      ) : (
        <OverlayTrigger
          show={tooltipShow}
          placement="top"
          overlay={
            <Tooltip className="bs-tooltip">Authorization Required!</Tooltip>
          }
        >
          <Row
            style={{ paddingTop: "20px" }}
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => showTooltip(false)}
          >
            <FileUploader disabled={!isAuthorized} {...props} />
          </Row>
        </OverlayTrigger>
      )}
    </>
  );
}

FileUploaderContainer.defaultProps = {
  isAuthorized: true,
};

FileUploaderContainer.propTypes = {
  isAuthorized: PropTypes.bool,
};

export default FileUploaderContainer;
