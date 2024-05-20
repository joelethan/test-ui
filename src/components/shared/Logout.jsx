import React from "react";
import { NavDropdown, Spinner } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../config/actions";

function Logout() {
  const dispatch = useDispatch();
  const { loggingOut } = useSelector((state) => state.auth);

  const handleLogoutUser = () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <NavDropdown.Item
      onClick={handleLogoutUser}
      className="text-danger fw-bold text-uppercase text-sm py-3 px-2"
    >
      {loggingOut ? (
        <Spinner animation="border" size="sm" className="me-2" />
      ) : (
        <FaSignOutAlt className="me-1" />
      )}
      Sign out
    </NavDropdown.Item>
  );
}

export default Logout;
