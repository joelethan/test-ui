import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import PropTypes, { array, object } from "prop-types";
import React from "react";
import CustomCalendar from "./CustomCalendar";

const { Option } = Select;
const { TextArea } = Input;

function AntDInputText({
  name,
  label,
  rules,
  itemAttributes,
  inputAttributes,
  uploadProps,
  type,
  options,
  context,
}) {
  const props = { ...uploadProps, ...inputAttributes };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 80,
        }}
        defaultValue="256"
      >
        <Option value="255">+255</Option>
        <Option value="254">+254</Option>
        <Option value="256">+256</Option>
        <Option value="250">+250</Option>
      </Select>
    </Form.Item>
  );
  const TelePhone = (
    <Input
      addonBefore={prefixSelector}
      style={{
        width: "100%",
      }}
      {...inputAttributes}
    />
  );

  return (
    <>
      {!context ? (
        <Form.Item
          key={name}
          label={label}
          name={name}
          rules={rules}
          className="mb-2"
          {...itemAttributes}
        >
          {(type === "select" && (
            <Select
              placeholder="Select option"
              allowClear
              showSearch
              {...inputAttributes}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )) ||
            (type === "textarea" && (
              <TextArea rows={4} {...inputAttributes} />
            )) ||
            (type === "tel" && TelePhone) ||
            (type === "date" && (
              <DatePicker
                style={{
                  width: "100%",
                }}
                {...inputAttributes}
                format="DD/MM/YYYY"
              />
            )) ||
            (type === "simple_date" && (
              <CustomCalendar {...inputAttributes} />
            )) ||
            (type === "password" && <Input.Password {...inputAttributes} />) ||
            (type === "file" && (
              <Upload {...props}>
                <Button block icon={<UploadOutlined />}>
                  Select File
                </Button>
              </Upload>
            )) ||
            (type === "number" && <InputNumber {...inputAttributes} />) || (
              <Input {...inputAttributes} />
            )}
        </Form.Item>
      ) : (
        <Col span={10}>
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules}
            className="mb-2"
            {...itemAttributes}
          >
            <Select
              placeholder="Select option"
              allowClear
              showSearch
              {...inputAttributes}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
    </>
  );
}

AntDInputText.defaultProps = {
  rules: [],
  options: [],
  itemAttributes: {},
  inputAttributes: {},
  uploadProps: {},
  type: "text",
  context: false,
  label: null,
};

AntDInputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  context: PropTypes.bool,
  type: PropTypes.string,
  rules: PropTypes.oneOfType([array]),
  options: PropTypes.oneOfType([array]),
  itemAttributes: PropTypes.oneOfType([object]),
  inputAttributes: PropTypes.oneOfType([object]),
  uploadProps: PropTypes.oneOfType([object]),
};

export default AntDInputText;
