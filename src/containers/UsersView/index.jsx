import { Tag } from "antd";
import { isEmpty, orderBy, toLower, toUpper, uniqBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { FaPlus, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  DataSpinner,
  ReloadButton,
  SubmitButton,
} from "../../components/common";
import AntDTable from "../../components/common/AntDTable";
import HasAccess from "../../components/common/HasAccess";
import { runningAdmissionActions, settingActions } from "../../config/actions";
import { searchStringInArrayObject } from "../../helpers/dataFormatter";
import ActionButtons from "./ActionButtons";
import AddNewUser from "./AddNewUser";

function UsersView() {
  const dispatch = useDispatch();

  const { stateUsersView } = useSelector((state) => state.setting);
  const { gettingAuthUser, stateHouseUsers, gettingStateHouseUsers } =
    useSelector((state) => state.runningAdmission);

  const [displayData, setDisplayData] = useState([]);

  const getStateHouseUsers = () => {
    dispatch(runningAdmissionActions.getStateHouseUsers());
  };

  useEffect(() => {
    if (isEmpty(stateHouseUsers)) getStateHouseUsers();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const action = useCallback((rowData) => {
    return (
      <ActionButtons
        row={rowData}
        key={rowData.id}
        handleEditClick={() => {
          dispatch(runningAdmissionActions.setUserToEdit(rowData));
          dispatch(settingActions.setStateUsersView("update-user"));
        }}
        deleting={false}
        openDeletePopup={() => {}}
      />
    );
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onSearch = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            stateHouseUsers,
            ["surname", "other_names", "email", "phone"],
            searchKey
          ),
          "id"
        )
      );
    } else {
      setDisplayData(stateHouseUsers);
    }
  };

  const columns = [
    {
      title: "NAME",
      fixed: "left",
      render: (text, row) => {
        return (
          <>{`${toUpper(`${row.surname}`)} ${toUpper(`${row.other_names}`)}`}</>
        );
      },
      width: 100,
    },
    {
      title: "EMAIL",
      render: (text, row) => (
        <div className="italic text-xs">{toLower(`${row?.email}`)}</div>
      ),
      width: 120,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      width: 50,
    },
    {
      title: "GENDER",
      render: (text, row) => <Tag color="cyan">{toUpper(row.gender)}</Tag>,
      width: 50,
    },
    {
      title: "PERMISSIONS",
      render: (text, row) => {
        const permissions = row?.permissions.map(
          (item) => item.permission.metadata_value
        );
        return permissions.map((item) => (
          <Tag className="mb-2" color="cyan">
            {item}
          </Tag>
        ));
      },
      width: 100,
    },
    {
      title: "CREATED BY",
      render: (text, row) => {
        return (
          <>{`${toUpper(`${row?.createdBy?.surname || ""}`)} ${toUpper(
            `${row?.createdBy?.other_names || ""}`
          )}`}</>
        );
      },
      width: 80,
    },
    {
      title: "OPTIONS",
      width: 50,
      fixed: "right",
      render: (_, row) => (
        <HasAccess allowedPermissions={["CAN UPDATE USERS"]}>
          <SubmitButton
            text="edit user"
            onClick={() => {
              dispatch(runningAdmissionActions.setUserToEdit(row));
              dispatch(settingActions.setStateUsersView("update-user"));
            }}
          />
        </HasAccess>
      ),
    },
  ];

  return (
    <div>
      <Card key={`${gettingStateHouseUsers}-${displayData}`}>
        <Card.Header className="bg-white text-sm text-primary fw-bold py-2">
          <FaUsers className="me-1" />
          SH SCHOLAR USERS
          <div className="card-options">
            {stateUsersView === "view-users" ? (
              <HasAccess allowedPermissions={["CAN CREATE USERS"]}>
                <SubmitButton
                  type="primary"
                  className="me-2"
                  onClick={() =>
                    dispatch(settingActions.setStateUsersView("add-user"))
                  }
                  iconBefore={<FaPlus className="me-1" />}
                  text="Add User"
                />
              </HasAccess>
            ) : (
              <SubmitButton
                type="primary"
                className="me-2"
                onClick={() =>
                  dispatch(settingActions.setStateUsersView("view-users"))
                }
                iconBefore={<FaUsers className="me-1" />}
                text="View Users"
              />
            )}
            <ReloadButton
              loading={gettingAuthUser || gettingStateHouseUsers}
              onClick={getStateHouseUsers}
            />
          </div>
        </Card.Header>
        <Card.Body>
          {/* <div className="w-100">
            <SearchField
              placeholder="Search Users ..."
              onChange={onSearch}
              name="search"
              type="search"
            />
          </div> */}
          {stateUsersView === "view-users" && !isEmpty(stateHouseUsers) && (
            <AntDTable
              idx={20}
              data={orderBy(
                isEmpty(displayData) ? stateHouseUsers : displayData,
                ["id"],
                "desc"
              )}
              columns={columns}
              noHeader
              striped
              virtualized
              rowClassName="text-sm"
              rowKey="id"
              loading={gettingAuthUser}
              bordered
              size="small"
            />
          )}
          {stateUsersView === "view-users" && isEmpty(stateHouseUsers) && (
            <DataSpinner text="Loading Users..." />
          )}
          {["add-user", "update-user"].includes(stateUsersView) && (
            <AddNewUser />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default UsersView;
