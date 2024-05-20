import { Form } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchBeneficiary } from "../../Forms/beneficiary";
import {
  AntDInputText,
  DataNotFound,
  DataSpinner,
  SubmitButton,
} from "../../components/common";
import { beneficiaryActions } from "../../config/actions";
import BeneficiaryBioData from "./BeneficiaryBioData";

function SearchNonAcmisBeneficiaries() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    searchValidationErrors,
    searchingSystemBeneficiary,
    searchedSystemBeneficiary,
    searchParam,
  } = useSelector((state) => state.beneficiary);

  const onSubmit = (data) => {
    dispatch(beneficiaryActions.searchNonAcmisBeneficiary(data));
    dispatch(beneficiaryActions.searchSearchError([]));
  };

  const onFinishFailed = ({ errorFields }) => {
    dispatch(beneficiaryActions.searchSearchError(errorFields));
  };

  useEffect(() => {
    dispatch(beneficiaryActions.searchSearchError([]));
  }, []);

  return (
    <div>
      <Card.Header className="py-3 d-block bg-white">
        <Form
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          initialValues={searchParam}
          className="w-100"
          form={form}
        >
          <Row>
            <Col />
            {searchBeneficiary.map((field) => (
              <Col md={4} key={field.name} className="mt-3">
                <AntDInputText
                  rules={field.rules}
                  name={field.name}
                  inputAttributes={field.inputAttributes}
                />
              </Col>
            ))}
            <Col className="my-auto">
              <SubmitButton
                block
                className={`${
                  isEmpty(searchValidationErrors) ? "mt-2" : "mb-3"
                }`}
                loading={searchingSystemBeneficiary}
                loadingText="Loading..."
                text="submit"
              />
            </Col>
            <Col />
          </Row>
        </Form>
      </Card.Header>
      {isEmpty(searchedSystemBeneficiary) && !searchingSystemBeneficiary && (
        <DataNotFound message="Load a Beneficiary to view Details" />
      )}
      {isEmpty(searchedSystemBeneficiary) && searchingSystemBeneficiary && (
        <DataSpinner text="Loading Beneficiary Details" />
      )}
      {!isEmpty(searchedSystemBeneficiary) && <BeneficiaryBioData />}
    </div>
  );
}

export default SearchNonAcmisBeneficiaries;
