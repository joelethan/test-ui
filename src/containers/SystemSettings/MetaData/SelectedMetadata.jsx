import { Form } from "antd";
import { orderBy } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaAngleDoubleLeft, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addMetadataValue } from "../../../Forms/metadata";
import {
  AntDInputText,
  DataNotFound,
  SubmitButton,
} from "../../../components/common";
import { metadataActions } from "../../../config/actions";
import darkHeader from "../../../helpers/dataTableCustomStyle";

function SelectedMetadata() {
  const dispatch = useDispatch();
  const { metadataValueView, metadata, addingMetaDataValue, selectedMetadata } =
    useSelector((state) => state.metadata);
  const onChangeState = (value) =>
    dispatch(metadataActions.setMetadataValueView(value));

  useEffect(() => {
    if (!selectedMetadata.is_editable) onChangeState("view-values");
  }, [selectedMetadata]);

  const onSubmitValues = (values) =>
    dispatch(
      metadataActions.addMetadataValues({
        ...values,
        metadata_id: selectedMetadata.id,
      })
    );

  const columns = [
    {
      name: "S/N",
      sortable: true,
      width: "100px",
      cell(row, index) {
        return index + 1;
      },
    },
    {
      name: "VALUE",
      selector(row) {
        return row?.metadata_value;
      },
      sortable: true,
      right: false,
      wrap: true,
      style: {
        width: "auto",
        fontWeight: "600",
      },
    },
    {
      name: "Description",
      selector(row) {
        return row?.metadata_value_description;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Created On",
      selector(row) {
        return row?.metadata_value_description;
      },
      sortable: true,
      wrap: true,
      cell(row) {
        return moment.utc(row.created_at).format("LL");
      },
    },
    // {
    //   name: 'Action',
    //   sortable: true,
    //   style: { fontWeight: 'bold' },
    //   right: true,
    //   cell: action,
    // },
  ];
  return (
    <Card>
      <Card.Header className="border-bottom p-2 text-muted">
        <Card.Title className="font600 text-sm">
          {selectedMetadata.metadata_name}
        </Card.Title>
        <div className="card-options">
          <Button
            size="sm"
            disabled={!selectedMetadata.is_editable}
            variant={metadataValueView === "add-value" ? "warning" : "primary"}
            className="font500 text-uppercase text-sm py-1"
            type="button"
            onClick={() =>
              onChangeState(
                metadataValueView === "add-value" ? "view-values" : "add-value"
              )
            }
          >
            {metadataValueView === "add-value" ? (
              <FaAngleDoubleLeft className="me-1" />
            ) : (
              <FaPlusCircle className="me-1" />
            )}
            {metadataValueView === "view-values" ? "Add Value" : "View Values"}
          </Button>
        </div>
      </Card.Header>
      {metadataValueView === "view-values" ? (
        <DataTable
          columns={columns}
          data={orderBy(selectedMetadata.metadataValues, ["metadata_value"])}
          noHeader
          dense
          striped
          key={`${selectedMetadata} ${metadata}`}
          noDataComponent={<DataNotFound message="No Metadata values found." />}
          customStyles={darkHeader}
        />
      ) : (
        <Row>
          <Col />
          <Col md={11}>
            <Form
              onFinish={onSubmitValues}
              labelCol={{
                span: 8,
                className: "text-sm",
              }}
              labelAlign="left"
              wrapperCol={{
                span: 16,
              }}
              autoComplete="off"
              className="mt-2"
            >
              {addMetadataValue.map((field) => (
                <AntDInputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  itemAttributes={field.itemAttributes}
                  type={field?.type}
                  options={field?.options}
                  inputAttributes={field.inputAttributes}
                />
              ))}
              <div className="text-end mb-3">
                <SubmitButton
                  text="Add Metadata Value"
                  loadingText="Adding..."
                  loading={addingMetaDataValue}
                  className="text-sm fw-bold mt-3 text-white text-uppercase"
                />
              </div>
            </Form>
          </Col>
          <Col />
        </Row>
      )}
    </Card>
  );
}

SelectedMetadata.propTypes = {};

export default SelectedMetadata;
