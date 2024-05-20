import { Image } from "antd";
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  AiFillApi,
  AiFillControl,
  AiOutlineInsertRowBelow,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import DefaultLogo from "../../assets/img/coat-of-arms.png";
import { settingActions } from "../../config/actions";
import Logout from "./Logout";
import { hasAccessPermissions } from "./helperFunctions";

function SideBar() {
  const dispatch = useDispatch();
  const { selectedMenu } = useSelector((state) => state.setting);
  const {
    authUser: { permissions: userPermissions },
  } = useSelector((state) => state.auth);

  const setSelectedMenu = (content) => {
    dispatch(settingActions.setSelectedMenu(content));
  };

  const sideMenus = [
    // {
    //   title: "MY PROFILE",
    //   icon: <FaUser className="me-2" />,
    //   action: "my-profile",
    // },
    {
      title: "DASHBOARD",
      icon: <AiOutlineInsertRowBelow className="me-2" />,
      action: "dashboard",
    },
    {
      title: "SH SCHOLAR USERS",
      icon: <FaUsers className="me-2" />,
      action: "state-users",
    },
    {
      title: "INSTITUTIONS",
      icon: <FaMoneyCheckAlt className="me-2" />,
      action: "institutions",
    },
    {
      title: "BENEFICIARIES",
      icon: <FaMoneyCheckAlt className="me-2" />,
      action: "beneficiaries",
    },
    {
      title: "PAYMENTS",
      icon: <FaMoneyCheckAlt className="me-2" />,
      action: "payments",
    },
    {
      title: "INITIAL APPROVALS",
      icon: <AiFillApi className="me-2" />,
      action: "initial-approvals",
      hidden: hasAccessPermissions(userPermissions, [
        "CAN PERFORM FIRST BENEFICIARY APPROVAL",
      ]),
    },
    {
      title: "FINAL APPROVALS",
      icon: <AiFillApi className="me-2" />,
      action: "final-approvals",
      hidden: hasAccessPermissions(userPermissions, [
        "CAN PERFORM FINAL BENEFICIARY APPROVAL",
      ]),
    },
    {
      title: "REPORTS",
      icon: <AiFillControl className="me-2" />,
      action: "system-reports",
    },
    {
      title: "SETTINGS",
      icon: <GiSettingsKnobs className="me-2" />,
      action: "my-settings",
      hidden: false,
    },
  ];

  return (
    <Nav className="col-md-3 col-lg-2 d-none d-md-block bg-white sidebar p-0 border-end">
      <div className="sidebar-sticky">
        <div className="mx-auto text-center border-bottom bg-light pt-4 pb-2">
          <Image
            src={DefaultLogo}
            fallback={DefaultLogo}
            alt="Institution Logo"
            style={{ maxWidth: "100px" }}
            className="text-center"
            preview={false}
            draggable={false}
          />
          <div className="align-centre mt-2 text-sm font500 text-uppercase">
            <div>SH SCHOLAR</div>
          </div>
        </div>
        <Nav variant="pills" fill defaultActiveKey="/" className="p-0 text-sm">
          {sideMenus.map((menu) => {
            if (menu.hidden !== true) {
              return (
                <NavDropdown.Item
                  active={selectedMenu === menu.action}
                  as="button"
                  key={menu.action}
                  onClick={() => setSelectedMenu(menu.action)}
                  className={`${
                    selectedMenu === menu.action
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } rounded-0 text-start fw-bold border-bottom py-3 px-2 text-uppercase w-100`}
                >
                  {menu.icon}
                  {menu.title}
                </NavDropdown.Item>
              );
            }
            return null;
          })}

          <div className="border-bottom w-100">
            <Logout />
          </div>
        </Nav>
      </div>
    </Nav>
  );
}

export default SideBar;
