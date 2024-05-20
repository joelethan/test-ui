/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// import React from 'react'

// function EditableRow() {
//   return (
//     <div>EditableRow</div>
//   )
// }

// export default EditableRow

import { Form, Input, InputNumber, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { orderBy, toUpper } from "lodash";
import { useSelector } from "react-redux";
import AntDTable from "../../../components/common/AntDTable";
import { formatSHNumber } from "../../../helpers/dataFormatter";

// const originData = [];
// for (let i = 0; i < 100; i += 1) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
function EditableCell({
  editing,
  editable,
  dataIndex,
  title,
  edit,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => edit(record);

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `Please Input ${title}!`,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
          type="number"
          ref={inputRef}
          onPressEnter={() => {}}
          onBlur={() => {}}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

function EditableRowApp() {
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const { gettingInstitutionBeneficiaries, institutionBeneficiaries } =
    useSelector((state) => state.beneficiary);
  const edit = (record) => {
    form.setFieldsValue({
      outstanding_amount: 100000,
      tuition_sem_1: 1200000,
      tuition_sem_2: 1000000,
      functional_fees: 200000,
      itcsp: 200000,
      accommodation: 200000,
      graduation: 200000,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns0 = [
    {
      title: "FULL NAME",
      fixed: true,
      render: (text, row) => (
        <>{toUpper(`${row.surname} ${row.other_names}`)}</>
      ),
      width: 200,
    },
    {
      title: "SH ID NUMBER",
      fixed: true,
      render: (text, row) => (
        <>{toUpper(`${formatSHNumber(row.bene_id) || "-"}`)}</>
      ),
      width: 200,
    },
    {
      title: (
        <div>
          OUTSTANDING
          <br />
          2021/2022
        </div>
      ),
      dataIndex: "outstanding_amount",
      render: (text, row) => <>0.00</>,
      editable: true,
      width: 200,
    },
    {
      title: (
        <>
          TUITION SEM I
          <br />
          2022/2023
        </>
      ),
      dataIndex: "tuition_sem_1",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: (
        <>
          TUITION SEM II
          <br />
          2022/2023
        </>
      ),
      dataIndex: "tuition_sem_2",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: <>FUNCTIONAL FEES</>,
      dataIndex: "functional_fees",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: "ITCSP",
      dataIndex: "itcsp",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: "ACCOMMODATION",
      dataIndex: "accommodation",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: "GRAD",
      dataIndex: "graduation",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
    {
      title: "TOTAL",
      render: (text, row) => <>0.00</>,
      editable: true,
    },
  ];

  const columns1 = columns0.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        edit,
        editable: col.editable,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      {/* <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        size="small"
        className="text-sm"
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      /> */}
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={orderBy(institutionBeneficiaries, [
          "surname",
          "other_names",
        ])}
        size="small"
        className="text-sm"
        columns={columns1}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      {/* <AntDTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={columns1}
        data={orderBy(institutionBeneficiaries, ["surname", "other_names"])}
        virtualized
        pageSize={10}
        // loading={gettingInstitutionBeneficiaries && isEmpty(displayData)}
        rowClassName="editable-row"
        bordered
        size="small"
      /> */}
    </Form>
  );
}
export default EditableRowApp;
