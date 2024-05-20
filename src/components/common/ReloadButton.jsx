import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import SubmitButton from "./SubmitButton";

function ReloadButton({ ...props }) {
  return (
    <SubmitButton
      iconBefore={<FaSyncAlt className="me-1" />}
      variant="warning"
      text="RELOAD"
      loadingText="Loading..."
      className="text-sm text-uppercase font500"
      {...props}
    />
  );
}

export default ReloadButton;
