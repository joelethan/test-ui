import PropTypes, { any } from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

function CustomModal({
  formTitle,
  children,
  defaultShow,
  onCloseModal,
  size,
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
      centered
      {...props}
    >
      <Modal.Header className="border-bottom bg-primary py-2 text-white">
        <Modal.Title className="fw-bold text-uppercase">
          {formTitle}
        </Modal.Title>

        <div className="card-options">
          <Button
            variant="link"
            onClick={handleClose}
            size="sm"
            className="text-danger bg-white text-uppercase font500"
          >
            <FaTimes />
          </Button>
        </div>
      </Modal.Header>
      {children}
    </Modal>
  );
}

CustomModal.defaultProps = {
  children: null,
  defaultShow: false,
  size: "md",
};

CustomModal.propTypes = {
  formTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([any]),
  defaultShow: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default CustomModal;
