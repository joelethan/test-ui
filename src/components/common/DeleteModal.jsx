import { isEmpty, isFunction } from "lodash";
import PropTypes, { any } from "prop-types";
import React from "react";
import { ButtonGroup, Modal, ModalBody } from "react-bootstrap";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaWindowClose,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "../../config/actions";
import SubmitButton from "./SubmitButton";

function DeleteModal({
  handleConfirm,
  disableSubmit,
  deleting,
  itemName,
  showDelete,
  closeDelete,
  deleteError,
  loadingText,
  customTitle,
  children,
}) {
  const dispatch = useDispatch();
  const { showDeleteModal, deleteData } = useSelector((state) => state.setting);

  const onClickConfirm = () => {
    handleConfirm(deleteData);
  };

  const handleClose = () => {
    if (!isFunction(closeDelete)) {
      dispatch(settingActions.showDeleteModal(false));
    } else {
      closeDelete();
    }
  };

  return (
    <Modal
      size="md"
      show={showDelete !== null ? showDelete : showDeleteModal}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="rounded"
      contentClassName="rounded"
    >
      <ModalBody className="text-center p-4 ">
        <div>
          {deleting ? (
            <div className="text-muted fs-6 fw-bolder my-4">{loadingText}</div>
          ) : (
            <span className="text-danger text-sm fw-bold text-uppercase">
              {!isEmpty(deleteError) ? (
                <div className="text-danger fs-6 fw-bold my-4">
                  {deleteError}
                </div>
              ) : (
                <div className="fw-bold d-block">
                  <div>
                    <FaExclamationTriangle
                      size="4rem"
                      className="mb-3 text-center"
                    />
                  </div>
                  <Modal.Title className="fs-6 text-muted fw-bold">
                    {customTitle || `YOU ARE ABOUT TO DELETE THIS ${itemName}`}
                  </Modal.Title>
                  <div className="text-danger fs-6 fw-bolder my-4">
                    Are you sure you want to proceed?
                  </div>
                </div>
              )}
            </span>
          )}
        </div>
        {children}
        <ButtonGroup size="lg">
          <SubmitButton
            onClick={handleClose}
            type="dashed"
            text="Cancel"
            htmlType="button"
            className="me-4"
            iconBefore={<FaWindowClose className="me-1" />}
          />
          <SubmitButton
            loading={deleting}
            disabled={disableSubmit}
            loadingText="Processing..."
            onClick={onClickConfirm}
            text="YES, PROCEED"
            iconBefore={<FaCheckCircle className="me-2" />}
            danger
          />
        </ButtonGroup>
      </ModalBody>
    </Modal>
  );
}

DeleteModal.defaultProps = {
  deleting: false,
  disableSubmit: false,
  deleteError: null,
  showDelete: null,
  closeDelete: null,
  loadingText: "Deleting in progress...",
  customTitle: null,
  children: null,
};
DeleteModal.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  closeDelete: PropTypes.func,
  children: PropTypes.oneOfType([any]),
  deleting: PropTypes.bool,
  disableSubmit: PropTypes.bool,
  showDelete: PropTypes.bool,
  itemName: PropTypes.string.isRequired,
  deleteError: PropTypes.string,
  loadingText: PropTypes.string,
  customTitle: PropTypes.string,
};

export default DeleteModal;
