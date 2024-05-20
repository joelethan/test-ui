import { Form, Radio } from "antd";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AntDInputText, SubmitButton } from "../../components/common";
import { registerForm } from "../../Forms/authForms";

function RegisterForm({ onSubmit }) {
  const { registering } = useSelector((state) => state.auth);
  const [gender, setGender] = useState("MALE");

  const onChange = (e) => {
    setGender(e.target.value);
  };

  const checkOnSubmitForm = (data) => {
    if (!isEmpty(data)) onSubmit({ ...data, gender });
  };

  return (
    <Form
      layout="horizontal"
      autoComplete="on"
      wrapperCol={{ className: "p-0 mb-1" }}
      labelCol={{ className: "p-0 mb-1", span: 8 }}
      initialValues={{
        phone: 256,
      }}
      onFinish={checkOnSubmitForm}
      className="py-3"
    >
      {registerForm.map((field) => (
        <AntDInputText
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
          itemAttributes={field.itemAttributes}
          type={field?.type}
          options={field?.options}
          inputAttributes={field.inputAttributes}
        />
      ))}

      <Form.Item label="GENDER" className="mb-0">
        <Radio.Group onChange={onChange} defaultValue={gender}>
          <Radio value="MALE">MALE</Radio>
          <Radio value="FEMALE">FEMALE</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
        }}
        className="mb-1"
      >
        <SubmitButton
          className="font500 w-100 text-white text-uppercase text-sm"
          size="medium"
          text="Register"
          iconBefore={<FaEdit className="me-1" />}
          loadingText="Creating account..."
          loading={registering}
        />
      </Form.Item>
    </Form>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
