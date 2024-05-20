import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Cookies, useCookies } from "react-cookie";
import { FaLandmark, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertMessage,
  ReloadButton,
  SubmitButton,
} from "../../components/common";
import { authActions } from "../../config/actions";
import usePrevious from "../Hooks/usePrevious";

function AuthUserLoader() {
  const dispatch = useDispatch();
  const { authUser, authUserError, isAuthenticated, gettingAuthUser } =
    useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ authUserError });
  const cookieObject = new Cookies();
  const [cookies] = useCookies();
  const accessToken = cookies.auth_access?.token;

  useEffect(() => {
    if (
      isEmpty(authUser) &&
      !isEmpty(accessToken) &&
      isAuthenticated === true
    ) {
      dispatch(authActions.getAuthUser());
    }
  }, []);

  const logoutCurrentUser = () => {
    cookieObject.remove("auth_access");
    dispatch(authActions.setIsAuthenticated(false));
  };

  useEffect(() => {
    setErrorMessage(null);
    if (isEmpty(accessToken)) {
      logoutCurrentUser();
    } else if (
      !isEmpty(prevState) &&
      !isEmpty(authUserError) &&
      prevState.authUserError !== authUserError
    ) {
      setErrorMessage(
        authUserError?.error?.message || authUserError?.server?.message
      );
    }
  }, [authUserError, accessToken]);

  return (
    <div className="vh-100 text-center bg-light d-flex m-0 p-4">
      <Container className="align-middle my-auto mx-auto">
        <FaLandmark className="text-primary" size={70} />
        {gettingAuthUser && (
          <div className="text-center text-sm my-1 text-capitalize text-info">
            <SubmitButton
              size="medium"
              loading
              type="ghost"
              className="mt-3"
              loadingText="Loading Your Profile"
            />
          </div>
        )}

        {errorMessage && (
          <div className="text-center">
            <div className="font500 text-uppercase text-sm text-info my-3">
              Oops... We are Unable to Load your Profile
            </div>
            <AlertMessage
              message={errorMessage}
              className="text-sm font500 py-1"
            />

            <ReloadButton
              loading={gettingAuthUser}
              text="Reload Profile"
              size="sm"
              className="d-inline me-2 py-1 text-sm font500 text-capitalize"
              onClick={() => dispatch(authActions.getAuthUser())}
            />

            <Button
              className="d-inline py-1 text-sm font500 text-capitalize"
              variant="danger"
              size="sm"
              onClick={logoutCurrentUser}
            >
              <FaSignInAlt className="me-1" />
              Log Out
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AuthUserLoader;
