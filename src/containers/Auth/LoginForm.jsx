import { Form, Radio } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  AlertMessage,
  AntDInputText,
  SubmitButton,
} from "../../components/common";
import routePaths from "../../config/routes/routePaths";
import { loginForm } from "../../Forms/authForms";

function LoginForm({ onSubmit, setCurrentPage, error }) {
  const [loginType, setLoginType] = useState("email");
  const { loginIn } = useSelector((state) => state.auth);

  return (
    <>
      <Form
        layout="vertical"
        labelCol={{
          span: 8,
          className: "fw-bold mb-0",
        }}
        wrapperCol={{
          className: "mb-0",
        }}
        size="middle"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <div className="text-center">
          <Radio.Group
            defaultValue={loginType}
            buttonStyle="solid"
            size="small"
            style={{ marginTop: 16 }}
            onChange={(e) => setLoginType(e.target.value)}
            className="mb-3 text-xs text-center mt-0"
          >
            <Radio.Button value="email" className="text-sm fw-bold py-1">
              <FaEnvelope className="me-2" size={12} /> USE MY EMAIL
            </Radio.Button>
            <Radio.Button value="phone" className="text-sm fw-bold py-1">
              <FaPhone className="me-2" size={12} /> USE MY PHONE
            </Radio.Button>
          </Radio.Group>
        </div>

        <AlertMessage message={error} />

        <Card body className="p-3 my-2 rounded shadow-sm">
          <div className="mb-4 fw-bold text-muted text-center text-uppercase">
            LOGIN TO YOUR ACCOUNT
          </div>
          {loginForm(loginType).map((field) => (
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

          <SubmitButton
            className="w-100 mt-3 fw-bold text-uppercase text-sm"
            size="medium"
            text="Log In"
            loading={loginIn}
            disabled={loginIn}
            loadingText="Signing in..."
            iconBefore={<FaSignInAlt className="me-2" />}
          />
        </Card>
      </Form>
      <div className="text-sm mt-1 text-muted text-center">
        Did you Forget your Password?
        <Button
          variant="link"
          size="small"
          className="font500 py-0 text-sm text-danger"
          onClick={() => setCurrentPage(routePaths.forgotPassword.path)}
        >
          Click Here
        </Button>
      </div>
    </>
  );
}

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;
