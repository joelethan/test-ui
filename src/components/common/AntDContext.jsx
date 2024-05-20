import React from "react";
import PropTypes, { array, object } from "prop-types";
import { Button, Form, Select } from "antd";
import { Col, Row } from "react-bootstrap";

function AntDContext({ fields, inputAttributes }) {
  const [form] = Form.useForm();

  const { Option } = Select;
  return (
    <Form layout="inline" form={form} className="m-3">
      <Row>
        {fields.map((field) => (
          <Col>
            <Form.Item label={field.label}>
              <Select
                placeholder="Select option"
                allowClear
                showSearch
                {...inputAttributes}
              >
                {[].map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        ))}
        <Col>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

AntDContext.defaultProps = {
  inputAttributes: {},
};

AntDContext.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.oneOfType([array]).isRequired,
  inputAttributes: PropTypes.oneOfType([object]),
};

export default AntDContext;
