import { Form } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AntDInputText, SubmitButton } from "../../../components/common";
import CustomModal from "../../../components/common/CustomModal";
import { metadataActions, settingActions } from "../../../config/actions";
import { createMetadata } from "../../../Forms/metadata";

function CreateMetadata() {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.setting);
  const { creating } = useSelector((state) => state.metadata);
  const openFormModal = () => dispatch(settingActions.showModal(false));

  const onSubmit = (data) => dispatch(metadataActions.createMetadata(data));

  return (
    <CustomModal
      defaultShow={showModal}
      formTitle="Create metadata"
      dialogClassName="modal-40w"
      onCloseModal={openFormModal}
      backdrop="static"
    >
      <Row>
        <Col md={1} />
        <Col>
          <Form
            onFinish={onSubmit}
            labelCol={{
              span: 8,
              className: "text-sm",
            }}
            labelAlign="left"
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
            className="mt-2"
          >
            {createMetadata.map((field) => (
              <AntDInputText
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                itemAttributes={field.itemAttributes}
                type={field?.type}
                options={field?.options}
                inputAttributes={field.inputAttributes}
              />
            ))}
            <div className="text-end mb-3">
              <SubmitButton
                size="sm"
                text="Add Metadata"
                loadingText="creating..."
                loading={creating}
                className="text-sm fw-bold mt-3 text-white text-uppercase"
              />
            </div>
          </Form>
        </Col>
        <Col md={1} />
      </Row>
    </CustomModal>
  );
}

export default CreateMetadata;
