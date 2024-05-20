/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "./testing.css";

function TestingCustom() {
  return (
    <div className="custom-upload">
      <label htmlFor="file-upload" className="upload-label">
        <span className="upload-icon" />
        Upload
      </label>
      <input id="file-upload" type="file" accept="image/*" />
    </div>
  );
}

export default TestingCustom;
