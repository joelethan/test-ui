import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import PropTypes, { array, object } from "prop-types";
import React from "react";
import { FaEye, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

function ActionButtons({
  row,
  loading,
  openDeletePopup,
  handleAddItem,
  handleView,
  handleAddAllocation,
  handleAddInst,
  permissions,
  ...props
}) {
  return (
    <Dropdown.Button
      menu={{
        items: [
          {
            key: 0,
            label: "View Details",
            icon: <FaEye className="me-1" />,
            onClick: () => handleView(row),
            className: "fw-bold text-uppercase bg-light",
          },
          {
            key: 1,
            label: "Add Institution",
            icon: <FaPlusCircle className="me-1" />,
            onClick: () => handleAddInst(row),
            className: "fw-bold text-uppercase bg-light",
          },
          {
            key: 2,
            label: "Add Allocation",
            icon: <FaPlusCircle className="me-1" />,
            onClick: () => handleAddAllocation(row),
            className: "fw-bold text-uppercase bg-light",
          },
          {
            key: 3,
            label: "Delete Allocation",
            icon: <FaTrashAlt className="me-1" />,
            onClick: () => openDeletePopup(row),
            danger: true,
            hidden: true,
            className: "fw-bold text-uppercase",
          },
        ],
      }}
      trigger={["click"]}
      placement="bottomLeft"
      arrow
      icon={<DownOutlined />}
      loading={loading}
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
  handleAddItem: null,
  handleView: null,
  handleAddAllocation: null,
};

ActionButtons.propTypes = {
  row: PropTypes.oneOfType([object]).isRequired,
  permissions: PropTypes.oneOfType([array]),
  loading: PropTypes.bool.isRequired,
  openDeletePopup: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func,
  handleView: PropTypes.func,
  handleAddAllocation: PropTypes.func,
  handleAddInst: PropTypes.func.isRequired,
};

export default ActionButtons;
