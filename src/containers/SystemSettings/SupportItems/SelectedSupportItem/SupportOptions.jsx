import { Form } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentCycles, addStudyClasses, addSupportItems } from "../../../../Forms/settings";
import {
  AntDInputText,
  DataNotFound,
  SubmitButton,
} from "../../../../components/common";
import DeleteModal from "../../../../components/common/DeleteModal";
import { institutionActions, settingActions } from "../../../../config/actions";
import { formatMetadata } from "../../../../helpers/dataFormatter";
import darkHeader from "../../../../helpers/dataTableCustomStyle";

function SupportOptions({ currentTab }) {
  const dispatch = useDispatch();
  const [supportItemsOptions, setSupportItemsOptions] = useState([]);
  const { showDeleteModal } = useSelector((state) => state.setting);
  const { metadataValueView: itemsView, metadata } = useSelector(
    (state) => state.metadata
  );
  const {
    supportInstitution,
    addingSupportItems,
    addingPaymentCycles,
    addingStudyClasses,
    stateInstitutions,
    getSupportItemSuccess,
    getPaymentCycleSuccess,
    getStudyClassesSuccess,
    deletingSupportItems,
    deletingPaymentCycles,
    deletingStudyClass,
  } = useSelector((state) => state.institution);

  useEffect(() => {
    let item = null;
    if (currentTab === "support") {
      item = "SUPPORT ITEMS"
    } else if (currentTab === "payment-cycles") {
      item = "PAYMENT CYCLES"
    } else {
      item = "STUDY CLASSES"
    }
    setSupportItemsOptions(formatMetadata(metadata, item));
  }, [metadata, currentTab]);

  useEffect(() => {
    if (!isEmpty(stateInstitutions) && isEmpty(getSupportItemSuccess)) {
      dispatch(institutionActions.getSupportItems());
    }
    if (!isEmpty(stateInstitutions) && isEmpty(getPaymentCycleSuccess)) {
      dispatch(institutionActions.getPaymentCycles());
    }
    if (!isEmpty(stateInstitutions) && isEmpty(getStudyClassesSuccess)) {
      dispatch(institutionActions.getStudyClasses());
    }
  }, []);

  const openDeletePopup = ({ id }) => {
    let data
    if (currentTab === 'support') {
      getSupportItemSuccess.find(
        item =>
          item.institution_id === supportInstitution.id &&
          item.support_item_id === id
      )
    } else if (currentTab === "payment-cycles") {
      data = getPaymentCycleSuccess.find(
        item =>
          item.institution_id === supportInstitution.id &&
          item.payment_cycle_id === id
      )
    } else {
      // currentTab === "study-classes"
      data = getStudyClassesSuccess.find(
        item =>
          item.institution_id === supportInstitution.id &&
          item.study_level_id === id
      )
    }
    dispatch(settingActions.setDeleteData(data))
    dispatch(settingActions.showDeleteModal(true))
  }

  const handleDelete = (data) => {
      if (currentTab === 'support') {
        dispatch(institutionActions.deleteSupportItem(data.id))
      } else if (currentTab === "payment-cycles") {
        dispatch(institutionActions.deletePaymentCycle(data.id));
      } else {
        // currentTab === "study-classes"
        dispatch(institutionActions.deleteStudyClass(data.id));
      }
    }

  const onSubmitValues = ({ items, cycles, classes }) => {
    if (currentTab === "support") {
      const itemData = items.map((r) => {
        return { institution_id: supportInstitution.id, support_item_id: r };
      });
      dispatch(institutionActions.addSupportItems(itemData));
    } else if (currentTab === "payment-cycles") {
      const payData = cycles.map((r) => {
        return { institution_id: supportInstitution.id, payment_cycle_id: r };
      });
      dispatch(institutionActions.addPaymentCycles(payData));
    } else {
      // currentTab === "study-classes"
      const classData = classes.map((r) => {
        return { institution_id: supportInstitution.id, study_level_id: r };
      });
      dispatch(institutionActions.addStudyClasses(classData));
    }
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
            type="default"
            className="py-1"
            danger
            text="Delete"
          />
        );
      },
    },
  ];

  return (
    <Card className="border-0">
      <Card.Header className="p-2 text-muted">
        <Card.Title className="font600 text-sm ps-3">
          {supportInstitution.name}
        </Card.Title>
      </Card.Header>
      {itemsView === "view-values" ? (
        <DataTable
          columns={columns}
          data={
            currentTab === "support"
              && getSupportItemSuccess
                  .filter(
                    (i) =>
                      parseInt(i.institution_id, 10) ===
                      parseInt(supportInstitution.id, 10)
                  )
                  .map((y) => y.supportItem)
            || currentTab === "payment-cycles" 
              && getPaymentCycleSuccess
                  .filter(
                    (i) =>
                      parseInt(i?.institution_id, 10) ===
                      parseInt(supportInstitution.id, 10)
                  )
                  .map((y) => y.paymentCycle)
            || currentTab === "study-classes" 
              && getStudyClassesSuccess
                  .filter(
                    (i) =>
                      parseInt(i?.institution_id, 10) ===
                      parseInt(supportInstitution.id, 10)
                  )
                  .map((y) => y.studyLevel)
          }
          noHeader
          dense
          striped
          key={`${supportInstitution} ${metadata}`}
          noDataComponent={
            <DataNotFound
              message={
                isEmpty(supportInstitution)
                  ? "No Institution Has Been selected"
                  : `No ${
                      currentTab === "support" && "Support Items" ||
                      currentTab === "payment-cycles" && "Payment Cycles" ||
                      currentTab === "study-classes" && "Study Classes"
                    } found.`
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
              {(currentTab === "support" && addSupportItems ||
                currentTab === "payment-cycles" && addPaymentCycles ||
                currentTab === "study-classes" && addStudyClasses
              ).map((field) => (
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
                  text={
                    currentTab === "support" && "Add Support Items" ||
                    currentTab === "payment-cycles" && "Add Payment Cycles" ||
                    currentTab === "study-classes" && "Add Study Classes"
                  }
                  loadingText="Adding..."
                  loading={addingSupportItems || addingPaymentCycles || addingStudyClasses}
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
          deleting={deletingSupportItems || deletingPaymentCycles || deletingStudyClass}
          itemName={
            currentTab === "support" && "Item" ||
            currentTab === "payments-cycles" && "Cycle" ||
            currentTab === "payments-cycles" && "Class"}
        />
      )}
    </Card>
  );
}

SupportOptions.defaultProps = {
  currentTab: "support",
};

SupportOptions.propTypes = {
  currentTab: PropTypes.string,
};

export default SupportOptions;
