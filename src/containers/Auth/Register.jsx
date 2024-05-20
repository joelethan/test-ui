/* eslint-disable no-unused-vars */
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage } from "../../components/common";
import InstitutionLogo from "../../components/shared/InstitutionLogo";
import { authActions } from "../../config/actions";
import routePaths from "../../config/routes/routePaths";
import { removeEmptyOrNullObject } from "../../helpers/dataFormatter";
import usePrevious from "../Hooks/usePrevious";
import RegisterForm from "./RegisterForm";

function Register({ setCurrentPage }) {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.auth.registerError);
  const [error, setError] = useState(null);
  const registeredApplicant = useSelector(
    (state) => state.auth.registeredApplicant
  );
  const previousState = usePrevious({ registerError, registeredApplicant });

  useEffect(() => {
    if (previousState && previousState.registerError !== registerError) {
      if (registerError)
        setError(
          registerError.error?.message ||
            registerError.error ||
            registerError.server?.message
        );
    }
  }, [registerError]);

  useEffect(() => {
    if (
      !isEmpty(previousState) &&
      previousState.registeredApplicant !== registeredApplicant
    ) {
      if (registeredApplicant.server?.status === true) setCurrentPage("login");
    }
  }, [registeredApplicant]);

  const onSubmit = (data) => {
    dispatch(authActions.registerUser(removeEmptyOrNullObject(data)));
  };

  return (
    <Col md={6} sm={12} lg={5} className="my-auto mx-center">
      <InstitutionLogo />
      {/* <AlertMessage
        type="error"
        className="text-xs text-uppercase fw-normal"
        size="small"
        message="Names should be similar to those on PLE, ‘O’ and ‘A’ Level results slips. Your PASSWORD will be sent to the phone number and email address you provide here."
      /> */}
      <div className="my-2 fw-bold text-primary text-center text-uppercase">
        Create Your Account
      </div>
      <AlertMessage message={error} />

      <Card body className="p-3 my-2 rounded shadow-sm">
        <RegisterForm onSubmit={onSubmit} />
      </Card>
      <div className="mt-3 mb-2 text-center text-md">
        Already Registered?
        <Button
          variant="link"
          size="sm"
          className="d-inline text-danger fw-bold text-uppercase text-underline"
          onClick={() => setCurrentPage(routePaths.login.path)}
        >
          Log in Here
        </Button>
      </div>
    </Col>
  );
}

Register.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Register;
