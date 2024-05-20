import { Tag } from "antd";
import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserAvatar } from "../../components/common";
import { formatDate, formatSHNumber } from "../../helpers/dataFormatter";
import PDFViewer from "./PDFViewer";
import { settingActions } from "../../config/actions";

function BeneficiaryBioData() {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.setting);
  const { searchedSystemBeneficiary } = useSelector(
    (state) => state.beneficiary
  );

  return (
    <div className="m-3">
      <Row className="row-deck g-2 mb-3">
        <Card.Header className="fw-bold text-uppercase bg-upload_info border-0 py-2">
          <div className="mx-auto">BENEFICIARY BIO-DATA</div>
        </Card.Header>
        <Col md={2}>
          <Card body className="text-center border-0">
            <UserAvatar
              student={searchedSystemBeneficiary}
              height={100}
              width={100}
            />
          </Card>
        </Col>
        <Col md={10}>
          <Table size="sm" striped bordered className="text-sm text-uppercase">
            <tbody>
              <tr>
                <td className="fw-bold">SH-ID NUMBER</td>
                <td>{formatSHNumber(searchedSystemBeneficiary.id)}</td>
                <td className="fw-bold">FULL NAME</td>
                <td>{`${searchedSystemBeneficiary.surname} ${searchedSystemBeneficiary.other_names}`}</td>
              </tr>
              <tr>
                <td className="fw-bold">PHONE NUMBER</td>
                <td>{searchedSystemBeneficiary.phone}</td>
                <td className="fw-bold">GENDER</td>
                <td>{searchedSystemBeneficiary.gender.metadata_value}</td>
              </tr>
              <tr>
                <td className="fw-bold">DATE OF BIRTH</td>
                <td>{formatDate(searchedSystemBeneficiary.date_of_birth)}</td>
                <td className="fw-bold">APPROVAL STATUS</td>
                <td>{searchedSystemBeneficiary.create_approval_status}</td>
              </tr>
              <tr>
                <td className="fw-bold">HELPED BY</td>
                <td>{searchedSystemBeneficiary.helped_by}</td>
                <td className="fw-bold">NATIONALITY</td>
                <td>UGANDAN</td>
              </tr>
              <tr>
                <td className="fw-bold">REASON FOR JOINING</td>
                <td>{searchedSystemBeneficiary.reason_for_joining}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row
        className="row-deck g-2 mb-3"
        style={{ maxHeight: "50vh", overflowY: "auto" }}
      >
        <Card.Header className="fw-bold text-uppercase bg-upload_info border-0 py-2">
          <div className="mx-auto">Parent Details</div>
        </Card.Header>
        {searchedSystemBeneficiary?.guardians?.map((item) => (
          <Col md={6}>
            <Table
              size="sm"
              striped
              bordered
              className="text-sm text-uppercase"
            >
              <tbody>
                <tr>
                  <td className="fw-bold">{`${item?.relationship}'S NAME`}</td>
                  <td>{`${item?.surname} ${item?.other_names}`}</td>
                </tr>
                <tr>
                  <td className="fw-bold">DEAD OR ALIVE?</td>
                  <td>
                    {item?.dead_or_alive}{" "}
                    {`${
                      item?.dead_or_alive === "DECEASED"
                        ? `(${item?.death_period}YEARS)`
                        : ""
                    }`}
                  </td>
                </tr>
                {item?.dead_or_alive === "ALIVE" && (
                  <>
                    <tr>
                      <td className="fw-bold">{`${item?.relationship}'S OCCUPATION`}</td>
                      <td>{item?.occupation}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">{`${item?.relationship}'S PLACE OF WORK`}</td>
                      <td>{item?.place_of_work}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">{`${item?.relationship}'S CONTACT`}</td>
                      <td>{item?.telephone_number}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        ))}
        <Card.Header className="fw-bold text-uppercase bg-upload_info border-0 py-1">
          <div className="mx-auto">Institution Details </div>
          <Button
            size="sm"
            className="text-white bg-primary font500"
            onClick={() => dispatch(settingActions.showModal(true))}
          >
            VIEW ATTACHMENT
          </Button>
        </Card.Header>
        {searchedSystemBeneficiary?.institutions?.map((item) => (
          <Table size="sm" striped bordered className="text-sm">
            <tbody>
              <tr>
                <td className="fw-bold">INSTITUTION NAME</td>
                <td>
                  {`${item?.institution?.code} - ${item?.institution?.name}`}{" "}
                  {item?.is_active && <Tag>CURRENT INSTITUTION</Tag>}
                </td>
                <td className="fw-bold">INSTITUTION TYPE</td>
                <td>{item?.institutionType?.metadata_value}</td>
              </tr>
              <tr>
                <td className="fw-bold">INSTITUTION JOIN DATE</td>
                <td>{formatDate(item?.institution_start_date)}</td>
                <td className="fw-bold">SPONSORSHIP JOIN DATE</td>
                <td>{formatDate(item?.sponsorship_start_date)}</td>
              </tr>
              <tr>
                <td className="fw-bold">DIRECTIVE FROM</td>
                <td>{item?.authorizer?.metadata_value}</td>
                <td className="fw-bold">SPONSORSHIP PERIOD</td>
                <td>{`${item?.sponsorship_period} YEARS`}</td>
              </tr>
              <tr>
                <td className="fw-bold">CLASS / YEAR</td>
                <td>{item?.classOrYear?.metadata_value}</td>
                <td className="fw-bold">ACADEMIC YEAR</td>
                <td>{item?.academicYear?.metadata_value}</td>
              </tr>
              <tr>
                {item?.programme_of_study && (
                  <>
                    <td className="fw-bold">PROGRAMME OF STUDY</td>
                    <td>{item?.programme_of_study}</td>
                  </>
                )}
                {item?.programmeType?.metadata_value && (
                  <>
                    <td className="fw-bold">PROGRAMME TYPE</td>
                    <td>{item?.programmeType?.metadata_value}</td>
                  </>
                )}
              </tr>
            </tbody>
          </Table>
        ))}
      </Row>
      {showModal && <PDFViewer />}
      {/* <PdfComp /> */}
    </div>
  );
}

export default BeneficiaryBioData;
