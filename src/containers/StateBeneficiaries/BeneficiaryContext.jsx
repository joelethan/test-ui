import { Form } from "antd";
import { every, get } from "lodash";
import PropTypes, { array, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { beneficiaryContextOptions } from "../../Forms/beneficiary";
import { AntDInputText, SubmitButton } from "../../components/common";
import { beneficiaryActions } from "../../config/actions";

function BeneficiaryContext({
  institutionTypeOptions,
  stateInstitutionOptions,
  academicYearOptions,
  paymentCycleOptions,
  form,
  context,
}) {
  const dispatch = useDispatch();

  const resultsInstType = Form.useWatch("institution_type", form);
  const resultsInstId = Form.useWatch("institution_id", form);
  const resultsAcadYrId = Form.useWatch("academic_year_id", form);

  const { beneficiaryContext, gettingContextBeneficiaries } = useSelector(
    (state) => state.beneficiary
  );

  const [contextArray] = useState(() => {
    if (context === "create-beneficiaries") {
      return beneficiaryContextOptions.filter(
        (item) => item.name !== "institution_id"
      );
    }
    return beneficiaryContextOptions.filter(
      (item) => item.name !== "payment_cycle_id"
    );
  });

  useEffect(() => {
    form.setFieldsValue(beneficiaryContext);
  }, []);

  useEffect(() => {
    const resContext = {
      academic_year_id: resultsAcadYrId,
      institution_id:
        resultsInstId || get(beneficiaryContext, "institution_id"),
      institution_type: resultsInstType,
    };
    if (every(Object.values(resContext)) && context === "upload-results") {
      dispatch(
        beneficiaryActions.setBeneficiaryContext({
          ...resContext,
          payment_cycle_id: get(beneficiaryContext, "payment_cycle_id", null),
        })
      );
    }
  }, [resultsInstType, resultsInstId, resultsAcadYrId]);

  useEffect(() => {
    if (
      parseInt(resultsInstType, 10) !==
        parseInt(beneficiaryContext.institution_type, 10) &&
      resultsInstType
    ) {
      form.resetFields(["institution_id"]);
      dispatch(
        beneficiaryActions.setBeneficiaryContext({
          ...beneficiaryContext,
          institution_id: null,
        })
      );
    }
  }, [resultsInstType]);

  const options = (fieldName, _default) => {
    if (fieldName === "institution_type") {
      return institutionTypeOptions;
    }
    if (fieldName === "academic_year_id") {
      return academicYearOptions;
    }
    if (fieldName.endsWith("payment_cycle_id")) {
      return paymentCycleOptions;
    }
    if (fieldName === "institution_id") {
      return stateInstitutionOptions;
    }
    return _default;
  };

  return (
    <Card body className="py-0">
      <Form
        layout="vertical"
        onFinish={(data) => {
          dispatch(
            beneficiaryActions.setBeneficiaryContext({
              ...beneficiaryContext,
              ...data,
            })
          );
          if (context === "create-beneficiaries")
            dispatch(beneficiaryActions.fetchContextBeneficiaries(data));
        }}
        className="w-100"
        form={form}
      >
        <Row>
          {contextArray.map((field) => (
            <Col key={field.name}>
              <AntDInputText
                label={field.label}
                rules={field.rules}
                options={options(field.name, field?.options)}
                name={field.name}
                type="select"
              />
            </Col>
          ))}
          {context !== "upload-results" && (
            <Col className="my-auto">
              <SubmitButton
                block
                className="mt-4"
                loading={gettingContextBeneficiaries}
                loadingText="Loading..."
                text="submit"
              />
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
}

BeneficiaryContext.defaultProps = {
  institutionTypeOptions: [],
  stateInstitutionOptions: [],
  academicYearOptions: [],
  paymentCycleOptions: [],
  form: {},
  context: "create-beneficiaries",
};

BeneficiaryContext.propTypes = {
  institutionTypeOptions: PropTypes.oneOfType([array]),
  stateInstitutionOptions: PropTypes.oneOfType([array]),
  academicYearOptions: PropTypes.oneOfType([array]),
  paymentCycleOptions: PropTypes.oneOfType([array]),
  context: PropTypes.string,
  form: PropTypes.oneOfType([object]),
};

export default BeneficiaryContext;
