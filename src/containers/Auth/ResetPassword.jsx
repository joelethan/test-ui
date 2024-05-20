import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage } from "../../components/common";
import { authActions } from "../../config/actions";
import usePrevious from "../Hooks/usePrevious";
import ResetForm from "./ResetForm";

function ResetPassword({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetWith, setResetWith] = useState("email");
  const {
    resetPasswordError,
    requestTokenError,
    resetPasswordSuccess,
    requestTokenSuccess,
  } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const previousState = usePrevious({
    requestTokenError,
    requestTokenSuccess,
    resetPasswordError,
    resetPasswordSuccess,
  });

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!isEmpty(previousState)) {
      if (
        !isEmpty(requestTokenError) &&
        previousState.requestTokenError !== requestTokenError
      ) {
        setErrorMessage(
          requestTokenError?.error || requestTokenError?.server?.message
        );
      }
      if (
        previousState.requestTokenSuccess !== requestTokenSuccess &&
        requestTokenSuccess?.server
      ) {
        setSuccessMessage(requestTokenSuccess?.server?.message);
        setResetSuccess(true);
      }
    }
  }, [requestTokenError, requestTokenSuccess]);

  useEffect(() => {
    if (!isEmpty(previousState)) {
      if (
        !isEmpty(resetPasswordError) &&
        previousState.resetPasswordError !== resetPasswordError
      ) {
        setErrorMessage(
          resetPasswordError?.error || resetPasswordError.server.message
        );
      }
      if (
        previousState.resetPasswordSuccess !== resetPasswordSuccess &&
        resetPasswordSuccess?.server
      ) {
        setCurrentPage("login");
      }
    }
  }, [resetPasswordError, resetPasswordSuccess]);

  const resendOTP = (username) => {
    dispatch(authActions.requestToken({ username, account_type: resetWith }));
  };

  const onSubmit = (data) => {
    if (!isEmpty(data) && resetSuccess) {
      dispatch(authActions.resetPassword(data));
    } else {
      resendOTP(data.username);
    }
  };

  return (
    <>
      <AlertMessage
        type="info"
        className="text-lg fw-normal p-2"
        message="You can recover your account using E-mail or Phone"
      />
      <ResetForm
        onSubmit={onSubmit}
        resetWith={resetWith}
        setResetWith={setResetWith}
        resetSuccess={resetSuccess}
        resendOTP={resendOTP}
        key={resetWith}
        alertMessage={errorMessage || successMessage}
        alertType={errorMessage ? "error" : "success"}
      />
      <div className="mt-3 mb-2 font500 text-center text-sm">
        Have an account?
        <Button
          variant="link"
          size="small"
          className="d-inline text-sm font500 text-danger text-underline"
          onClick={() => setCurrentPage("login")}
        >
          Log in Here
        </Button>
      </div>
    </>
  );
}

ResetPassword.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default ResetPassword;
