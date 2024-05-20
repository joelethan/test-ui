import PropTypes, { any, array } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

// Function to check if any of the user's permissions match the allowed permissions
const hasPermission = (userPermissions, allowedPermissions) => {
  return allowedPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

// HasAccess - Wrapper component for authorization
function HasAccess({ allowedPermissions, children }) {
  const {
    authUser: { permissions: userPermissions },
  } = useSelector((state) => state.auth);

  // allowedPermissions.push("");
  const isAuthorized = hasPermission(
    userPermissions.map((userP) => userP.permission.metadata_value),
    [...allowedPermissions, "IS SUPER ADMIN"]
  );

  // Clone the children components and pass the isAuthorized prop to them
  const clonedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isAuthorized });
  });

  return <>{clonedChildren}</>;
}

HasAccess.defaultProps = {
  allowedPermissions: [],
};

HasAccess.propTypes = {
  allowedPermissions: PropTypes.oneOfType([array]),
  children: PropTypes.oneOfType([any]).isRequired,
};

export default HasAccess;
