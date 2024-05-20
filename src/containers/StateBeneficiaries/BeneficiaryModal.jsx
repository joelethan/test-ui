/* eslint-disable react/no-unstable-nested-components */
import { get, isEmpty } from "lodash";
import PropTypes, { object } from "prop-types";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../components/common";
import TabMenu from "../../components/common/TabMenu";
import { beneficiaryActions } from "../../config/actions";

function BeneficiaryModal({ showModal, data, closeModal }) {
  const dispatch = useDispatch();
  const {
    fetchACMISResultsRes,
    taxCodeContext: { code },
  } = useSelector((state) => state.beneficiary);

  const {
    student_billing_info: billingData,
    student_bio_data: {
      surname: _surname,
      other_names: _others,
      registration_number: _reg,
      student_number: _studentNo,
      programme_title: _prog,
    },
    student_bio_data: biodata,
  } = data;
  const [displayView, setDisplayView] = useState("bio-data");
  const [currentResult, setCurrentResult] = useState("");

  useEffect(() => {
    setCurrentResult(fetchACMISResultsRes[`${code}-${biodata.student_number}`]);
  }, [fetchACMISResultsRes]);

  useEffect(() => {
    if (isEmpty(currentResult)) {
      dispatch(
        beneficiaryActions.fetchBeneficiaryResults(code, biodata.student_number)
      );
    }
  }, []);

  function AcademicYearDetails({ dataKey, row }) {
    const [studyYear, setStudyYear] = useState("");
    useEffect(() => {
      if (displayView === "academics") {
        const year = biodata.enrollments.find(
          (enrol) =>
            parseInt(enrol.event.academicYear.academicYear.id, 10) ===
            parseInt(row.academic_year_id, 10)
        ).studyYear.programme_study_years;
        setStudyYear(year);
      }
    }, [row]);

    return (
      <Card>
        <Card.Header
          className={`font600 text-sm border-0 py-2 db-${
            dataKey === "enrollment_data" ? "blue" : "green"
          } db-l-${dataKey === "enrollment_data" ? "blue" : "green"}`}
        >
          {displayView === "academics" &&
            `ENROLLMENT DATA - FOR ${studyYear} ${row.enrollment_data?.semester}`}
          {displayView === "payments" && "ALLOCATION DATA"}
        </Card.Header>
        <Card.Header className="font400 px-3 text-muted text-xs">
          <Table size="sm" bordered>
            {displayView === "academics" && (
              <>
                <thead>
                  <tr className="h6 text-sm">
                    <th>Fees</th>
                    <th>Amount Billed</th>
                    <th>Amount Paid</th>
                    <th>Amount Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuition Fees</td>
                    <td>{`${row.enrollment_data?.tuition_fees.amount_billed.toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.tuition_fees.amount_paid?.toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.tuition_fees.amount_due?.toLocaleString()} UGX`}</td>
                  </tr>
                  <tr>
                    <td>Functional Fees</td>
                    <td>{`${(
                      row.enrollment_data?.functional_fees?.amount_billed || 0
                    ).toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.functional_fees?.amount_paid?.toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.functional_fees?.amount_due?.toLocaleString()} UGX`}</td>
                  </tr>
                  <tr>
                    <td>Other Fees</td>
                    <td>{`${row.enrollment_data?.other_fees.amount_billed?.toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.other_fees.amount_paid?.toLocaleString()} UGX`}</td>
                    <td>{`${row.enrollment_data?.other_fees.amount_due?.toLocaleString()} UGX`}</td>
                  </tr>
                </tbody>
              </>
            )}
            {displayView === "payments" && (
              <>
                <thead>
                  <tr className="h6 text-sm">
                    <th>Fees</th>
                    <th>Total AMount</th>
                    <th>PRN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Allocated Amount</td>
                    <td>{`${row.allocation_data?.amount.toLocaleString()} UGX`}</td>
                    <td>{`${row.allocation_data?.sponsorTransaction.ura_prn}`}</td>
                  </tr>
                </tbody>
              </>
            )}
            {displayView === "results" && (
              <>
                <thead>
                  <tr className="h6 text-sm">
                    <th>ACADEMIC STATUS</th>
                    <th>CURRENT CGPA</th>
                    <th>PROGRAMME STUDY YEAR</th>
                    <th>CURRENT SEMESTER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${row?.academic_status || "---"}`}</td>
                    <td>{`${row?.current_cgpa || "---"}`}</td>
                    <td>{`${row?.programme_study_year || "---"}`}</td>
                    <td>{`${row?.semester || "---"}`}</td>
                  </tr>
                </tbody>
              </>
            )}
          </Table>
        </Card.Header>
      </Card>
    );
  }

  AcademicYearDetails.defaultProps = {
    row: {},
  };

  AcademicYearDetails.propTypes = {
    dataKey: PropTypes.string.isRequired,
    row: PropTypes.oneOfType([object]),
  };

  return (
    <FormModal
      formTitle="Beneficiary Details"
      defaultShow={showModal}
      onCloseModal={closeModal}
      width={1000}
      handleSubmit={null}
      submitButtonProps={null}
      dialogClassName="modal-90w"
    >
      <div className="border">
        <TabMenu
          currentMenu={displayView}
          setCurrentMenu={setDisplayView}
          menus={[
            {
              title: "BIODATA",
              action: "bio-data",
            },
            {
              title: "ACADEMIC DETAILS",
              action: "academics",
            },
            {
              title: "PAYMENT DETAILS",
              action: "payments",
            },
            {
              title: "STUDENT RESULTS",
              action: "results",
            },
          ]}
        />
        {displayView === "bio-data" && (
          <Card body className="m-2">
            <ListGroup variant="flush" className="text-sm fw-bold">
              <ListGroup.Item>
                BENEFICIARY NAME:
                <span className="ms-2 fw-bold text-primary text-end text-uppercase">
                  {`${get(biodata, "student.surname", _surname)} ${get(
                    biodata,
                    "student.other_names",
                    _others
                  )}`}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                REGISTRATION NUMBER:
                <span className="ms-2 fw-bold text-primary text-end text-uppercase">
                  {`${get(biodata, "student.registration_number", _reg)}`}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                STUDENT NUMBER:
                <span className="ms-2 fw-bold text-primary text-end text-uppercase">
                  {`${get(biodata, "student.student_number", _studentNo)}`}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                STUDENT PROGRAMME:
                <span className="ms-2 fw-bold text-primary text-end text-uppercase">
                  {`${get(biodata, "student.programme_title", _prog)}`}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
        {["academics", "payments"].includes(displayView) && (
          <Accordion defaultActiveKey="" className="m-2">
            {billingData.map((item, index) => {
              const records = item.records
                .map((row) => {
                  return displayView === "academics"
                    ? Object.fromEntries(
                        Object.entries(row).filter(
                          ([key]) => key !== "allocation_data"
                        )
                      )
                    : Object.fromEntries(
                        Object.entries(row).filter(
                          ([key]) => key !== "enrollment_data"
                        )
                      );
                })
                .filter((row) => Object.keys(row).length > 1);
              return (
                <>
                  {records.find(
                    (elem) => elem.academic_year === item.academic_year
                  ) && (
                    <Accordion.Item eventKey={index} key={item}>
                      <Accordion.Header>{item.academic_year}</Accordion.Header>
                      <Accordion.Body>
                        <Row className="text-uppercase">
                          {records.map((row) => {
                            return (
                              <Col key={row} md={6}>
                                {displayView === "academics" && (
                                  <AcademicYearDetails
                                    dataKey="enrollment_data"
                                    row={row}
                                  />
                                )}
                                {displayView === "payments" && (
                                  <AcademicYearDetails
                                    dataKey="allocation_data"
                                    row={row}
                                  />
                                )}
                              </Col>
                            );
                          })}
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                </>
              );
            })}
          </Accordion>
        )}
        {displayView === "results" && (
          <div className="m-2">
            <AcademicYearDetails dataKey="" row={currentResult} />
          </div>
        )}
      </div>
    </FormModal>
  );
}

BeneficiaryModal.defaultProps = {
  showModal: false,
};

BeneficiaryModal.propTypes = {
  showModal: PropTypes.bool,
  data: PropTypes.oneOfType([object]).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default BeneficiaryModal;
