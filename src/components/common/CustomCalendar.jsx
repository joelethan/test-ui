import { Calendar, theme } from "antd";
import React from "react";

function CustomCalendar(props) {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} {...props} />
    </div>
  );
}

export default CustomCalendar;
