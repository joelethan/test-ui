import { Form, Radio } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaSyncAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  AlertMessage,
  AntDInputText,
  SubmitButton,
} from "../../components/common";
import { resetPasswordForm, resetWithForm } from "../../Forms/authForms";

function ResetForm({
  onSubmit,
  resetWith,
  setResetWith,
  resendOTP,
  resetSuccess,
  alertType,
  alertMessage,
}) {
  const { requestingToken, resettingPassword } = useSelector(
    (state) => state.auth
  );

  const [form] = Form.useForm();
  const username = Form.useWatch("username", form);

  return (
    <>
      <div className="text-center">
        <Radio.Group
          defaultValue={resetWith}
          buttonStyle="solid"
          style={{ marginTop: 16 }}
          onChange={(e) => setResetWith(e.target.value)}
          className="mb-3 text-center"
          disabled={resetSuccess}
        >
          <Radio.Button value="email">
            <FaEnvelope className="me-2" /> RESET WITH E-MAIL
          </Radio.Button>
          <Radio.Button value="phone">
            <FaPhone className="me-2" /> RESET WITH PHONE
          </Radio.Button>
        </Radio.Group>
      </div>
      <AlertMessage message={alertMessage} type={alertType} />
      <Card body className="my-2 rounded">
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          {resetWithForm(resetWith).map((field) => (
            <AntDInputText
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
              itemAttributes={field.itemAttributes}
              type={field?.type}
              options={field?.options}
              inputAttributes={{
                ...field.inputAttributes,
                readOnly: resetSuccess,
              }}
            />
          ))}

          {resetSuccess && (
            <>
              {resetPasswordForm.map((field) => (
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
            </>
          )}

          <SubmitButton
            className="text-uppercase text-white w-100 text-sm mt-3 mb-2 font500"
            loading={(requestingToken && !resetSuccess) || resettingPassword}
            loadingText={
              resetSuccess ? "Resetting Password..." : "Requesting..."
            }
            size="medium"
            text={resetSuccess ? "Reset Password" : "Request Token"}
          />
        </Form>

        {resetSuccess && (
          <SubmitButton
            className="text-uppercase w-100 text-sm text-danger mt-3 mb-2 font500"
            size="small"
            type="link"
            onClick={() => resendOTP(username)}
            loading={requestingToken}
            iconBefore={<FaSyncAlt className="me-1" />}
            loadingText="Resending OTP..."
            text="Resend Token"
          />
        )}
      </Card>
    </>
  );
}

ResetForm.defaultProps = {
  resetSuccess: false,
  alertType: "error",
  alertMessage: null,
};

ResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setResetWith: PropTypes.func.isRequired,
  resendOTP: PropTypes.func.isRequired,
  resetWith: PropTypes.string.isRequired,
  alertType: PropTypes.string,
  alertMessage: PropTypes.string,
  resetSuccess: PropTypes.bool,
};

export default ResetForm;
