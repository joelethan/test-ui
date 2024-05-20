import { isFunction } from "lodash";
import PropTypes, { any, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import SubmitButton from "./SubmitButton";

function FormModal({
  formTitle,
  children,
  defaultShow,
  onCloseModal,
  size,
  handleSubmit,
  submitButtonProps,
  footerExtras,
  ...props
}) {
  const [show, setShow] = useState(defaultShow);

  const handleClose = () => {
    setShow(false);
    onCloseModal();
  };

  useEffect(() => {
    setShow(defaultShow);
  }, [defaultShow]);

  return (
    <Modal
      size={size}
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      scrollable
      centered
      {...props}
    >
      <Modal.Header className="bg-primary text-white py-2 text-uppercase">
        <Modal.Title className="fs-6 fw-bold"> {formTitle}</Modal.Title>
        <div className="card-options">
          <Button
            variant="link"
            onClick={handleClose}
            size="sm"
            className="text-danger bg-white text-uppercase fw-bold"
          >
            <FaTimes />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="bg-light py-2">
        <SubmitButton
          variant="danger"
          type="button"
          text="CLOSE"
          onClick={onCloseModal}
        />
        {isFunction(handleSubmit) && (
          <SubmitButton onClick={handleSubmit} {...submitButtonProps} />
        )}
        {footerExtras && footerExtras}
      </Modal.Footer>
    </Modal>
  );
}

FormModal.defaultProps = {
  children: null,
  defaultShow: false,
  size: "md",
  handleSubmit: null,
  submitButtonProps: {},
  footerExtras: null,
};

FormModal.propTypes = {
  formTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([any]),
  defaultShow: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  size: PropTypes.string,
  submitButtonProps: PropTypes.oneOfType([object]),
  footerExtras: PropTypes.element,
};

export default FormModal;
