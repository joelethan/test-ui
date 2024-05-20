/* eslint-disable jsx-a11y/control-has-associated-label */
import { Form } from "antd";
import { isEmpty, sumBy, uniqBy } from "lodash";
import moment from "moment";
import PropTypes, { object } from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentOptions } from "../../Forms/beneficiary";
import {
  AntDInputText,
  FormModal,
  SubmitButton,
} from "../../components/common";
import { beneficiaryActions, institutionActions } from "../../config/actions";
import {
  formatMetadata,
  getContextItemById,
} from "../../helpers/dataFormatter";
import HasAccess from "../../components/common/HasAccess";

function DetailsModal({ showModal, data, closeModal }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const amountPay = Form.useWatch("amount_paid", form);
  const { getPaymentCycleSuccess, getSupportItemSuccess } = useSelector(
    (state) => state.institution
  );
  const { beneficiaryContext, selectedAllocation, addingAllocationPayments } =
    useSelector((state) => state.beneficiary);
  const { metadata } = useSelector((state) => state.metadata);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isEmpty(getPaymentCycleSuccess))
      dispatch(institutionActions.getPaymentCycles());
    if (isEmpty(getSupportItemSuccess))
      dispatch(institutionActions.getSupportItems());
  }, []);

  const addAllocationPayment = (pay) => {
    dispatch(
      beneficiaryActions.addAllocationPayment(
        [
          {
            ...pay,
            allocation_id: selectedAllocation.id,
            payment_date: moment(new Date()).format("LLLL"),
          },
        ],
        beneficiaryContext
      )
    );
  };

  return (
    <FormModal
      formTitle="Beneficiary Details"
      defaultShow={showModal}
      onCloseModal={closeModal}
      width={1000}
      handleSubmit={null}
      submitButtonProps={null}
      dialogClassName="modal-90w"
    >
      <div>
        <Table size="sm" bordered>
          <tbody>
            <tr>
              <td>FULL NAME</td>
              <td>{`${data.surname} ${data.other_names}`}</td>
            </tr>
            <tr>
              <td>SH ID Number</td>
              <td> {data.student_id_number}</td>
            </tr>
            <tr>
              <td>ALLOCATION ACADEMIC YEAR</td>
              <td>
                {
                  formatMetadata(metadata, "ACADEMIC YEARS").find(
                    (r) => r.value === beneficiaryContext.academic_year_id
                  ).label
                }
              </td>
            </tr>
            <tr>
              <td>PAYMENT CYCLE</td>
              <td>
                {
                  formatMetadata(metadata, "PAYMENT CYCLES").find(
                    (r) => r.value === beneficiaryContext.payment_cycle_id
                  ).label
                }
              </td>
            </tr>
            <tr>
              <td>PHONE</td>
              <td> {data.phone}</td>
            </tr>
          </tbody>
        </Table>
        <Card.Subtitle className="bg-primary text-sm text-white fw-bold text-uppercase border-0 py-2 mb-2 ps-2">
          Beneficiary Allocations
        </Card.Subtitle>
        <Row>
          <Col md={showForm ? 9 : 12}>
            <Table hover size="sm" bordered>
              <thead>
                <tr className="h6 text-sm">
                  <th>S/N</th>
                  <th>Class</th>
                  <th>Support Item(s)</th>
                  <th>Allocation Amount</th>
                  <th>Amount Paid</th>
                  <th>Amount Due</th>
                  <th style={{ textAlign: "right" }}>Options</th>
                </tr>
              </thead>
              <tbody>
                {uniqBy(data.allocations, "id")?.map((element, index) => {
                  return (
                    <tr
                      key={element.id}
                      className={`allocations-tr ${
                        selectedAllocation.id === element.id && showForm
                          ? "selected-row"
                          : ""
                      }`}
                      style={
                        selectedAllocation.id === element.id && showForm
                          ? { backgroundColor: "lightblue" }
                          : {}
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{element.class || "----"}</td>
                      <td>
                        {getContextItemById(
                          getSupportItemSuccess,
                          element.support_item_id,
                          data.inst_id
                        )}
                      </td>
                      <td>
                        {`${element.amount.toLocaleString()} UGX` || "----"}
                      </td>
                      <td>
                        {`${sumBy(
                          element.payments,
                          "amount_paid"
                        ).toLocaleString()} UGX` || "----"}
                      </td>
                      <td>
                        {`${(
                          element.amount -
                          sumBy(element.payments, "amount_paid")
                        ).toLocaleString()} UGX` || "----"}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        
                        <HasAccess allowedPermissions={["CAN ADD PAYMENTS"]}>
                          <SubmitButton
                            type="default"
                            disabled={
                              !(
                                element.amount -
                                  sumBy(element.payments, "amount_paid") >
                                0
                              )
                            }
                            text={
                              selectedAllocation.id === element.id && showForm
                                ? "Hide Form"
                                : "Add Payment"
                            }
                            danger
                            onClick={() => {
                              dispatch(
                                beneficiaryActions.setSelectedAllocation(element)
                              );
                              setShowForm(!showForm);
                            }}
                          />
                        </HasAccess>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          {showForm && (
            <Col>
              <Form
                layout="vertical"
                form={form}
                onFinish={(pay) => addAllocationPayment(pay)}
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "16px",
                  maxWidth: 600,
                }}
              >
                {addPaymentOptions.map((field) => (
                  <AntDInputText
                    key={field.name}
                    label={field.label}
                    rules={field.rules}
                    options={field?.options}
                    name={field.name}
                  />
                ))}

                <SubmitButton
                  block
                  disabled={
                    selectedAllocation.amount -
                      sumBy(selectedAllocation.payments, "amount_paid") <
                    amountPay
                  }
                  className="mt-4"
                  loading={addingAllocationPayments}
                  loadingText="Loading..."
                  text="submit"
                />
              </Form>
            </Col>
          )}
        </Row>
      </div>
    </FormModal>
  );
}

DetailsModal.defaultProps = {
  showModal: false,
};

DetailsModal.propTypes = {
  showModal: PropTypes.bool,
  data: PropTypes.oneOfType([object]).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DetailsModal;
