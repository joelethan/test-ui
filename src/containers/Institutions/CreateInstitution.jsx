import { Form } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertMessage,
  AntDInputText,
  SubmitButton,
} from "../../components/common";
import { institutionActions, metadataActions } from "../../config/actions";
import {
  createInstitution,
  moreCreateInstitution,
} from "../../Forms/institution";
import { formatMetadata } from "../../helpers/dataFormatter";

function CreateInstitution() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [institutionType, setInstitutionType] = useState([]);
  const { metadata } = useSelector((state) => state.metadata);
  const { creatingInstitution, updatingInstitution, createInstitutionError, institutionToEdit } = useSelector(
    (state) => state.institution
  );
  const { institutionsTabView } = useSelector((state) => state.setting);

  const [initialValues] = useState({
    name: institutionToEdit.name,
    code: institutionToEdit.code,
    email: institutionToEdit.email,
    telephone_1: institutionToEdit.telephone_1,
    website: institutionToEdit.website,
    district: institutionToEdit.district,
    address: institutionToEdit.address,
    slogan: institutionToEdit.slogan,
    institution_type_id: institutionToEdit.institutionType?.id,
  });

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());

  }, []);

  useEffect(() => {
    if (!isEmpty(createInstitutionError)) {
      setErrorMessage(
        createInstitutionError?.error?.message ||
          createInstitutionError?.server?.message
      );
    }
  }, [createInstitutionError]);

  useEffect(() => {
    setInstitutionType(formatMetadata(metadata, "INSTITUTION TYPES"));
  }, [metadata]);

  const onSubmitForm = (data) => {
    setErrorMessage(null);
    if (institutionsTabView === 'create-institution') {
      dispatch(institutionActions.createInstitution(data));
    } else {
      dispatch(institutionActions.updateInstitution(institutionToEdit.id, data));
    }
  };

  return (
    <>
      {errorMessage && <AlertMessage message={errorMessage} type="error" />}
      <Form
        onFinish={onSubmitForm}
        key={institutionsTabView}
        initialValues={institutionsTabView === "update-institution" ? initialValues : {}}
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
        <Row>
          <Col md={1} />
          <Col md={5}>
            {createInstitution.map((field) => (
              <AntDInputText
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                itemAttributes={field.itemAttributes}
                type={field?.type}
                options={
                  field?.name === "institution_type_id"
                    ? institutionType
                    : field?.options
                }
                inputAttributes={field.inputAttributes}
              />
            ))}
          </Col>
          <Col md={5}>
            {moreCreateInstitution.map((field) => (
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
          </Col>
          <Col md={1} />
        </Row>

        <div className="text-end mb-3 me-3">
          <SubmitButton
            size="sm"
            text={institutionsTabView.includes("create") ? "CREATE INSTITUTION" : "UPDATE INSTITUTION"}
            loadingText={institutionsTabView.includes("create") ? "creating..." : "updating..."}
            loading={creatingInstitution || updatingInstitution}
            className="text-sm fw-bold mt-3 text-white text-uppercase"
          />
        </div>
      </Form>
    </>
  );
}

export default CreateInstitution;
