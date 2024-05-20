import React from "react";
import { Form } from "react-bootstrap";

function SearchField({ ...props }) {
  return <Form.Control className="form-control-sm search" {...props} />;
}

export default SearchField;
