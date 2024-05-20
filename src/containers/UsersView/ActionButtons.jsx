import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import PropTypes, { array, object } from "prop-types";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function ActionButtons({
  row,
  deleting,
  openDeletePopup,
  handleEditClick,
  permissions,
  ...props
}) {
  return (
    <Dropdown.Button
      menu={{
        items: [
          {
            key: 0,
            label: "View",
            icon: <FaPencilAlt className="me-1" />,
            onClick: () => handleEditClick(row),
            className: "fw-bold text-uppercase",
          },
          {
            key: 1,
            label: "Delete",
            icon: <FaTrashAlt className="me-1" />,
            onClick: () => openDeletePopup(row),
            danger: true,
            hidden: true,
            className: "fw-bold text-uppercase",
          },
        ],
      }}
      trigger={["click"]}
      placement="topRight"
      arrow
      icon={<DownOutlined />}
      loading={deleting}
      size="small"
      className="text-sm fw-bold"
      style={{ fontWeight: "bold !important" }}
      type="primary"
      {...props}
    >
      ACTION
    </Dropdown.Button>
  );
}

ActionButtons.defaultProps = {
  permissions: [],
};

ActionButtons.propTypes = {
  row: PropTypes.oneOfType([object]).isRequired,
  permissions: PropTypes.oneOfType([array]),
  deleting: PropTypes.bool.isRequired,
  openDeletePopup: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default ActionButtons;
