import React from "react";
import { useSelector } from "react-redux";
import ChangeDefaultPassword from "./ChangeDefaultPassword";
import ChangeOldPassword from "./ChangeOldPassword";

function ChangePassword() {
  const { authUser } = useSelector((state) => state.auth);

  return authUser.is_default_password === true ? (
    <ChangeDefaultPassword />
  ) : (
    <ChangeOldPassword />
  );
}

export default ChangePassword;
