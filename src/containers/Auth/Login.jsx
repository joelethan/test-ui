import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
// import { FaQuestionCircle, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { SubmitButton } from "../../components/common";
import { authActions } from "../../config/actions";
// import routePaths from "../../config/routes/routePaths";
import { removeEmptyOrNullObject } from "../../helpers/dataFormatter";
import usePrevious from "../Hooks/usePrevious";
import LoginForm from "./LoginForm";

function Login({ setCurrentPage }) {
  const dispatch = useDispatch();
  const { loginError, isAuthenticated, loginData } = useSelector(
    (state) => state.auth
  );
  const { verifyingGoogleToken } = useSelector((state) => state.server);

  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies();
  const previousState = usePrevious({ loginError, loginData });

  useEffect(() => {
    if (!isEmpty(cookies?.auth_access?.token) && isAuthenticated === true) {
      dispatch(authActions.setIsAuthenticated(true));
    }
  }, []);

  useEffect(() => {
    if (previousState && previousState.loginError !== loginError) {
      if (loginError) setError(loginError.server?.message);
    }
  }, [loginError]);

  useEffect(() => {
    if (
      !isEmpty(previousState) &&
      !isEmpty(loginData) &&
      previousState.loginData !== loginData
    ) {
      if (loginData.server?.status === true) {
        setCookie("auth_access", loginData.access_token, {
          path: "/",
          sameSite: true,
        });
        dispatch(authActions.setIsAuthenticated(true));
      }
    }
  }, [loginData]);

  const onSubmit = (formData) => {
    dispatch(authActions.loginApplicant(removeEmptyOrNullObject(formData)));
  };

  return (
    <>
      <LoginForm
        setCurrentPage={setCurrentPage}
        onSubmit={onSubmit}
        error={error}
        disabled={verifyingGoogleToken}
        onExpired={() => setError("Verification token expired")}
      />
      {/* <div className="mt-5 mb-2 text-center">
        <SubmitButton
          text="How to Apply"
          htmlType="button"
          type="primary"
          ghost
          iconBefore={<FaQuestionCircle className="me-1" />}
          className="d-inline text-sm  text-uppercase me-1"
          onClick={() => setCurrentPage(routePaths.register.path)}
        />
        <SubmitButton
          text="Register Here"
          htmlType="button"
          type="danger"
          ghost
          iconBefore={<FaRegEdit className="me-1" />}
          className="d-inline text-uppercase"
          onClick={() => setCurrentPage(routePaths.register.path)}
        />
      </div> */}
    </>
  );
}

Login.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Login;
