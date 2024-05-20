import { isEmpty, toUpper, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  DataNotFound,
  DataSpinner,
  ReloadButton,
  SearchField,
  SubmitButton,
} from "../../components/common";
import HasAccess from "../../components/common/HasAccess";
import { beneficiaryActions } from "../../config/actions";
import darkHeader from "../../helpers/dataTableCustomStyle";
import { formatDate, searchStringInArrayObject } from "../../helpers/dataFormatter";

function AllocationsApprovals() {
  const dispatch = useDispatch();
  
  const {
    pendingAllocationsData,
    approvingPendingAllocations,
    loadingPendingAllocations,
  } = useSelector((state) => state.beneficiary);

  const [selectedIDs, setSelectedIDs] = useState([]);
  const [displayData, setDisplayData] = useState(pendingAllocationsData);
  useEffect(() => {
    setDisplayData(pendingAllocationsData);
  }, [pendingAllocationsData]);

  const fetchPendingAllocations = () =>
    dispatch(beneficiaryActions.fetchPendingAllocations());

  const approvePendingAllocations = () =>
    dispatch(beneficiaryActions.approvePendingAllocations(selectedIDs));

  useEffect(() => {
    if (isEmpty(pendingAllocationsData)) fetchPendingAllocations();
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
      selector(row) {
        return toUpper(`${row.full_name}`);
      },
      width: "200px",
    },
    {
      name: "SH ID NUMBER",
      selector(row) {
        return row.student_id_number;
      },
      width: "120px",
    },
    {
      name: "INSTITUTION",
      selector(row) {
        return row.inst_name;
      },
      width: "200px",
    },
    {
      name: "PAYMENT CYCLE",
      selector(row) {
        return row.allocation_payment_cycle;
      },
      width: "120px",
    },
    {
      name: "SUPPORT ITEM",
      selector(row) {
        return row.allocation_support_system;
      },
      width: "150px",
    },
    {
      name: "ACADEMIC YEAR",
      selector(row) {
        return row.allocation_academic_year;
      },
      width: "120px",
    },
    {
      name: "AMOUNT",
      selector(row) {
        return row.allocation_amount?.toLocaleString();
      },
      wrap: true,
    },
    {
      name: "CREATED AT",
      selector(row) {
        return formatDate(row.created_at) || "---- -- --";
      },
      width: "150px",
    },
  ];

  const onSearch = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(pendingAllocationsData, ['full_name', 'student_id_number'], searchKey),
          "id"
        )
      );
    } else {
      setDisplayData(pendingAllocationsData);
    }
  };

  const handleChange = ({ selectedRows }) =>
    setSelectedIDs(selectedRows.map((row) => row.id));

  return (
    <Card className="m-3">
      <Card.Header className="bg-upload_info text-sm fw-bold text-uppercase border-0 py-2">
        Allocations Details
        <div className="card-options">
          <HasAccess allowedPermissions={["CAN APPROVE PAYMENTS"]}>
            <SubmitButton
              onClick={(e) => {
                e.preventDefault();
                approvePendingAllocations();
              }}
              loading={approvingPendingAllocations}
              loadingText="Approving..."
              text="Approve Selected"
            />
            <ReloadButton
              loading={loadingPendingAllocations}
              onClick={fetchPendingAllocations}
              className="ms-2"
            />
          </HasAccess>
        </div>
      </Card.Header>
      <Card.Header className="py-1">
        <div className="w-100">
          <SearchField
            placeholder="Search Approvals Data ..."
            onChange={onSearch}
            name="search"
            type="search"
          />
        </div>
      </Card.Header>
      <Card.Body
        className="p-0"
        style={{ overflowY: "scroll", maxHeight: "80vh", overflowX: "hidden" }}
        >
        <DataTable
          data={displayData}
          customStyles={darkHeader}
          dense
          noHeader
          bordered
          columns={columns}
          progressPending={
            loadingPendingAllocations && isEmpty(pendingAllocationsData)
          }
          progressComponent={<DataSpinner />}
          noDataComponent={
            <DataNotFound message="No Pending Allocations Found." />
          }
          pagination={displayData.length >= 15}
          paginationPerPage={15}
          responsive
          striped
          selectableRows
          onSelectedRowsChange={handleChange}
        />
      </Card.Body>
    </Card>
  );
}

export default AllocationsApprovals;
