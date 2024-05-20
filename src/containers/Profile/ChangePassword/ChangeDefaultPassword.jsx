import { Alert, Form } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { FaSignOutAlt } from "react-icons/fa";
import { FcLock } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertMessage,
  AntDInputText,
  DataSpinner,
  SubmitButton,
} from "../../../components/common";
import { authActions, settingActions } from "../../../config/actions";
import usePrevious from "../../Hooks/usePrevious";

function ChangeDefaultPassword() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    loggingOut,
    logoutData,
    gettingAuthUser,
    changeDefaultPasswordError,
    changeDefaultPasswordSuccess,
    authUser,
    changingDefaultPassword,
  } = useSelector((state) => state.auth);
  const prevState = usePrevious({
    changeDefaultPasswordError,
    changeDefaultPasswordSuccess,
    logoutData,
  });
  const [cookies] = useCookies();
  const token = cookies?.auth_access?.token;

  useEffect(() => {
    if (isEmpty(authUser) && !isEmpty(token)) {
      dispatch(authActions.getAuthUser());
    }
  }, []);

  useEffect(() => {
    if (isEmpty(authUser) && isEmpty(token)) {
      dispatch(authActions.setIsAuthenticated(false));
    } else if (authUser.is_default_password === false) {
      dispatch(authActions.setIsAuthenticated(true));
      dispatch(settingActions.setSelectedMenu("state-users"));
    }
  }, [authUser, token]);

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(changeDefaultPasswordError) &&
      changeDefaultPasswordError !== prevState.changePasswordError
    ) {
      setErrorMessage(
        changeDefaultPasswordError?.error?.message ||
          changeDefaultPasswordError?.server?.message
      );
    }

    // Logout Successfully
    if (
      !isEmpty(prevState) &&
      !isEmpty(logoutData) &&
      logoutData !== prevState.logoutData
    ) {
      if (logoutData?.server?.status === true)
        dispatch(authActions.setIsAuthenticated(false));
    }
  }, [changeDefaultPasswordError, changeDefaultPasswordSuccess, logoutData]);

  const onSubmitForm = (data) => {
    setErrorMessage(null);
    if (data) dispatch(authActions.changeDefaultPassword(data));
  };

  const logoutUser = () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <>
      <div className="">
        <Helmet>
          <title>Change Default Password</title>
        </Helmet>
        <Container className="w-100 my-auto text-center text-primary">
          <Row className="content-justify-center">
            <Col md={{ span: 4, offset: 4 }}>
              {gettingAuthUser ? (
                <DataSpinner text="Loading Profile..." />
              ) : (
                <>
                  <FcLock className="fs-3 mb-2" />
                  <Alert
                    className="text-uppercase mb-4"
                    showIcon
                    message={`Hi ${authUser.surname}, Please change your Default password to proceed.`}
                  />
                  {errorMessage && <AlertMessage message={errorMessage} />}
                  <Form
                    layout="vertical"
                    onFinish={onSubmitForm}
                    className="text-start text-muted"
                  >
                    <AntDInputText
                      name="new_password"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Enter your New password",
                        },
                        {
                          min: 6,
                          message: "Password MUST be at least 5 characters.",
                        },
                        {
                          max: 16,
                          message: "Password MUST be less than 16 characters.",
                        },
                      ]}
                      type="password"
                    />
                    <AntDInputText
                      name="confirm_password"
                      dependencies={["new_password"]}
                      label="Confirm New Password"
                      rules={[
                        {
                          required: true,
                          message: "Confirm your New Password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("new_password") === value
                            ) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("The two passwords do not match!")
                            );
                          },
                        }),
                      ]}
                      inputAttributes={{
                        extra: "Enter your New Password again to confirm",
                      }}
                      type="password"
                    />

                    <div className="my-3">
                      <SubmitButton
                        text="Change Password"
                        className="w-100"
                        loadingText="Changing Password..."
                        loading={changingDefaultPassword}
                      />
                    </div>
                  </Form>
                  <div className="text-center mt-5">
                    <SubmitButton
                      className=" text-danger text-uppercase text-sm fw-bold"
                      type="ghost"
                      size="large"
                      iconBefore={<FaSignOutAlt className="me-1" />}
                      onClick={logoutUser}
                      loading={loggingOut}
                      text="Log out"
                      loadingText="Logging out..."
                    />
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ChangeDefaultPassword;
