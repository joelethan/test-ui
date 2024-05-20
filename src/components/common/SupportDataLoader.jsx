import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  border-color: var(--bs-primary);
  color: var(--bs-primary) !important;
`;

function SupportDataLoader({ message }) {
  return (
    <div className="text-center bg-light d-flex m-0 p-4">
      <div className="my-auto mx-auto">
        <BeatLoader color="var(--bs-primary)" css={override} />

        <div className="font500 text-uppercase text-sm text-primary mt-3">
          {message}
        </div>
      </div>
    </div>
  );
}

SupportDataLoader.defaultProps = {
  message: "Please wait...",
};

SupportDataLoader.propTypes = {
  message: PropTypes.string,
};

export default SupportDataLoader;
