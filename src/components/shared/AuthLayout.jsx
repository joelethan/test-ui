import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../config/actions";
import routePaths from "../../config/routes/routePaths";
import Login from "../../containers/Auth/Login";
import Register from "../../containers/Auth/Register";
import ResetPassword from "../../containers/Auth/ResetPassword";
import InstitutionLogo from "./InstitutionLogo";

function AuthPages({ currentPage, setCurrentPage }) {
  if (currentPage === routePaths.forgotPassword.path) {
    return <ResetPassword setCurrentPage={setCurrentPage} />;
  }
  return <Login setCurrentPage={setCurrentPage} />;
}

AuthPages.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

function AuthLayout() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [cookies] = useCookies();
  const accessToken = cookies.auth_access?.token;

  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    if (!isEmpty(accessToken) && isAuthenticated === true)
      dispatch(authActions.setIsAuthenticated(true));
  }, []);

  return (
    <Container fluid="sm">
      <Row className="vh-100 justify-content-md-center text-primary py-4">
        <>
          {currentPage === routePaths.register.path ? (
            <Register setCurrentPage={setCurrentPage} />
          ) : (
            <Col xs md={4} className="my-auto mx-center">
              <InstitutionLogo />
              <AuthPages
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </Col>
          )}
        </>
      </Row>
    </Container>
  );
}

export default AuthLayout;
