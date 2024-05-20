import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReloadButton, SearchField } from "../../../components/common";
import { institutionActions, metadataActions } from "../../../config/actions";
import { searchStringInArrayObject } from "../../../helpers/dataFormatter";
import SelectedSupportItem from "./SelectedSupportItem";
import SupportItemsTable from "./SupportItemsTable";

function SupportItemsView() {
  const dispatch = useDispatch();
  const { searchParam } = useSelector((state) => state.metadata);
  const { stateInstitutions, fetchingInstitution } = useSelector(
    (state) => state.institution
  );
  const [parameters, setParameters] = useState(stateInstitutions);

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  const onSearch = (event) => {
    event.preventDefault();
    const searchKey = event.target.value;
    dispatch(metadataActions.setSearchParam(event.target.value));
    if (searchKey.length >= 1) {
      setParameters(
        searchStringInArrayObject(stateInstitutions, "name", searchKey)
      );
    } else setParameters(stateInstitutions);
  };

  const handleRowClick = (data) =>
    dispatch(institutionActions.setSupportInstitution(data));

  return (
    <div>
      <Row className="row-deck pt-2 ps-2 pe-2">
        <Col md={5}>
          <Card>
            <Card.Header className="text-primary py-2">
              <div className="card-options">
                <ReloadButton
                  onClick={getInstitutions}
                  loading={fetchingInstitution}
                />
              </div>
            </Card.Header>
            <Card.Header className="py-1">
              <div className="w-100">
                <SearchField
                  placeholder="Search Institutions ..."
                  onChange={onSearch}
                  name="search"
                  type="search"
                />
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <SupportItemsTable
                institutions={
                  searchParam.length >= 1 ? parameters : stateInstitutions
                }
                handleRowClick={handleRowClick}
                loading={fetchingInstitution}
                key={fetchingInstitution}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <SelectedSupportItem key={stateInstitutions} />
        </Col>
      </Row>
    </div>
  );
}

SupportItemsView.propTypes = {};

export default SupportItemsView;
