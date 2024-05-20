import PropTypes, { any, array } from "prop-types";
import React, { Fragment } from "react";
import { Card, Nav } from "react-bootstrap";

function TabMenu({ menus, currentMenu, setCurrentMenu, children, ...props }) {
  return (
    <Nav
      variant="tabs"
      as={Card.Header}
      className="w-100 m-0 pb-0 border-bottom pt-2 text-sm font500 text-uppercase"
      {...props}
    >
      {menus.map((menu) => {
        if (menu.hidden !== true) {
          return (
            <Fragment key={menu.action}>
              <Nav.Item>
                <Nav.Link
                  active={currentMenu === menu.action}
                  onClick={() => setCurrentMenu(menu.action)}
                  disabled={menu.disabled}
                  className="font600 text-sm"
                >
                  {menu.icon && menu.icon}
                  {menu.title}
                </Nav.Link>
              </Nav.Item>
            </Fragment>
          );
        }
        return null;
      })}
      {children}
    </Nav>
  );
}

TabMenu.defaultProps = {
  children: null,
};

TabMenu.propTypes = {
  menus: PropTypes.oneOfType([array]).isRequired,
  children: PropTypes.oneOfType([any]),
  currentMenu: PropTypes.string.isRequired,
  setCurrentMenu: PropTypes.func.isRequired,
};

export default TabMenu;
