import { Form } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertMessage,
  AntDInputText,
  SubmitButton,
} from "../../../components/common";
import { authActions } from "../../../config/actions";
import { changeOldPasswordForm } from "../../../Forms/beneficiary";
import usePrevious from "../../Hooks/usePrevious";

function ChangeOldPassword() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [changeSuccess, setChangeSuccess] = useState(null);
  const { changePasswordError, changePasswordSuccess, changingPassword } =
    useSelector((state) => state.auth);
  const prevState = usePrevious({ changePasswordError, changePasswordSuccess });

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(changePasswordError) &&
      changePasswordError !== prevState.changePasswordError
    ) {
      setErrorMessage(
        changePasswordError?.error?.message ||
          changePasswordError?.server?.message
      );
    }
    if (
      !isEmpty(prevState) &&
      !isEmpty(changePasswordSuccess) &&
      changePasswordSuccess !== prevState.changePasswordSuccess
    ) {
      setChangeSuccess(changePasswordSuccess?.server?.message);
    }
  }, [changePasswordError, changePasswordSuccess]);

  const onSubmitForm = (data) => {
    setErrorMessage(null);
    if (data) dispatch(authActions.changePassword(data));
  };

  return (
    <>
      <Card.Title className="text-center">CHANGE PASSWORD HERE</Card.Title>
      <AlertMessage
        message={errorMessage || changeSuccess}
        type={errorMessage ? "error" : "success"}
      />
      <Form
        onFinish={onSubmitForm}
        labelCol={{
          span: 8,
          className: "text-sm",
        }}
        labelAlign="right"
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
        className="mt-2"
        key={changeSuccess}
      >
        {changeOldPasswordForm.map((field) => (
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

        <div className="text-end">
          <SubmitButton
            size="sm"
            text="Change Password"
            loadingText="Updating Password..."
            loading={changingPassword}
            className="text-sm fw-bold mt-3 text-white text-uppercase"
          />
        </div>
      </Form>
    </>
  );
}

export default ChangeOldPassword;
