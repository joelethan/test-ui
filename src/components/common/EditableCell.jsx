/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Form, InputNumber } from "antd";
import React, { useEffect, useRef } from "react";

function EditableCell({
  editing,
  editable,
  dataIndex,
  title,
  edit,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => edit(record);

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          type="number"
          ref={inputRef}
          onPressEnter={() => {}}
          onBlur={() => {}}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

export default EditableCell;
