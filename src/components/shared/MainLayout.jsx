import { isEmpty } from "lodash";
import PropTypes, { any } from "prop-types";
import React, { useEffect } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authActions, settingActions } from "../../config/actions";
import SideBar from "./SideBar";
import TopMenu from "./TopMenu";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const accessToken = cookies.auth_access?.token;
  const { authUser, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedMenu } = useSelector((state) => state.setting);

  useEffect(() => {
    if (isEmpty(accessToken)) {
      dispatch(authActions.setIsAuthenticated(false));
    }
    if (
      authUser.is_default_password === true &&
      selectedMenu !== "change-default-password" &&
      selectedMenu !== "my-profile"
    ) {
      dispatch(settingActions.setSelectedMenu("change-default-password"));
    }
  }, [authUser, selectedMenu, accessToken, isAuthenticated]);

  const setSelectedMenu = (content) => {
    dispatch(settingActions.setSelectedMenu(content));
  };

  return (
    <div style={{ overflowY: "hidden" }}>
      <Navbar
        expand="sm"
        bg="primary"
        variant="light"
        className="text-white py-2 shadow-sm border-bottom border-white"
        fixed="top"
        style={{ zIndex: 999 }}
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => setSelectedMenu("state-users")}
            className="text-white text-uppercase font600 text-sm"
            style={{ cursor: "pointer" }}
          >
            SH SCHOLAR PORTAL
          </Navbar.Brand>
          <Navbar.Toggle
            className="text-white"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end text-white"
          >
            <TopMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Row className="row-deck gx-0 vh-100 justify-content-center pt-5">
          <SideBar />
          <Col className="col-md-9 ms-sm-auto col-lg-10">
            <Card body className="pt-0 bg-transparent border-0">
              {children}
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
}

MainLayout.defaultProps = {
  children: null,
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([any]),
};

export default MainLayout;
