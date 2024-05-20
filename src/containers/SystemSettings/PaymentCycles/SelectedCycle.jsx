import { Form } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaAngleDoubleLeft, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addSupportItems } from "../../../Forms/settings";
import {
  AntDInputText,
  DataNotFound,
  ReloadButton,
  SubmitButton,
} from "../../../components/common";
import DeleteModal from "../../../components/common/DeleteModal";
import {
  institutionActions,
  metadataActions,
  settingActions,
} from "../../../config/actions";
import { formatMetadata } from "../../../helpers/dataFormatter";
import darkHeader from "../../../helpers/dataTableCustomStyle";

function SelectedCycle() {
  const dispatch = useDispatch();
  const [supportItemsOptions, setSupportItemsOptions] = useState([]);
  const { metadataValueView: itemsView, metadata } = useSelector(
    (state) => state.metadata
  );
  const { showDeleteModal } = useSelector((state) => state.setting);
  const {
    supportInstitution,
    addingSupportItems,
    gettingSupportItems,
    stateInstitutions,
    getSupportItemSuccess,
    deletingSupportItems,
  } = useSelector((state) => state.institution);

  useEffect(() => {
    setSupportItemsOptions(formatMetadata(metadata, "SUPPORT ITEMS"));
  }, [metadata]);

  useEffect(() => {
    if (!isEmpty(stateInstitutions) && isEmpty(getSupportItemSuccess)) {
      dispatch(institutionActions.getSupportItems());
    }
  }, []);

  const openDeletePopup = (data) => {
    dispatch(settingActions.setDeleteData(data));
    dispatch(settingActions.showDeleteModal(true));
  };

  const handleDelete = (data) =>
    dispatch(institutionActions.deleteSupportItem(data.id));

  const onChangeState = (value) =>
    dispatch(metadataActions.setMetadataValueView(value));

  const getSupportItems = () => {
    dispatch(institutionActions.getSupportItems());
    dispatch(institutionActions.getPaymentCycles());
  };

  const onSubmitValues = ({ items }) => {
    const data = items.map((r) => {
      return { institution_id: supportInstitution.id, support_item_id: r };
    });
    dispatch(institutionActions.addSupportItems(data));
  };

  const columns = [
    {
      name: "S/N",
      sortable: true,
      width: "100px",
      cell(_row, index) {
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
    {
      name: "Options",
      selector(row) {
        return row?.metadata_value_description;
      },
      sortable: true,
      right: true,
      maxWidth: "600px",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell(row) {
        return (
          <SubmitButton
            onClick={() => openDeletePopup(row)}
            type=""
            className="py-1"
            danger
            text="Delete"
          />
        );
      },
    },
  ];
  return (
    <Card>
      <Card.Header className="border-bottom p-2 text-muted">
        <Card.Title className="font600 text-sm">
          {supportInstitution.name}
        </Card.Title>
        <div className="card-options">
          <ReloadButton
            onClick={getSupportItems}
            loading={gettingSupportItems}
          />
          <Button
            size="sm"
            variant={itemsView === "add-value" ? "warning" : "primary"}
            className="font500 text-uppercase text-sm ms-2"
            type="button"
            onClick={() =>
              onChangeState(
                itemsView === "add-value" ? "view-values" : "add-value"
              )
            }
            disabled={isEmpty(supportInstitution)}
          >
            {itemsView === "add-value" ? (
              <FaAngleDoubleLeft className="me-1" />
            ) : (
              <FaPlusCircle className="me-1" />
            )}
            {itemsView === "view-values" ? "Add Item-" : "View Items"}
          </Button>
        </div>
      </Card.Header>
      {itemsView === "view-values" ? (
        <DataTable
          columns={columns}
          data={getSupportItemSuccess
            .filter(
              (i) =>
                parseInt(i.institution_id, 10) ===
                parseInt(supportInstitution.id, 10)
            )
            .map((y) => y.supportItem)}
          noHeader
          dense
          striped
          key={`${supportInstitution} ${metadata}`}
          noDataComponent={
            <DataNotFound
              message={
                isEmpty(supportInstitution)
                  ? "No Institution Has Been selected"
                  : "No Support Items found.-"
              }
            />
          }
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
              {addSupportItems.map((field) => (
                <AntDInputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  itemAttributes={field.itemAttributes}
                  type={field?.type}
                  options={supportItemsOptions}
                  inputAttributes={field.inputAttributes}
                />
              ))}
              <div className="text-end mb-3">
                <SubmitButton
                  size="sm"
                  text="Add Support Items"
                  loadingText="Adding..."
                  loading={addingSupportItems}
                  className="text-sm fw-bold mt-3 text-white text-uppercase"
                />
              </div>
            </Form>
          </Col>
          <Col />
        </Row>
      )}
      {showDeleteModal && (
        <DeleteModal
          handleConfirm={handleDelete}
          deleting={deletingSupportItems}
          itemName="Item"
        />
      )}
    </Card>
  );
}

SelectedCycle.propTypes = {};

export default SelectedCycle;
