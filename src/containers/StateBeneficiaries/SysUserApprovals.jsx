/* eslint-disable react/no-unstable-nested-components */
import { Tag } from "antd";
import { isEmpty, toLower, toUpper, uniqBy } from "lodash";
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
import {
  beneficiaryActions,
  runningAdmissionActions,
} from "../../config/actions";
import {
  formatDate,
  searchStringInArrayObject,
} from "../../helpers/dataFormatter";
import darkHeader from "../../helpers/dataTableCustomStyle";

function SysUserApprovals() {
  const dispatch = useDispatch();

  const { selectedMenu } = useSelector((state) => state.setting);
  const {
    gettingUsersPendingFinal,
    gettingPendingUsers,
    pendingStateHouseUsers,
    usersPendingFinal,
  } = useSelector((state) => state.runningAdmission);

  const [selectedIDs, setSelectedIDs] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const getStateHouseUsers = () =>
    dispatch(runningAdmissionActions.fetchPendingSHUsers());

  const fetchUsersPendingFinalApproval = () =>
    dispatch(runningAdmissionActions.fetchUsersPendingFinalApproval());

  const approveBeneficiaries = () =>
    dispatch(beneficiaryActions.approveBeneficiaries(selectedIDs));

  const finalBeneficiariesApproval = () =>
    dispatch(beneficiaryActions.finalBeneficiariesApproval(selectedIDs));

  useEffect(() => {
    if (isEmpty(pendingStateHouseUsers) && selectedMenu.includes("initial"))
      getStateHouseUsers();
    if (isEmpty(usersPendingFinal) && selectedMenu.includes("final"))
      fetchUsersPendingFinalApproval();
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu.includes("initial"))
      setDisplayData(pendingStateHouseUsers);
    if (selectedMenu.includes("final")) setDisplayData(usersPendingFinal);
  }, [pendingStateHouseUsers, pendingStateHouseUsers]);

  useEffect(() => {
    if (selectedMenu.includes("initial"))
      setDisplayData(pendingStateHouseUsers);
    if (selectedMenu.includes("final")) setDisplayData(usersPendingFinal);
  }, [selectedMenu, gettingPendingUsers, gettingUsersPendingFinal]);

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
        return toUpper(`${row.surname} ${row.other_names}`);
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
      name: "EMAIL",
      selector(row) {
        return toLower(row.email);
      },
      wrap: true,
      width: "300px",
    },
    {
      name: "GENDER",
      selector(row) {
        return <Tag color="cyan">{toUpper(row.gender)}</Tag>;
      },
      wrap: true,
    },
    {
      name: "Created At",
      selector(row) {
        return <Tag color="cyan">{formatDate(row.created_at)}</Tag>;
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
      center: true,
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
            pendingStateHouseUsers,
            ["full_name", "student_id_number"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(pendingStateHouseUsers);
    }
  };

  const onSearchFinal = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            usersPendingFinal,
            ["full_name", "student_id_number"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(usersPendingFinal);
    }
  };

  const handleChange = ({ selectedRows }) =>
    setSelectedIDs(selectedRows.map((row) => row.id));

  return (
    <Card className="m-3">
      <Card.Header className="bg-upload_info text-sm fw-bold text-uppercase border-0 py-2">
        User Details
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
              loading={false}
              loadingText="Approving..."
              text="Approve Selected"
            />
            <ReloadButton
              onClick={
                selectedMenu.includes("initial")
                  ? getStateHouseUsers
                  : fetchUsersPendingFinalApproval
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
              gettingPendingUsers &&
              isEmpty(pendingStateHouseUsers)) ||
            (selectedMenu.includes("final") &&
              gettingUsersPendingFinal &&
              isEmpty(usersPendingFinal))
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

export default SysUserApprovals;
