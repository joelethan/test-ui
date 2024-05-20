import { Image } from "antd";
import PropTypes, { object } from "prop-types";
import React from "react";
import DefaultAvatar from "../../assets/img/avatar.png";

function UserAvatar({ student, ...props }) {
  const studentPhoto = `${process.env.REACT_APP_BIO_DATA_FILES_URL}/${student?.avatar}`;

  return (
    <Image
      src={studentPhoto}
      className="mx-auto border bg-white"
      fallback={DefaultAvatar}
      height="120px"
      width="120px"
      {...props}
    />
  );
}

UserAvatar.propTypes = {
  student: PropTypes.oneOfType([object]).isRequired,
};

export default UserAvatar;
