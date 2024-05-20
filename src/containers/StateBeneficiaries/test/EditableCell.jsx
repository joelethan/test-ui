/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table } from "antd";
import { useSelector } from "react-redux";
import { toUpper } from "lodash";
import { formatSHNumber } from "../../../helpers/dataFormatter";

const EditableContext = React.createContext(null);
function EditableRow({ index, ...props }) {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}
function EditableCell({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) {
  const dataKey = record?.id;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataKey]: toUpper(`${formatSHNumber(record.bene_id) || "-"}`),
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataKey}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

function EditableCellApp() {
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);

  const { institutionBeneficiaries } = useSelector(
    (state) => state.beneficiary
  );
  //   const [count, setCount] = useState(2);
  //   const handleDelete = (key) => {
  //     const newData = dataSource.filter((item) => item.key !== key);
  //     setDataSource(newData);
  //   };
  const defaultColumns = [
    {
      title: "FULL NAME",
      render: (text, row) => (
        <>{toUpper(`${row.surname} ${row.other_names}`)}</>
      ),
      width: "30%",
    },
    {
      title: "SH ID NUMBER",
      render: (text, row) => (
        <>{toUpper(`${formatSHNumber(row.bene_id) || "-"}`)}</>
      ),
      editable: true,
    },
    {
      title: "ID",
      render: (text, row) => <>{row.bene_id}</>,
      editable: true,
    },

    // {
    //   title: 'name',
    //   dataIndex: 'name',
    //   width: '30%',
    //   editable: true,
    // },
    // {
    //   title: 'age',
    //   dataIndex: 'age',
    // },
    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm
    //         title="Sure to delete?"
    //         onConfirm={() => handleDelete(record.key)}
    //       >
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];
  //   const handleAdd = () => {
  //     const newData = {
  //       key: count,
  //       name: `Edward King ${count}`,
  //       age: "32",
  //       address: `London, Park Lane no. ${count}`,
  //     };
  //     setDataSource([...dataSource, newData]);
  //     setCount(count + 1);
  //   };

  const [dataSourceApp] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      {/* <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row

      </Button> */}
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={institutionBeneficiaries}
        // dataSource={dataSourceApp}
        columns={columns}
      />
    </div>
  );
}

export default EditableCellApp;
