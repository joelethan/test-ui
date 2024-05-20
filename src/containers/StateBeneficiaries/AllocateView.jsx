/* eslint-disable camelcase */
import { Form } from "antd";
import PropTypes, { object } from "prop-types";
import React, { useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { FaBackward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { allocationOptions } from "../../Forms/beneficiary";
import { SubmitButton } from "../../components/common";
import AntDRows from "../../components/common/AntDRows";
import { beneficiaryActions } from "../../config/actions";

function AllocateView({ data, closeModal }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { stateInstitutions } = useSelector((state) => state.institution);
  const { addingAllocations, beneficiaryContext } = useSelector(
    (state) => state.beneficiary
  );
  const { payment_cycle_id, academic_year_id } = beneficiaryContext;
  const [rows, setRows] = useState(1);

  const onSubmit = (sub) => {
    const sendData = [];
    const amounts = Object.keys(sub).filter((v) => v.startsWith("amount"));
    amounts.map((_, i) => {
      sendData.push({
        support_item_id: sub[`support_item_id+${i}`],
        amount: sub[`amount+${i}`],
        class: sub[`class+${i}`],
      });
      return sendData;
    });
    const reqData = sendData.map((dt) => {
      return {
        ...dt,
        payment_cycle_id,
        academic_year_id,
        institution_id: data.inst_id,
        beneficiary_id: data.id,
      };
    });
    dispatch(
      beneficiaryActions.addBeneficiaryAllocations(reqData, beneficiaryContext)
    );
  };

  return (
    <div className="m-3 border p-2">
      <Card.Header className="bg-primary text-sm text-white fw-bold text-uppercase border-0 py-2 mb-2">
        Create Allocations
        <div className="ps-2 card-options">
          <SubmitButton
            iconBefore={<FaBackward />}
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
            className="my-0 me-3"
            text="Back"
          />
          <SubmitButton
            onClick={(e) => {
              e.preventDefault();
              setRows((prev) => prev + 1);
            }}
            className="my-0"
            text="Add Row"
          />
        </div>
      </Card.Header>
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
            <td>INSTITUTION</td>
            <td>
              {
                stateInstitutions.find(
                  (t) => parseInt(t.id, 10) === parseInt(data.inst_id, 10)
                )?.name
              }
            </td>
          </tr>
        </tbody>
      </Table>
      <div
        style={{ overflowY: "scroll", maxHeight: "40vh", overflowX: "hidden" }}
      >
        <Form
          onFinish={onSubmit}
          form={form}
          labelCol={{
            span: 8,
            className: "text-sm",
          }}
          labelAlign="left"
          layout="horizontal"
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          className="my-2"
        >
          <Row>
            <Col md={1} />
            <Col md={10}>
              <AntDRows
                context
                col={0}
                key={rows}
                fields={allocationOptions}
                rows={rows}
                setRows={setRows}
                rowDetails="pay"
                instId={data.inst_id}
              />
            </Col>

            <Col md={1} />
            <Col md={2} />
            <Col md={8} />
            <Col md={1}>
              <SubmitButton
                loadingText="Adding..."
                loading={addingAllocations}
                text="Submit"
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

AllocateView.defaultProps = {};

AllocateView.propTypes = {
  data: PropTypes.oneOfType([object]).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AllocateView;
