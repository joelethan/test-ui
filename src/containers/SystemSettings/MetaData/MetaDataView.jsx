import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CreateMetadata from "./CreateMetadata";
import MetaDataTable from "./MetaDataTable";
import SelectedMetadata from "./SelectedMetadata";
import { ReloadButton, SearchField } from "../../../components/common";
import { metadataActions, settingActions } from "../../../config/actions";
import { searchStringInArrayObject } from "../../../helpers/dataFormatter";

function MetaDataView() {
  const dispatch = useDispatch();
  const { metadata, loading, searchParam } = useSelector(
    (state) => state.metadata
  );
  const { showModal } = useSelector((state) => state.setting);
  const [parameters, setParameters] = useState(metadata);

  const getMetadata = () => dispatch(metadataActions.getMetadata());

  useEffect(() => {
    if (isEmpty(metadata)) getMetadata();
  }, []);

  const onSearch = (event) => {
    event.preventDefault();
    const searchKey = event.target.value;
    dispatch(metadataActions.setSearchParam(event.target.value));
    if (searchKey.length >= 1) {
      setParameters(
        searchStringInArrayObject(metadata, "metadata_name", searchKey)
      );
    } else setParameters(metadata);
  };

  const handleRowClick = (data) =>
    dispatch(metadataActions.setSelectedMetadata(data));
  const openFormModal = () => dispatch(settingActions.showModal(true));

  return (
    <div>
      <Row className="row-deck pt-2 ps-2 pe-2">
        <Col md={5}>
          <Card>
            <Card.Header className="text-primary py-2">
              <Card.Title className="text-sm font600">METADATA</Card.Title>
              <div className="card-options">
                <Button
                  size="sm"
                  className="font500 text-sm me-2 py-0"
                  onClick={openFormModal}
                >
                  <FaPlusCircle className="me-1" />
                  ADD META DATA
                </Button>
                <ReloadButton onClick={getMetadata} loading={loading} />
              </div>
            </Card.Header>
            <Card.Header className="py-1">
              <div className="w-100">
                <SearchField
                  placeholder="Search Meta Data..."
                  onChange={onSearch}
                  name="search"
                  type="search"
                />
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <MetaDataTable
                metadata={searchParam.length >= 1 ? parameters : metadata}
                handleRowClick={handleRowClick}
                loading={loading}
                key={loading}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <SelectedMetadata key={metadata} />
        </Col>
      </Row>
      {showModal && <CreateMetadata />}
    </div>
  );
}

MetaDataView.propTypes = {};

export default MetaDataView;
