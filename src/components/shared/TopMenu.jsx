import React from "react";
import { NavDropdown, Spinner } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "../../config/actions";
import Logout from "./Logout";

function TopMenu() {
  const dispatch = useDispatch();
  const { authUser, loggingOut, gettingAuthUser } = useSelector(
    (state) => state.auth
  );
  const { selectedMenu } = useSelector((state) => state.setting);

  const setSelectedMenu = (content) => {
    dispatch(settingActions.setSelectedMenu(content));
    // dispatch(
    //   settingActions.switchRunningAdmissionTab("all-running-admissions")
    // );
  };

  return (
    <>
      {/* <Nav.Link
        active={selectedMenu === "state-users"}
        onClick={() => setSelectedMenu("state-users")}
        className="text-sm text-uppercase font500 border me-2 p-2"
      >
        APPLY NOW
      </Nav.Link>
      <Nav.Link
        active={selectedMenu === "application-history"}
        onClick={() => setSelectedMenu("application-history")}
        className="text-sm text-uppercase font500 border me-2 p-2"
      >
        Application History
      </Nav.Link>

      <Nav.Link
        active={selectedMenu === "admission-status"}
        onClick={() => setSelectedMenu("admission-status")}
        className="text-sm text-uppercase font500 border me-2"
      >
        Admission History
      </Nav.Link> */}
      {gettingAuthUser || loggingOut ? (
        <span className="text-sm text-warning">
          <Spinner
            variant="white"
            size="sm"
            animation="border"
            className="me-1"
          />
          {loggingOut ? "Logging Out..." : "Loading Profile..."}
        </span>
      ) : (
        <NavDropdown
          id="dropdown-basic-button"
          title={authUser.email || "undefined"}
          className="text-sm"
        >
          <NavDropdown.Item
            className="text-sm my-0 py-1"
            active={selectedMenu === "my-profile"}
            onClick={() => setSelectedMenu("my-profile")}
          >
            <FaUserGraduate className="me-1" />
            My Profile
          </NavDropdown.Item>
          <NavDropdown.Divider className="m-0" />
          <Logout />
        </NavDropdown>
      )}
    </>
  );
}

export default TopMenu;
