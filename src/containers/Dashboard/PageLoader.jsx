import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";
import { PuffLoader } from "react-spinners";

const override = css`
  display: block;
  border-color: var(--bs-primary);
  color: var(--bs-primary) !important;
`;

function PageLoader({ message }) {
  return (
    <div className="vh-100 text-center bg-light d-flex m-0 p-4">
      <div className="my-auto mx-auto">
        <PuffLoader color="var(--bs-primary)" css={override} size={100} />

        <div className="font500 text-uppercase text-sm text-primary mt-3">
          {message}
        </div>
      </div>
    </div>
  );
}

PageLoader.defaultProps = {
  message: "Please wait...",
};

PageLoader.propTypes = {
  message: PropTypes.string,
};

export default PageLoader;
