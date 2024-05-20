import { Form, Tag } from "antd";
import { get, isEmpty, toLower, toUpper } from "lodash";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  acmisPaymentsOptions,
  createBeneficiary,
  moreCreateBeneficiary,
  taxCodeOptions,
} from "../../Forms/beneficiary";
import {
  AlertMessage,
  AntDInputText,
  DataNotFound,
  DataSpinner,
  SubmitButton,
} from "../../components/common";
import AntDRows from "../../components/common/AntDRows";
import AntDTable from "../../components/common/AntDTable";
import {
  beneficiaryActions,
  metadataActions,
  settingActions,
} from "../../config/actions";
import {
  formatInstitutionsCode,
  formatMetadata,
  removeEmptyOrNullObject,
} from "../../helpers/dataFormatter";
import { acmisInstitutionOptions, acmisSearchByOptions } from "../constants";
import BeneficiaryModal from "./BeneficiaryModal";
import darkHeader from "../../helpers/dataTableCustomStyle";

function AcmisBeneficiaries() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userTitleOptions, setUserTitleOptions] = useState([]);
  const [contextArray, setContextArray] = useState([]);
  const [setSelectedIDs] = useState([]);
  const [rows, setRows] = useState(1);
  const {
    taxCodeContext: { code, acadYr, student, searchParam },
  } = useSelector((state) => state.beneficiary);
  const { metadata } = useSelector((state) => state.metadata);
  const { acmisBeneficiaryView, acmisSearchParam } = useSelector(
    (state) => state.setting
  );
  const {
    acmisBeneficiaries,
    gettingAcmisSearchedBeneficiaries,
    gettingTaxHeadBeneficiaries,
    taxHeadBeneficiaries,
    acmisSearchedBeneficiaries,
    creatingAcmisBeneficiary,
    gettingAcmisBeneficiaries,
    createAcmisBeneficiaryError,
    showBeneficiaryModal,
    selectedBeneficiary,
  } = useSelector((state) => state.beneficiary);

  const searchBy = Form.useWatch("searchBy", form);

  useEffect(() => {
    form.setFieldsValue({
      institutionId: code,
      searchBy: acmisSearchParam,
      academicYearId: acadYr,
      student,
    });
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
    dispatch(settingActions.setAcisBeneficiaryView("beneficiary-view"));
  }, []);

  useEffect(() => {
    if (!isEmpty(createAcmisBeneficiaryError)) {
      setErrorMessage(
        createAcmisBeneficiaryError?.error?.message ||
          createAcmisBeneficiaryError?.server?.message
      );
    }
  }, [createAcmisBeneficiaryError]);

  useEffect(() => {
    if (searchBy) dispatch(settingActions.setAcisSearchParam(searchBy));
    setContextArray(() => {
      if (searchBy === "entry-academic-year") {
        return taxCodeOptions.filter((item) => item.name !== "student");
      }
      return taxCodeOptions.filter((item) => item.name !== "academicYearId");
    });
  }, [searchBy]);

  const formatTaxHeadBeneficiaries = (data) => {
    const displayData = [];
    Object.values(data).map((item) => {
      return item.forEach((element) => {
        displayData.push(...element.records);
      });
    });
    return displayData;
  };

  useEffect(() => {
    setUserTitleOptions(formatMetadata(metadata, "SALUTATIONS"));
    setAcademicYearOptions(
      formatMetadata(metadata, "ACADEMIC YEARS", "metadata_value")
    );
  }, [metadata]);

  const onSubmitForm = (data) => {
    setErrorMessage(null);

    const acadYrs = Object.keys(data)
      .filter((v) => v.startsWith("academic_year_id"))
      .map((e) => data[e]);

    const payments = [];
    acadYrs.map((_, i) => {
      payments.push({
        academic_year_id: data[`academic_year_id+${i}`],
        amount_paid: data[`amount_paid+${i}`],
      });
      return payments;
    });
    const dataToSend = {
      tax_head_code: data.tax_head_code,
      student_number: data.student_number,
      registration_number: data.registration_number,
      guardians: [
        {
          salutation_id: data.salutation_id,
          surname: data.surname,
          other_names: data.other_names,
          relationship: data.relationship,
          nationality: data.nationality,
          date_of_birth: data.date_of_birth,
        },
      ],
      payments,
    };
    dispatch(
      beneficiaryActions.fetchAcmisStudent(removeEmptyOrNullObject(dataToSend))
    );
  };

  const options = (fieldName, _default) => {
    if (fieldName === "institutionId") {
      return acmisInstitutionOptions;
    }
    if (fieldName === "academicYearId") {
      return academicYearOptions;
    }
    if (fieldName === "searchBy") {
      return acmisSearchByOptions;
    }
    return _default;
  };

  const columns = [
    {
      title: "NAME",
      fixed: "left",
      render: (text, row) => (
        <>
          {toUpper(`${row.acmis_data.surname} ${row.acmis_data.other_names}`)}
        </>
      ),
      width: 150,
    },
    {
      title: "EMAIL",
      render: (text, row) => <>{toLower(`${row.acmis_data.email}`)}</>,
      width: 200,
    },
    {
      title: "REG. NUMBER",
      render: (text, row) => (
        <>{toUpper(`${row.acmis_data.registration_number}`)}</>
      ),
      width: 100,
    },
    {
      title: "STD NUMBER",
      render: (text, row) => (
        <>{toUpper(`${row.acmis_data.student_number}`)}</>
      ),
      width: 100,
    },
    {
      title: "AMOUNT",
      render: (text, row) => {
        const amount = row.state_house_data.payments.find(
          (payment) => payment.academic_year_id === row.academic_year_id
        );
        return (
          <>{`${parseInt(amount?.amount_paid, 10).toLocaleString()} UGX`}</>
        );
      },
      width: 100,
    },
    {
      title: "AMOUNT APPROVAL",
      render: (text, row) => {
        const amount = row.state_house_data.payments.find(
          (payment) => payment.academic_year_id === row.academic_year_id
        );
        return (
          <Tag
            color={
              amount?.create_approval_status === "PENDING" ? "error" : "success"
            }
          >
            {amount?.create_approval_status}
          </Tag>
        );
      },
      width: 150,
    },
    {
      title: "NATIONALITY",
      render: (text, row) => (
        <>{toUpper(`${row.acmis_data.nationality}`)}</>
      ),
      width: 100,
    },
    {
      title: "PROGRAMME COURSE",
      render: (text, row) => (
        <>{toUpper(`${row.acmis_data.programme_title}`)}</>
      ),
      width: 180,
    },
    {
      title: "CAMPUS",
      render: (text, row) => <>{toUpper(`${row.acmis_data.campus}`)}</>,
      width: 100,
    },
  ];

  const taxColumns = [
    {
      title: "NAME",
      fixed: "left",
      render: (text, row) => {
        const {
          student_bio_data: { surname: _surname, other_names: others },
        } = row;
        const surname = get(row, "student_bio_data.student.surname", _surname);
        const otherNames = get(
          row,
          "student_bio_data.student.other_names",
          others
        );
        return <>{toUpper(`${surname} ${otherNames}`)}</>;
      },
      width: 120,
    },
    {
      title: "EMAIL",
      render: (text, row) => {
        const {
          student_bio_data: { email: _email },
        } = row;
        const email = get(row, "student_bio_data.student.email", _email);
        return <div className="italic text-xs">{`${email}`}</div>;
      },
      width: 150,
    },
    {
      title: "CONTACT",
      render: (text, row) => {
        const {
          student_bio_data: { phone: _phone },
        } = row;
        const phone = get(row, "student_bio_data.student.phone", _phone);
        return <>{`${phone}`}</>;
      },
      width: 80,
    },
    {
      title: "REG. NUMBER",
      render: (text, row) => {
        const {
          student_bio_data: { registration_number: _reg },
        } = row;
        const reg = get(
          row,
          "student_bio_data.student.registration_number",
          _reg
        );
        return <>{`${reg}`}</>;
      },
      width: 80,
    },
    {
      title: "STUDENT PROGRAMME",
      render: (text, row) => {
        const {
          student_bio_data: { programme_title: _prog },
        } = row;
        const prog = get(
          row,
          "student_bio_data.programme.programme_title",
          _prog
        );
        return <>{`${prog}`}</>;
      },
      width: 200,
    },
    {
      title: "OPTIONS",
      fixed: "right",
      render: (text, row) => {
        return (
          <SubmitButton
            text="View Details"
            onClick={() => {
              dispatch(beneficiaryActions.setSelectedBeneficiary(row));
              dispatch(beneficiaryActions.setShowBeneficiaryModal(true));
            }}
          />
        );
      },
      width: 50,
    },
  ];

  const handleChange = ({ _rows }) =>
    setSelectedIDs(_rows.map((row) => row.id));

  return (
    <>
      {errorMessage && <AlertMessage message={errorMessage} type="error" />}
      <Card.Body>
        <Form
          layout="vertical"
          onFinish={({
            academicYearId,
            institutionId,
            searchBy: search,
            student: studentParam,
          }) => {
            if (search === "entry-academic-year") {
              dispatch(
                beneficiaryActions.getTaxCodeAcadYrBeneficiaries(
                  institutionId,
                  academicYearId,
                  student,
                  search
                )
              );
            } else {
              dispatch(
                beneficiaryActions.getAcmisSearchBeneficiaries(
                  institutionId,
                  studentParam,
                  acadYr,
                  search
                )
              );
            }
          }}
          className="w-100 my-3"
          form={form}
        >
          <Row>
            <Col />
            {contextArray.map((field) => (
              <Col md={3} key={field.name}>
                <AntDInputText
                  label={field.label}
                  rules={field.rules}
                  options={options(field.name, field?.options)}
                  name={field.name}
                  type={field.type}
                />
              </Col>
            ))}
            <Col className="my-auto">
              <SubmitButton
                block
                className="mt-4"
                loading={
                  gettingTaxHeadBeneficiaries ||
                  gettingAcmisSearchedBeneficiaries
                }
                loadingText="Loading..."
                text="submit"
              />
            </Col>
            <Col />
          </Row>
        </Form>

        {isEmpty(acmisSearchedBeneficiaries) &&
          isEmpty(taxHeadBeneficiaries) &&
          (gettingAcmisSearchedBeneficiaries || gettingTaxHeadBeneficiaries) &&
          acmisBeneficiaryView === "beneficiary-view" && <DataSpinner />}

        {isEmpty(acmisSearchedBeneficiaries) &&
          isEmpty(taxHeadBeneficiaries) &&
          !gettingAcmisSearchedBeneficiaries &&
          !gettingTaxHeadBeneficiaries &&
          acmisBeneficiaryView === "beneficiary-view" && <DataNotFound />}

          {/* Table For Acmis Beneficiaries */}
        {(!isEmpty(acmisSearchedBeneficiaries) ||
          !isEmpty(taxHeadBeneficiaries)) && (
          <AntDTable
            columns={taxColumns}
            data={
              searchParam === "student-details"
                ? acmisSearchedBeneficiaries
                : taxHeadBeneficiaries[0].sponsees
            }
            virtualized
            pageSize={10}
            loading={
              gettingTaxHeadBeneficiaries || gettingAcmisSearchedBeneficiaries
            }
            rowClassName="text-sm"
            bordered
            size="small"
          />
          //
          // <AntDTable
          //   columns={taxColumns}
          //   data={
          //     searchParam === "student-details"
          //       ? acmisSearchedBeneficiaries
          //       : taxHeadBeneficiaries[0].sponsees
          //   }
          //   virtualized
          //   pageSize={10}
          //   selectableRow
          //   selectedRows={selectedRows}
          //   setSelectedRows={setSelectedRows}
          //   loading={
          //     gettingTaxHeadBeneficiaries || gettingAcmisSearchedBeneficiaries
          //   }
          //   rowClassName="text-sm"
          //   bordered
          //   size="small"
          // />
          // <StateDataTable
          //   data={
          //     searchParam === "student-details"
          //       ? acmisSearchedBeneficiaries
          //         : taxHeadBeneficiaries[0].sponsees
          //     }
          //   columns={taxColumns}
          //   loading={gettingTaxHeadBeneficiaries || gettingAcmisSearchedBeneficiaries}
          //   className="border-top"
          //   size="small"
          //   selectableRow
          //   selectedRows={selectedRows}
          //   setSelectedRows={setSelectedRows}
          // />
        )}
      </Card.Body>
      {acmisBeneficiaryView === "beneficiary-view-----" && (
        <Accordion defaultActiveKey={0}>
          {Object.keys(formatTaxHeadBeneficiaries(taxHeadBeneficiaries)).map(
            (item, index) => {
              return (
                <>
                  <Accordion.Item eventKey={index} key={item}>
                    <Accordion.Header>
                      {formatInstitutionsCode(item)}
                    </Accordion.Header>
                    <Accordion.Body>
                      <AntDTable
                        columns={columns}
                        data={
                          formatTaxHeadBeneficiaries(taxHeadBeneficiaries)[item]
                        }
                        virtualized
                        loading={gettingAcmisBeneficiaries}
                        rowClassName="text-sm"
                        bordered
                        size="small"
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              );
            }
          )}
        </Accordion>
      )}
      {acmisBeneficiaryView === "beneficiary-views----" && (
        <>
          <Accordion defaultActiveKey={0}>
            {acmisBeneficiaries.map((item, index) => {
              return (
                <Accordion.Item eventKey={index} key={item.tax_head_code}>
                  <Accordion.Header>
                    {formatInstitutionsCode(item.tax_head_code)}
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* <AntDTable
                      columns={columns}
                      data={item.records}
                      virtualized
                      loading={gettingAcmisBeneficiaries}
                      rowClassName="text-sm"
                      selectableRow
                      selectedRows
                      setSelectedRows
                      bordered
                      size="small"
                    /> */}
                    <DataTable
                      data={item.records}
                      customStyles={darkHeader}
                      dense
                      noHeader
                      bordered
                      columns={columns}
                      pagination={item.records.length >= 15}
                      paginationPerPage={15}
                      responsive
                      striped
                      selectableRows
                      onSelectedRowsChange={handleChange}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </>
      )}
      {acmisBeneficiaryView === "beneficiary-form----" && (
        <Form
          onFinish={onSubmitForm}
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
            <Col md={12}>
              <Card.Header className="bg-primary text-sm text-white fw-bold text-uppercase border-0 py-3 mb-2">
                Beneficiary Details
                <div className="card-options">
                  <SubmitButton
                    onClick={(e) => {
                      e.preventDefault();
                      // setPayRows((prev) => prev + 1);
                    }}
                    className="my-0"
                    text="Add Row"
                  />
                </div>
              </Card.Header>
            </Col>
            <Col />
            <Col md={6}>
              {createBeneficiary.map((field) => (
                <AntDInputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  itemAttributes={field.itemAttributes}
                  type={field?.type}
                  options={options(field.name, field?.options)}
                  inputAttributes={field.inputAttributes}
                />
              ))}
            </Col>
            <Col md={5}>
              {moreCreateBeneficiary.map((field) => (
                <AntDInputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  itemAttributes={field.itemAttributes}
                  type={field?.type}
                  options={
                    field?.name === "salutation_id"
                      ? userTitleOptions
                      : field?.options
                  }
                  inputAttributes={field.inputAttributes}
                />
              ))}
            </Col>
            <Col />
            <Col md={12}>
              <Card.Header className="bg-primary text-sm text-white fw-bold text-uppercase border-0 py-2 mb-2">
                Payment Details
                <div className="card-options">
                  <SubmitButton
                    onClick={(e) => {
                      e.preventDefault();
                      setRows((prev) => prev + 1);
                    }}
                    className="my-0"
                    text="Add Row"
                  />
                </div>
              </Card.Header>
            </Col>
            <Col />
            <Col md={11}>
              <AntDRows
                col={1}
                key={rows}
                fields={acmisPaymentsOptions}
                rows={rows}
                setRows={setRows}
              />
            </Col>
            <Col />
          </Row>

          <div className="text-end mb-3 me-3">
            <SubmitButton
              size="sm"
              text="Add Beneficiary"
              loadingText="creating..."
              loading={creatingAcmisBeneficiary}
              className="text-sm fw-bold mt-3 text-white text-uppercase"
            />
          </div>
        </Form>
      )}

      {showBeneficiaryModal && (
        <BeneficiaryModal
          showModal={showBeneficiaryModal}
          data={selectedBeneficiary}
          closeModal={() =>
            dispatch(beneficiaryActions.setShowBeneficiaryModal(false))
          }
        />
      )}
    </>
  );
}

export default AcmisBeneficiaries;
