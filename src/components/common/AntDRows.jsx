/* eslint-disable react/no-array-index-key */
import { isEmpty, reverse } from "lodash";
import PropTypes, { array, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { institutionActions, metadataActions } from "../../config/actions";
import { boolOptions } from "../../containers/constants";
import {
  formatMetadata,
  formatStateInstitutions,
  formatStudyClasses,
  formatSupportItems,
} from "../../helpers/dataFormatter";
import AntDInputText from "./AntDInputText";
import SubmitButton from "./SubmitButton";

function AntDRows({
  fields,
  context,
  rows,
  setRows,
  uploadProps,
  col,
  disableObj,
  rowDetails,
  ...props
}) {
  const dispatch = useDispatch();
  const { instId } = props;
 
  const {
    stateInstitutions,
    getSupportItemSuccess,
    getStudyClassesSuccess
  } = useSelector((state) => state.institution);

  const [rolesOptions, setRolesOptions] = useState([]);
  const [studyLevel, setStudyLevel] = useState([]);
  const [instTYpesOptions, setInstTYpesOptions] = useState([]);
  const [studyClassOptions, setStudyClassOptions] = useState([])
  const [programmeType, setProgrammeType] = useState([]);
  const [directiveOptions, setDirectiveOptions] = useState([]);
  const { metadata } = useSelector((state) => state.metadata);
  const [rowsArray, setRowsArray] = useState([...Array(rows).fill("")]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [supportItemOptions, setSupportItemOptions] = useState([]);
  const [stateInstitutionOptions, setStateInstitutionOptions] = useState([]);
  const { currentInst, currentInstType } = useSelector((state) => state.auth);
  const onRemove = (index) => {
    setRowsArray(
      rowsArray.filter((item, i) => {
        return i !== index;
      })
    );
    setRows((prev) => prev - 1);
  };

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
  }, []);

  useEffect(() => {
    setAcademicYearOptions(formatMetadata(metadata, "ACADEMIC YEARS"));
    setRolesOptions(formatMetadata(metadata, "ROLES"));
    setDirectiveOptions(formatMetadata(metadata, "DIRECTIVE BY"));
    setStudyLevel(formatMetadata(metadata, "STUDY LEVELS"));
    setProgrammeType(formatMetadata(metadata, "PROGRAMME TYPE"));
    setInstTYpesOptions(formatMetadata(metadata, "INSTITUTION TYPES"));
  }, [metadata]);

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  useEffect(() => {
    if (isEmpty(getSupportItemSuccess))
      dispatch(institutionActions.getSupportItems());
    if (isEmpty(getStudyClassesSuccess))
      dispatch(institutionActions.getStudyClasses());
    if (isEmpty(stateInstitutions)) getInstitutions();
  }, []);

  useEffect(() => {
    setStateInstitutionOptions(
      formatStateInstitutions(
        stateInstitutions.filter(
          (d) =>
            parseInt(d.institutionType.id, 10) === parseInt(currentInstType, 10)
        )
      )
    );
  }, [stateInstitutions, currentInstType]);

  useEffect(() => {
    setSupportItemOptions(
      formatSupportItems(
        getSupportItemSuccess.filter(
          (i) => parseInt(i.institution_id, 10) === parseInt(instId, 10)
        )
      )
    );
    setStudyClassOptions(
      formatStudyClasses(
        getStudyClassesSuccess.filter(
          (i) => parseInt(i.institution_id, 10) === parseInt(instId, 10)
        )
      )
    );
  }, [getSupportItemSuccess, getStudyClassesSuccess, instId]);

  const options = (fieldName, _default) => {
    if (fieldName === "academic_year_id") {
      return academicYearOptions;
    }
    if (fieldName === "role_id") {
      return rolesOptions;
    }
    if (
      ["institutions", "institution_id", "pay_institution_id"].includes(
        fieldName
      )
    ) {
      return stateInstitutionOptions;
    }
    if (fieldName === "support_item_id") {
      return supportItemOptions;
    }
    if (["institution_type_id", "all_institution_type"].includes(fieldName)) {
      return instTYpesOptions;
    }
    if (fieldName === "directive_by_id") {
      return reverse(directiveOptions);
    }
    if (fieldName === "study_level_id") {
      return studyLevel;
    }
    if (fieldName === "programme_type_id") {
      return programmeType;
    }
    if (fieldName === "is_admin") {
      return boolOptions;
    }
    if (["class_or_year_id", "class"].includes(fieldName)) {
      return studyClassOptions;
    }
    return _default;
  };

  return (
    <Row>
      {rowsArray.map((_, index) => {
        return (
          <div key={index}>
            <Col md={12 - col}>
              {rowDetails === "payments" ? (
                <Row>
                  {fields.map((field) => {
                    return (
                      <Col key={field.name}>
                        <AntDInputText
                          context={context}
                          key={field.name}
                          label={field.label}
                          name={`${field.name}+${index}`}
                          rules={field.rules}
                          itemAttributes={field.itemAttributes}
                          type={field?.type}
                          options={options(field.name, field?.options)}
                        />
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <Card>
                  <Card.Body>
                    <Row>
                      {fields.map((field) => {
                        const attributes = {
                          ...field.itemAttributes,
                          hidden:
                            [
                              "programme_type_id",
                              "programme_of_study",
                            ].includes(field?.name) &&
                            ["PRIMARY SCHOOL", "SECONDARY SCHOOL"].includes(
                              disableObj[index]
                            ),
                        };
                        const itemAttr =
                          field.name === "pay_institution_id"
                            ? { defaultValue: currentInst.value }
                            : {};
                        return (
                          <Col md={6} key={field.name}>
                            <AntDInputText
                              key={field.name}
                              label={field.label}
                              name={`${field.name}+${index}`}
                              rules={field.rules}
                              itemAttributes={attributes}
                              type={field?.type}
                              options={options(field.name, field?.options)}
                              inputAttributes={{
                                ...field.inputAttributes,
                                ...itemAttr,
                              }}
                              uploadProps={
                                field?.type === "file" ? uploadProps : {}
                              }
                            />
                          </Col>
                        );
                      })}
                      <Col md={5} />
                      <Col md={1}>{rowDetails !== "institutions" && <SubmitButton onClick={onRemove} text="X" danger block />}</Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </div>
        );
      })}
    </Row>
  );
}

AntDRows.defaultProps = {
  fields: [],
  col: 1,
  uploadProps: {},
  disableObj: {},
  rowDetails: "payments",
  instId: null,
  context: false,
  setRows: () => {},
};

AntDRows.propTypes = {
  fields: PropTypes.oneOfType([array]),
  rows: PropTypes.number.isRequired,
  col: PropTypes.number,
  uploadProps: PropTypes.oneOfType([object]),
  disableObj: PropTypes.oneOfType([object]),
  rowDetails: PropTypes.string,
  instId: PropTypes.number,
  context: PropTypes.bool,
  setRows: PropTypes.func,
};

export default AntDRows;
