/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import { Popconfirm as Confirm, Form, Select, Tag } from "antd";
import { isEmpty, orderBy, toUpper, uniqBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { institutionBeneficiariesOptions } from "../../Forms/beneficiary";
import {
  AntDInputText,
  DataNotFound,
  DataSpinner,
  FormModal,
  SearchField,
  SubmitButton,
  SupportDataLoader,
} from "../../components/common";
import AntDTable from "../../components/common/AntDTable";
import {
  beneficiaryActions,
  institutionActions,
  metadataActions,
} from "../../config/actions";
import {
  formatMetadata,
  formatSHNumber,
  formatStateInstitutions,
  searchStringInArrayObject,
} from "../../helpers/dataFormatter";
import darkHeader from "../../helpers/dataTableCustomStyle";
import ActionButtons from "./SponseeActions";

function InstitutionBeneficiaries() {
  const [form] = Form.useForm();

  const watchObj = Form.useWatch([], form);

  const dispatch = useDispatch();

  const { selectedMenu } = useSelector((state) => state.setting);
  const { metadata } = useSelector((state) => state.metadata);
  const { stateInstitutions, fetchingInstitution } = useSelector(
    (state) => state.institution
  );

  // const {
  //   authUser: { permissions: userPermissions },
  // } = useSelector((state) => state.auth);

  const {
    beneficiaryContext,
    gettingInstitutionBeneficiaries,
    selectedInstitutionType,
    institutionBeneficiaries,
    selectedInstBeneficiaries,
    selectedInstBeneficiaries: { original, edited },
  } = useSelector((state) => state.beneficiary);

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [showDNoteTable, setShowDNoteTable] = useState(false);
  const [institutionTypeOptions, setInstitutionTypeOptions] = useState([]);
  const [displayData, setDisplayData] = useState(institutionBeneficiaries);

  useEffect(() => {
    setAcademicYearOptions(formatMetadata(metadata, "ACADEMIC YEARS"));
  }, [metadata]);

  const edit = (record) => {
    const data = edited.find((item) => item.id === record.id);
    form.setFieldsValue({
      outstanding_amount: data.outstanding_amount,
      tuition_sem_1: data.tuition_sem_1,
      tuition_sem_2: data.tuition_sem_2,
      functional_fees: data.functional_fees,
      itcsp: data.itcsp,
      accommodation: data.accommodation,
      graduation: data.graduation,
      // id: record.bene_id, // To Help with Referencing
    });
    setEditingKey(record.id);
  };

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());
  const getInstitutionOptions = () =>
    stateInstitutions.filter(
      (item) =>
        parseInt(item.institution_type_id, 10) ===
        parseInt(selectedInstitutionType.institution_type, 10)
    );
  const options = (fieldName, _default) => {
    if (fieldName === "institution_type") {
      return institutionTypeOptions;
    }
    if (fieldName === "institution_id") {
      return institutionOptions;
    }
    return _default;
  };

  const action = useCallback((rowData) => {
    return (
      <ActionButtons
        row={rowData}
        key={rowData.id}
        handleView={() => {}}
        handleAddAllocation={() => {}}
        handleAddInst={() => {}}
        loading={false}
        openDeletePopup={() => {}}
      />
    );
  }, []);

  const columns = [
    {
      name: "S/N",
      sortable: true,
      width: "60px",
      cell(row, index) {
        return index + 1;
      },
    },
    {
      name: "FULL NAME",
      width: "200px",
      selector(row) {
        return toUpper(`${row.surname} ${row.other_names}`);
      },
      wrap: true,
    },
    {
      name: "SH ID NUMBER",
      selector(row) {
        return toUpper(`${formatSHNumber(row.bene_id) || "-"}`);
      },
      wrap: true,
    },
    {
      name: "CONTACT",
      selector(row) {
        return `${row.phone || "-"}`;
      },
      wrap: true,
    },
    {
      name: "GENDER",
      selector(row) {
        return toUpper(`${row.gender || "-"}`);
      },
      wrap: true,
    },
    {
      name: "HELPED BY?",
      selector(row) {
        return toUpper(`${row.helped_by || "-"}`);
      },
      wrap: true,
    },
    {
      name: "NATIONALITY",
      selector(row) {
        return toUpper(`${row.nationality || "-"}`);
      },
      wrap: true,
    },
    {
      name: "ADDRESS",
      selector(row) {
        return toUpper(`${row.address || "-"}`);
      },
      wrap: true,
    },
    // {
    //   name: "OPTIONS",
    //   selector(row) {
    //     return action(row);
    //   },
    //   right: true,
    // },
  ];

  const columns0 = [
    {
      title: "SH ID NUMBER",
      render: (text, row) => (
        <>{toUpper(`${formatSHNumber(row.bene_id) || "-"}`)}</>
      ),
      width: 200,
    },
    {
      title: "FULL NAME",
      render: (text, row) => (
        <>{toUpper(`${row.surname} ${row.other_names}`)}</>
      ),
      width: 200,
    },
    {
      title: (
        <div>
          OUTSTANDING
          <br />
          <Tag color="orange">2021/2022</Tag>
        </div>
      ),
      dataIndex: "outstanding_amount",
      render: (text, row) => <>{row.outstanding_amount || "0.0"}</>,
      editable: true,
      width: 200,
    },
    {
      title: (
        <>
          TUITION SEM I
          <br />
          <Tag color="cyan">
            {
              academicYearOptions.find(
                (it) =>
                  parseInt(it.value, 10) ===
                  parseInt(watchObj?.academic_year_id, 10)
              )?.label
            }
          </Tag>
        </>
      ),
      dataIndex: "tuition_sem_1",
      render: (text, row) => <>{row.tuition_sem_1 || "0.0"}</>,
      editable: true,
    },
    {
      title: (
        <>
          TUITION SEM II
          <br />
          <Tag color="cyan">
            {
              academicYearOptions.find(
                (it) =>
                  parseInt(it.value, 10) ===
                  parseInt(watchObj?.academic_year_id, 10)
              )?.label
            }
          </Tag>
        </>
      ),
      dataIndex: "tuition_sem_2",
      render: (text, row) => <>{row.tuition_sem_2 || "0.0"}</>,
      editable: true,
    },
    {
      title: <>FUNCTIONAL FEES</>,
      dataIndex: "functional_fees",
      render: (text, row) => <>{row.functional_fees || "0.0"}</>,
      editable: true,
    },
    {
      title: "ITC SP",
      dataIndex: "itcsp",
      render: (text, row) => <>{row.itcsp || "0.0"}</>,
      editable: true,
    },
    {
      title: "ACCDN",
      dataIndex: "accommodation",
      render: (text, row) => <>{row.accommodation || "0.0"}</>,
      editable: true,
    },
    {
      title: "GRAD",
      dataIndex: "graduation",
      render: (text, row) => <>{row.graduation || "0.0"}</>,
      editable: true,
    },
    {
      title: "TOTAL",
      render: (text, row) => <>{row.total || "0.0"}</>,
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Confirm title="Sure to delete?" onConfirm={() => {}}>
          <Tag color="orange">Delete</Tag>
        </Confirm>
      ),
    },
  ];

  const columns1 = columns0.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          edit,
          editable: col.editable,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  const onSearchBeneficiaries = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            institutionBeneficiaries,
            ["surname", "other_names", "phone"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(institutionBeneficiaries);
    }
  };

  useEffect(() => {
    form.setFieldsValue(beneficiaryContext);
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
    if (isEmpty(stateInstitutions)) getInstitutions();
    if (
      !isEmpty(selectedInstitutionType) &&
      Object.keys(selectedInstitutionType).length > 1
    )
      setInstitutionOptions(formatStateInstitutions(getInstitutionOptions()));
  }, []);

  useEffect(() => {
    setInstitutionTypeOptions(formatMetadata(metadata, "INSTITUTION TYPES"));
  }, [metadata]);

  useEffect(() => {
    setInstitutionOptions(formatStateInstitutions(getInstitutionOptions()));
  }, [selectedInstitutionType]);

  useEffect(() => {
    setDisplayData(institutionBeneficiaries);
  }, [gettingInstitutionBeneficiaries]);

  const handleChange = ({ selectedRows }) =>
    dispatch(
      beneficiaryActions.setSelectedInstBeneficiaries({
        original: selectedRows,
        edited: selectedRows,
      })
    );

  const prepareDemandNote = (e) => {
    e.preventDefault();
    setShowDNoteTable(!showDNoteTable);
  };

  createTheme(
    "solarized",
    {
      background: {
        default: "red",
      },
    },
    "dark"
  );

  return (
    <div className="bg-white border border-top-0">
      <Form
        // layout="vertical"
        onFinish={(data) => {
          dispatch(beneficiaryActions.fetchInstitutionBeneficiaries(data));
        }}
        initialValues={selectedInstitutionType}
        onValuesChange={(data) => {
          dispatch(
            beneficiaryActions.selectedInstitutionType({
              ...selectedInstitutionType,
              ...data,
            })
          );
          const key = Object.keys(data)[0];
          const value = Object.values(data)[0];
          for (let i = 0; i < edited.length; i += 1) {
            if (edited[i].id === editingKey) {
              edited[i][key] = value;
              break; // Exit loop once the object is found and property is added
            }
          }
          dispatch(
            beneficiaryActions.setSelectedInstBeneficiaries({
              original,
              edited,
            })
          );
        }}
        className="w-100 mt-2"
        form={form}
      >
        {fetchingInstitution && isEmpty(stateInstitutions) && (
          <SupportDataLoader />
        )}
        <Row className="mx-3">
          {institutionBeneficiariesOptions.map((field) => (
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
          <Col className="my-auto">
            <SubmitButton
              block
              loading={gettingInstitutionBeneficiaries}
              loadingText="Searching..."
              text="search"
            />
          </Col>
        </Row>
        {!isEmpty(institutionBeneficiaries) && (
          <div>
            <Card.Header className="bg-white text-sm text-primary fw-bold py-2">
              {selectedMenu !== "payments" && (
                <SubmitButton
                  text={
                    showDNoteTable
                      ? "Back To Beneficiaries"
                      : "Prepare Demand Note"
                  }
                  loading={fetchingInstitution}
                  onClick={prepareDemandNote}
                  disabled={isEmpty(selectedInstBeneficiaries)}
                />
              )}
              <div className="w-100 mx-2">
                <SearchField
                  placeholder="Search Institution Beneficiaries ..."
                  onChange={onSearchBeneficiaries}
                  name="search"
                  type="search"
                />
              </div>
            </Card.Header>
            {showDNoteTable && (
              <Card.Body>
                <Row>
                  <Col md={4} />
                  <Col md={4}>
                    <Form.Item
                      name="academic_year_id"
                      label="Academic Year"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Academic Year",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select option"
                        allowClear
                        showSearch
                        options={academicYearOptions}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={4} />
                </Row>
              </Card.Body>
            )}
          </div>
        )}

        {!showDNoteTable ? (
          <DataTable
            data={orderBy(displayData, ["surname", "other_names"])}
            columns={columns}
            height={500}
            // theme="solarized"
            bordered
            dense
            noHeader
            highlightOnHover
            striped
            pointerOnHover
            fixedHeader
            selectableRows={selectedMenu !== "payments"}
            onSelectedRowsChange={handleChange}
            fixedHeaderScrollHeight="69vh"
            customStyles={darkHeader}
            progressPending={
              gettingInstitutionBeneficiaries && isEmpty(displayData)
            }
            progressComponent={<DataSpinner />}
            noDataComponent={
              <DataNotFound message="No Beneficiaries Found..." />
            }
          />
        ) : (
          <AntDTable
            columns={columns1}
            data={orderBy(edited, ["surname", "other_names"])}
            virtualized
            isEditable
            bordered
            pageSize={10}
            loading={gettingInstitutionBeneficiaries && isEmpty(displayData)}
            rowClassName="editable-row"
            size="small"
          />
        )}
        <Card.Header className="py-3 border-0">
          <div className="card-options">
            {showDNoteTable && (
              <SubmitButton
                text="Submit"
                loading={fetchingInstitution}
                onClick={(e) => {
                  setEditingKey("");
                  // e.preventDefault();
                  // console.log(
                  //   "edited",
                  //   edited.map((ed) => {
                  //     return { id: ed.id };
                  //   })
                  // );
                }}
                disabled={isEmpty(selectedInstBeneficiaries)}
              />
            )}
          </div>
        </Card.Header>
        {false && (
          <FormModal
            formTitle="Prepare Demand Note"
            defaultShow={showDNoteTable}
            onCloseModal={() => setShowDNoteTable(false)}
            width={1000}
            handleSubmit={() => {
              // console.log("console ***", []);
            }}
            submitButtonProps={{
              loading: false,
              loadingText: "Submitting...",
              text: "Submit",
            }}
            dialogClassName="modal-98w"
          >
            <AntDTable
              columns={columns1}
              data={orderBy(edited, ["surname", "other_names"])}
              virtualized
              isEditable
              bordered
              pageSize={10}
              loading={gettingInstitutionBeneficiaries && isEmpty(displayData)}
              rowClassName="editable-row"
              size="small"
            />
          </FormModal>
        )}
      </Form>
    </div>
  );
}

InstitutionBeneficiaries.defaultProps = {};

InstitutionBeneficiaries.propTypes = {};

export default InstitutionBeneficiaries;
