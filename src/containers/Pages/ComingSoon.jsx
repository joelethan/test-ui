import React from "react";
import { Card } from "react-bootstrap";
import { DataNotFound } from "../../components/common";

function ComingSoon() {
  return (
    <Card className="border-0 d-flex h-100 text-center">
      <DataNotFound
        message="SORRY, THIS MODULE IS STILL UNDER DEVELOPMENT..."
        className="text-center fs-3"
      />
    </Card>
  );
}

export default ComingSoon;
