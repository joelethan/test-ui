import { Tooltip } from "antd";
import { isEmpty } from "lodash";
import PropTypes, { any, array } from "prop-types";
import React from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function InputText({
  label,
  error,
  register,
  name,
  type,
  rows,
  handleChange,
  placeholder,
  className,
  selectOptions,
  selectType,
  selectHandler,
  isMulti,
  isSearchable,
  inline,
  autoComplete,
  defaultValue,
  requiredField,
  toolTip,
  ...props
}) {
  const setClassName = () => {
    let newClassName = `form-control form-control-sm rounded-0 w-100 ${className}`;
    if (error)
      newClassName = `form-control form-control-sm rounded-0 w-100 ${className} is-invalid`;
    return newClassName;
  };

  return (
    <Form.Group className={`mb-2 ${inline ? "row" : "form-group"}`}>
      {label && (
        <FormLabel
          htmlFor={name}
          className={`font500 text-muted text-sm mb-1 mt-0 ${
            inline ? "col-md-4 my-auto" : ""
          }`}
          style={{ textAlign: "left !important" }}
        >
          {label}
          {requiredField && <strong className="text-danger ms-1">*</strong>}
        </FormLabel>
      )}
      <div className={inline ? "col-md-8" : ""}>
        <Tooltip
          placement="bottomLeft"
          color="blue"
          title={toolTip === null ? label : toolTip}
        >
          {type !== "textarea" &&
            type !== "select" &&
            type !== "date" &&
            type !== "tel" && (
              <Form.Control
                type={type}
                name={name}
                id={name}
                ref={register}
                className={setClassName()}
                autoComplete={autoComplete}
                {...props}
              />
            )}
          {type === "textarea" && (
            <Form.Control
              as="textarea"
              name={name}
              rows={rows}
              ref={register}
              onChange={handleChange}
              defaultValue={defaultValue}
              className={setClassName()}
              placeholder={placeholder}
              {...props}
            />
          )}
          {type === "tel" && (
            <Controller
              as={PhoneInput}
              country="ug"
              inputProps={{
                className: setClassName(),
                name,
              }}
              name={name}
              defaultValue={defaultValue}
              enableSearch
              {...props}
            />
          )}
          {!isEmpty(error) && (
            <div
              className={`fw-normal ${
                type === "select" || type === "tel"
                  ? "mt-1"
                  : "invalid-feedback"
              }`}
              style={
                type === "select" || type === "tel"
                  ? { color: "#ff3838", fontSize: "12px" }
                  : {}
              }
            >
              {error}
            </div>
          )}
        </Tooltip>
      </div>
    </Form.Group>
  );
}

InputText.defaultProps = {
  type: "text",
  label: null,
  error: null,
  handleChange: null,
  autoComplete: "off",
  defaultValue: null,
  placeholder: null,
  className: null,
  isSearchable: true,
  isMulti: false,
  selectHandler: null,
  selectType: null,
  selectOptions: [],
  inline: false,
  register: null,
  name: null,
  rows: 5,
  requiredField: false,
  toolTip: null,
};

InputText.propTypes = {
  type: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  toolTip: PropTypes.string,
  handleChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([any]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  selectOptions: PropTypes.oneOfType([array]),
  selectType: PropTypes.string,
  selectHandler: PropTypes.func,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  inline: PropTypes.bool,
  autoComplete: PropTypes.string,
  rows: PropTypes.number,
  requiredField: PropTypes.bool,
};

export default InputText;
