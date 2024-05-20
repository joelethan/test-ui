/* eslint-disable react/no-unstable-nested-components */
import { Tag } from "antd";
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
import { searchStringInArrayObject } from "../../helpers/dataFormatter";
import darkHeader from "../../helpers/dataTableCustomStyle";

function BeneficiaryApprovals() {
  const dispatch = useDispatch();

  const { selectedMenu } = useSelector((state) => state.setting);
  const {
    benePendingFinalApproval,
    pendingBeneficiariesData,
    approvingPendingBeneficiaries,
    approvingBeneficiaryFinalPending,
    loadingPendingBeneficiaries,
    loadingBenePendingFinalApproval,
  } = useSelector((state) => state.beneficiary);

  const [selectedIDs, setSelectedIDs] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const fetchPendingBeneficiaries = () =>
    dispatch(beneficiaryActions.fetchPendingBeneficiaries());

  const fetchBeneficiariesPendingFinalApproval = () =>
    dispatch(beneficiaryActions.fetchBeneficiariesPendingFinalApproval());

  const approveBeneficiaries = () =>
    dispatch(beneficiaryActions.approveBeneficiaries(selectedIDs));

  const finalBeneficiariesApproval = () =>
    dispatch(beneficiaryActions.finalBeneficiariesApproval(selectedIDs));

  useEffect(() => {
    if (isEmpty(pendingBeneficiariesData) && selectedMenu.includes("initial"))
      fetchPendingBeneficiaries();
    if (isEmpty(benePendingFinalApproval) && selectedMenu.includes("final"))
      fetchBeneficiariesPendingFinalApproval();
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu.includes("initial"))
      setDisplayData(pendingBeneficiariesData);
    if (selectedMenu.includes("final"))
      setDisplayData(benePendingFinalApproval);
  }, [pendingBeneficiariesData, pendingBeneficiariesData]);

  useEffect(() => {
    if (selectedMenu.includes("initial"))
      setDisplayData(pendingBeneficiariesData);
    if (selectedMenu.includes("final"))
      setDisplayData(benePendingFinalApproval);
  }, [
    selectedMenu,
    loadingPendingBeneficiaries,
    loadingBenePendingFinalApproval,
  ]);

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
      wrap: true,
    },
    {
      name: "SH ID NUMBER",
      selector(row) {
        return row.student_id_number;
      },
      wrap: true,
    },
    {
      name: "GENDER",
      selector(row) {
        return row.gender;
      },
      wrap: true,
    },
    {
      name: "CONTACT",
      selector(row) {
        return row.phone;
      },
      wrap: true,
    },
    {
      name: "ADDRESS",
      selector(row) {
        return row.permanent_address || "--";
      },
      wrap: true,
    },
    {
      name: "INITIAL APPROVAL",
      cell(row) {
        return (
          <Tag
            color={`${
              row.create_approval_status === "PENDING" ? "error" : "success"
            }`}
          >
            {row.create_approval_status}
          </Tag>
        );
      },
      wrap: true,
    },
    {
      name: "FINAL APPROVAL",
      cell(row) {
        return (
          <Tag
            color={`${
              row.final_approval_status === "PENDING" ? "error" : "success"
            }`}
          >
            {row.final_approval_status}
          </Tag>
        );
      },
      wrap: true,
      omit: selectedMenu.includes("initial"),
    },
  ];

  const onSearchInitial = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            pendingBeneficiariesData,
            ["full_name", "student_id_number"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(pendingBeneficiariesData);
    }
  };

  const onSearchFinal = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            benePendingFinalApproval,
            ["full_name", "student_id_number"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(benePendingFinalApproval);
    }
  };

  const handleChange = ({ selectedRows }) =>
    setSelectedIDs(selectedRows.map((row) => row.id));

  return (
    <Card className="m-3">
      <Card.Header className="bg-upload_info text-sm fw-bold text-uppercase border-0 py-2">
        Beneficiary Details
        <div className="card-options">
          <HasAccess allowedPermissions={["CAN APPROVE BENEFICIARIES"]}>
            <SubmitButton
              onClick={(e) => {
                e.preventDefault();
                if (selectedMenu.includes("initial")) {
                  approveBeneficiaries();
                } else {
                  finalBeneficiariesApproval();
                }
              }}
              loading={
                approvingPendingBeneficiaries ||
                approvingBeneficiaryFinalPending
              }
              loadingText="Approving..."
              text="Approve Selected"
            />
            <ReloadButton
              loading={
                loadingPendingBeneficiaries || loadingBenePendingFinalApproval
              }
              onClick={
                selectedMenu.includes("initial")
                  ? fetchPendingBeneficiaries
                  : fetchBeneficiariesPendingFinalApproval
              }
              className="ms-2"
            />
          </HasAccess>
        </div>
      </Card.Header>
      <Card.Header className="py-1">
        <div className="w-100">
          <SearchField
            placeholder="Search Approvals Data ..."
            onChange={
              selectedMenu.includes("initial") ? onSearchInitial : onSearchFinal
            }
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
            (selectedMenu.includes("initial") &&
              loadingPendingBeneficiaries &&
              isEmpty(pendingBeneficiariesData)) ||
            (selectedMenu.includes("final") &&
              loadingBenePendingFinalApproval &&
              isEmpty(benePendingFinalApproval))
          }
          progressComponent={<DataSpinner />}
          noDataComponent={
            <DataNotFound message="No Pending Beneficiaries Found." />
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

export default BeneficiaryApprovals;
