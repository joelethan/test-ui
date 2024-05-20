import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaReplyAll } from "react-icons/fa";
import { useNavigate } from "react-router";
import { DataNotFound } from "../../components/common";
import routePaths from "../../config/routes/routePaths";

function PageNotFound() {
  const navigate = useNavigate();

  const navigateHome = navigate(routePaths.dashboard.path, { replace: true });

  useEffect(() => {
    setTimeout(() => navigateHome());
  }, []);

  return (
    <div className="d-flex vh-100" style={{ overflow: "hidden" }}>
      <div className="mx-auto my-auto p-4 text-center">
        <DataNotFound
          message="404 - The Page you are trying to access Does not Exist"
          className="fw-bold tex-sm"
        />

        <Button
          className="fw-bold text-sm"
          size="sm"
          variant="link"
          onClick={navigateHome}
        >
          <FaReplyAll className="me-2" /> GO TO ADMISSIONS
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
