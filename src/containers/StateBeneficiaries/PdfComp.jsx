/* eslint-disable import/no-extraneous-dependencies */
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React from "react";

function PdfComp() {
  const docs = [
    {
      uri: "http://127.0.0.1:3437/avatars/beneficiary-photos/directive-STH-WF-000214.pdf",
    },
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
export default PdfComp;
