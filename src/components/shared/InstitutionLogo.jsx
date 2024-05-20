import { Image } from "antd";
import React from "react";
import DefaultLogo from "../../assets/img/coat-of-arms.png";

function InstitutionLogo() {
  return (
    <div className="text-centre">
      <div className="mx-auto text-center">
        <Image
          src={DefaultLogo}
          fallback={DefaultLogo}
          alt="Institution Logo"
          className="text-center mb-3"
          style={{ maxHeight: "200px", maxWidth: "180px" }}
          preview={false}
          draggable={false}
        />
        <div className="align-centre mt-2 h6 font500 text-uppercase mb-4">
          <div>SH SCHOLAR UGANDA</div>
        </div>
      </div>
    </div>
  );
}

export default InstitutionLogo;
