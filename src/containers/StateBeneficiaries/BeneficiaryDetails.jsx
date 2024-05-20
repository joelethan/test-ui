import { isEmpty, sumBy } from "lodash";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { DataNotFound, DataSpinner, UserAvatar } from "../../components/common";
import { formatDate } from "../../helpers/dataFormatter";
import darkHeader from "../../helpers/dataTableCustomStyle";
import BeneficiaryDetailsExpanded from "./BeneficiaryDetailsExpanded";

function BeneficiaryDetails() {
  const { searchedSystemBeneficiary, searchingSystemBeneficiary } = useSelector(
    (state) => state.beneficiary
  );

  const columns = [
    {
      name: "Allocation ID",
      sortable: true,
      cell: (row) =>
        `${row.class} , ${row.paymentCycle.metadata_value} - ${row.academicYear.metadata_value} , ${row.supportItem.metadata_value}`,
    },
  ];

  const sumBeneficiaryPayments = (userObj) => {
    const userAllocations = userObj.allocations;

    let totalAmount = 0;
    userAllocations.forEach((allocation) => {
      allocation.payments.forEach((payment) => {
        totalAmount += payment.amount_paid;
      });
    });
    return totalAmount;
  };

  return (
    <div className="m-3">
      <Table size="sm" striped bordered className="text-sm">
        <tbody>
          <tr>
            <td className="fw-bold">SH-ID NUMBER</td>
            <td>{searchedSystemBeneficiary.student_id_number}</td>
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
        </tbody>
      </Table>
      <Row className="row-deck g-2 mb-3">
        <Col md={3}>
          <Card body className="text-center border-0">
            <UserAvatar
              student={searchedSystemBeneficiary}
              height={100}
              width={100}
            />
            <div className="text-sm text-uppercase fw-bold my-2">
              TOTAL ALLOCATIONS:{" "}
              <span className="text-danger">
                {parseFloat(
                  sumBy(searchedSystemBeneficiary.allocations, "amount")
                ).toLocaleString()}{" "}
                UGX
              </span>
            </div>
            <div className="text-sm text-uppercase fw-bold my-2">
              TOTAL PAYMENTS:{" "}
              <span className="text-info">
                {parseFloat(
                  sumBeneficiaryPayments(searchedSystemBeneficiary)
                ).toLocaleString()}{" "}
                UGX
              </span>
            </div>
            <div className="text-sm text-uppercase fw-bold my-2">
              TOTAL AMOUNT DUE:{" "}
              <span className="text-success">
                {parseFloat(0).toLocaleString()} UGX
              </span>
            </div>
          </Card>
        </Col>
        {/* <Col>
                <Card className="border-0">
                  <Row className="row-deck g-2">
                    {map(cards, (card) => (
                      <Col md={3} key={card.key}>
                        <Card body className="text-center">
                          <div className="text-sm text-uppercase fw-bold mb-2">
                            {card.title}
                          </div>
                          <div className="text-lg text-primary">{`${parseFloat(
                            card.amount
                          ).toLocaleString()} UGX`}</div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col> */}
      </Row>
      <DataTable
        data={searchedSystemBeneficiary.allocations}
        columns={columns}
        noTableHead
        dense
        customStyles={darkHeader}
        noHeader
        expandOnRowClicked
        expandableRows
        keyField="id"
        expandableRowExpanded={() => true}
        expandableRowsComponent={BeneficiaryDetailsExpanded}
        expandableIcon={{
          collapsed: <FaPlus className="text-info" />,
          expanded: <FaMinus className="text-info" />,
        }}
        highlightOnHover
        progressPending={
          searchingSystemBeneficiary &&
          isEmpty(searchedSystemBeneficiary.allocations)
        }
        progressComponent={<DataSpinner text="Loading Allocations..." />}
        noDataComponent={<DataNotFound message="No Allocation Details Found" />}
      />
    </div>
  );
}

export default BeneficiaryDetails;
