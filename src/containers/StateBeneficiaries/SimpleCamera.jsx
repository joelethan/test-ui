/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import { FormModal, SubmitButton } from "../../components/common";
import { settingActions } from "../../config/actions";

function SimpleCamera() {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.setting);

  const [numPages, setNumPages] = useState();
  const [pageNumber] = useState(1);
  const [imgUrl, setImgUrl] = useState(null);

  const closeModal = () => dispatch(settingActions.showModal(false));

  const onDocumentLoadSuccess = ({ pages }) => setNumPages(pages);

  const url =
    "http://127.0.0.1:3437/avatars/beneficiary-photos/directive-STH-WF-000214.pdf";

  return (
    <FormModal
      formTitle="Photo Capture."
      defaultShow={showModal}
      onCloseModal={closeModal}
      handleSubmit={null}
      submitButtonProps={null}
    >
      <Row>
        <Col md={12}>
          <Webcam
            width={475}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          >
            {({ getScreenshot }) => (
              <SubmitButton
                block
                text="Capture"
                onClick={() => {
                  setImgUrl(getScreenshot());
                }}
              />
            )}
          </Webcam>
        </Col>
      </Row>
    </FormModal>
  );
}

SimpleCamera.defaultProps = {};

SimpleCamera.propTypes = {};

export default SimpleCamera;
