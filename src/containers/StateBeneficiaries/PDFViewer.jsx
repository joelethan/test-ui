/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Document } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../components/common";
import { settingActions } from "../../config/actions";
import pdf from "./test/bio.pdf";

function PDFViewer({ formTitle }) {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.setting);

  const [numPages, setNumPages] = useState();
  const [pageNumber] = useState(1);

  const closeModal = () => dispatch(settingActions.showModal(false));

  const onDocumentLoadSuccess = ({ pages }) => setNumPages(pages);

  const url =
    "http://127.0.0.1:3437/avatars/beneficiary-photos/directive-STH-WF-000214.pdf";

  return (
    <FormModal
      formTitle={formTitle}
      defaultShow={showModal}
      onCloseModal={closeModal}
      width={1000}
      handleSubmit={null}
      submitButtonProps={null}
      dialogClassName="modal-70w"
    >
      <div>
        <Document file={pdf}>{/* <Page pageNumber={pageNumber} /> */}</Document>
        {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
      </div>
      {/* <div>
        <iframe src={url} width="100%" height="500px" />
      </div> */}
    </FormModal>
  );
}

PDFViewer.defaultProps = {
  formTitle: "",
};

PDFViewer.propTypes = {
  formTitle: PropTypes.string,
};

export default PDFViewer;
