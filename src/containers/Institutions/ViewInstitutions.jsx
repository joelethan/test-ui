import { isEmpty, toLower, toUpper, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DataNotFound, DataSpinner, ReloadButton, SearchField, SubmitButton } from "../../components/common";
import AntDTable from "../../components/common/AntDTable";
import { institutionActions, settingActions } from "../../config/actions";
import HasAccess from "../../components/common/HasAccess";
import { searchStringInArrayObject } from "../../helpers/dataFormatter";

function ViewInstitutions() {
  const dispatch = useDispatch();
  const { stateInstitutions, fetchingInstitution, creatingInstitution } =
    useSelector((state) => state.institution);
  const [displayData, setDisplayData] = useState(stateInstitutions);
  const columns = [
    {
      title: "INSTITUTION NAME",
      fixed: "left",
      render: (text, row) => <>{toUpper(`(${row.code}) ${row.name}`)}</>,
      width: 150,
    },
    {
      title: "INSTITUTION TYPE",
      render: (text, row) => (
        <>{toUpper(`${row.institutionType.metadata_value}`)}</>
      ),
      width: 100,
    },
    {
      title: "LOCATION DISTRICT",
      render: (text, row) => (
        <>{toUpper(`${row.district}`)}</>
      ),
      width: 100,
    },
    {
      title: "PHONE CONTACT",
      render: (text, row) => <>{toUpper(`${row.telephone_1}`)}</>,
      width: 100,
    },
    {
      title: "ADMIN EMAIL ADDRESS",
      render: (text, row) => (
        <div className="italic">{toLower(`${row.email}`)}</div>
      ),
      width: 100,
    },
    {
      title: "OPTIONS",
      width: 40,
      fixed: "right",
      render: (_, row) => (
        <HasAccess allowedPermissions={["CAN UPDATE INSTITUTION"]}>
          <SubmitButton
            text="edit"
            block
            onClick={() => {
              dispatch(institutionActions.setInstitutionToEdit(row));
              dispatch(settingActions.setInstitutionsTabView("update-institution"));
            }}
          />
        </HasAccess>
      ),
    },
  ];

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  useEffect(() => {
    if (isEmpty(stateInstitutions)) getInstitutions();
  }, []);

  useEffect(() => {
    setDisplayData(stateInstitutions);
  }, [fetchingInstitution]);

  const onSearch = (e) => {
    e.preventDefault();
    const searchKey = e.target.value;
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(stateInstitutions, ['name', 'code', 'email', 'telephone_1'], searchKey),
          "id"
        )
      );
    } else {
      setDisplayData(stateInstitutions);
    }
  };

  return (
    <div>
      <Card.Header className="bg-white text-sm text-primary fw-bold py-2">
        <div className="w-100 me-2">
          <SearchField
            placeholder="Search Institutions ..."
            onChange={onSearch}
            name="search"
            type="search"
          />
        </div>
        <div className="card-options">
          <ReloadButton
            loading={fetchingInstitution}
            onClick={getInstitutions}
            className="me-2"
          />
        </div>
      </Card.Header>
      {fetchingInstitution && isEmpty(displayData) && (
        <DataSpinner text="Loading Institutions..." />
      )}
      {!fetchingInstitution && isEmpty(displayData) && (
        <DataNotFound />
      )}
      {!isEmpty(displayData) && (
        <AntDTable
          columns={columns}
          data={displayData}
          virtualized
          loading={creatingInstitution}
          rowClassName="text-sm"
          bordered
          size="small"
        />
      )}
    </div>
  );
}

export default ViewInstitutions;
