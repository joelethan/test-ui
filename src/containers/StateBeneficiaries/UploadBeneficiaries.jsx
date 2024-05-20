import { Form } from "antd";
import { every, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage } from "../../components/common";
import FileUploaderContainer from "../../components/common/FileUploaderContainer";
import HasAccess from "../../components/common/HasAccess";
import {
  beneficiaryActions,
  institutionActions,
  metadataActions,
} from "../../config/actions";
import {
  formatMetadata,
  formatStateInstitutions,
} from "../../helpers/dataFormatter";
import BeneficiaryContext from "./BeneficiaryContext";

function UploadBeneficiaries({ results }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { metadata } = useSelector((state) => state.metadata);
  const { stateInstitutions } = useSelector((state) => state.institution);
  const {
    downloadingNonAcmisBeneficiariesTemplate,
    downloadingResultsTemplate,
    beneficiaryContext,
    downloadingNonAcmisPaymentsTemplate,
  } = useSelector((state) => state.beneficiary);

  const [stateInstitutionOptions, setStateInstitutionOptions] = useState([]);
  const [institutionTypeOptions, setInstitutionTypeOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);

  const contextInstType = Form.useWatch("institution_type", form);

  const downloadBeneficiariesTemplate = (e) => {
    e.preventDefault();
    dispatch(beneficiaryActions.downloadNonAcmisBeneficiariesTemplate());
  };
  const uploadBeneficiariesTemplate = (formData, roleId) =>
    dispatch(
      beneficiaryActions.uploadNonAcmisBeneficiariesTemplate(formData, roleId)
    );
  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  useEffect(() => {
    dispatch(
      beneficiaryActions.setCreateBeneficiaryForm("beneficiary-details")
    );
    if (isEmpty(stateInstitutions)) getInstitutions();
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
    if (every(Object.values(beneficiaryContext)))
      form.setFieldsValue(beneficiaryContext);
  }, []);

  useEffect(() => {
    setInstitutionTypeOptions(formatMetadata(metadata, "INSTITUTION TYPES"));
    setAcademicYearOptions(formatMetadata(metadata, "ACADEMIC YEARS"));
  }, [metadata]);

  useEffect(() => {
    setStateInstitutionOptions(
      formatStateInstitutions(
        stateInstitutions.filter(
          (d) =>
            parseInt(d.institutionType.id, 10) === parseInt(contextInstType, 10)
        )
      )
    );
    if (
      parseInt(contextInstType, 10) !==
      parseInt(beneficiaryContext.institution_type, 10)
    ) {
      form.resetFields(["institution_id"]);
    } else {
      form.setFieldsValue(beneficiaryContext);
    }
  }, [stateInstitutions, contextInstType]);

  const downloadPaymentsTemplate = (e) => {
    e.preventDefault();
    dispatch(beneficiaryActions.downloadNonAcmisPaymentsTemplate());
  };
  const uploadPaymentsTemplate = (formData, roleId) =>
    dispatch(
      beneficiaryActions.uploadNonAcmisPaymentsTemplate(formData, roleId)
    );

  const downloadResultsTemplate = (e) => {
    e.preventDefault();
    if (every(Object.values(Object.fromEntries(
      Object.entries(beneficiaryContext).
      filter(([key]) => key!=="payment_cycle_id")))))
      dispatch(beneficiaryActions.downloadResultsTemplate(beneficiaryContext));
  };
  const uploadResultsTemplate = (formData, roleId) =>
    dispatch(beneficiaryActions.uploadResultsTemplate(formData, roleId));

  return (
    <Row className="row-deck" style={{ paddingTop: "20px", margin: "0px" }}>
      {!results && (
        <>
          <Col md={6} style={{ padding: "0px 0px 0px 10.5px" }}>
            <Card>
              <Card.Header className="fw-bold text-uppercase bg-upload_info py-3">
                <div className="mx-auto">Add Beneficiaries</div>
              </Card.Header>
              <HasAccess allowedPermissions={["CAN CREATE BENEFICIARIES"]}>
                <FileUploaderContainer
                  uploadText="Support for a single file upload. Strictly for upload of Non-ACMIS Beneficiaries"
                  downloadTemplate={downloadBeneficiariesTemplate}
                  uploadTemplate={uploadBeneficiariesTemplate}
                  downloadText="Beneficiaries Template"
                  loading={downloadingNonAcmisBeneficiariesTemplate}
                />
              </HasAccess>
            </Card>
          </Col>
          <Col md={6} style={{ padding: "0px 10.5px 0px 0px" }}>
            <Card>
              <Card.Header className="fw-bold text-uppercase bg-upload_info py-3">
                <div className="mx-auto">Add Payments</div>
              </Card.Header>
              <HasAccess allowedPermissions={["CAN ADD PAYMENTS"]}>
                <FileUploaderContainer
                  uploadText="Support for a single file upload. Strictly for upload of Non-ACMIS Payments"
                  downloadTemplate={downloadPaymentsTemplate}
                  uploadTemplate={uploadPaymentsTemplate}
                  downloadText="Payments Template"
                  loading={downloadingNonAcmisPaymentsTemplate}
                />
              </HasAccess>
            </Card>
          </Col>
        </>
      )}
      {results && (
        <>
          {(!every(Object.values(Object.fromEntries(
            Object.entries(beneficiaryContext).
            filter(([key]) => key!=="payment_cycle_id")))) ||
            isEmpty(beneficiaryContext)) && (
            <Col>
              <Card className="mb-0">
                <AlertMessage
                  className="text-center border-0 mb-0"
                  message="SET CONTEXT TO DOWNLOAD TEMPLATE"
                  type="error"
                />
              </Card>
            </Col>
          )}
          <Col md={12}>
            <BeneficiaryContext
              institutionTypeOptions={institutionTypeOptions}
              stateInstitutionOptions={stateInstitutionOptions}
              academicYearOptions={academicYearOptions}
              form={form}
              context="upload-results"
            />
          </Col>
          <Col md={12} style={{ padding: "0px 0px 0px 10.5px" }}>
            <Card>
              <Card.Header className="fw-bold text-uppercase bg-upload_info py-3">
                <div className="mx-auto">Add Beneficiary Results</div>
              </Card.Header>
              <HasAccess allowedPermissions={["CAN UPLOAD RESULTS"]}>
                <FileUploaderContainer
                  uploadText="Support for a single file upload. Strictly for upload of Non-ACMIS Beneficiary Results"
                  downloadTemplate={downloadResultsTemplate}
                  uploadTemplate={uploadResultsTemplate}
                  downloadText="Results Template"
                  loading={downloadingResultsTemplate}
                />
              </HasAccess>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}

UploadBeneficiaries.defaultProps = {
  results: false,
};

UploadBeneficiaries.propTypes = {
  results: PropTypes.bool,
};

export default UploadBeneficiaries;
