import { Table } from "antd";
import { filter, map } from "lodash";
import PropTypes, { any, array } from "prop-types";
import React, { useState } from "react";
import EditableCell from "./EditableCell";

function AntDTable({
  columns,
  isEditable,
  selectableRow,
  selectedRows,
  setSelectedRows,
  pageSize,
  selectDisableField,
  selectDisableValue,
  data,
  xScroll,
  rowKey,
  type,
  idx,
  children,
  ...props
}) {
  const rowSelection = {
    selectedRows,
    selectedRowKeys: map(selectedRows, rowKey),
    onChange: (selectedRowKeys, rows) => setSelectedRows(rows),
    type,
    getCheckboxProps: (record) => {
      return {
        disabled: record[selectDisableField] === selectDisableValue,
        name: selectDisableField,
      };
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (selectedRowKeys, rows) => {
          const newSelectedRows = rows.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRows(newSelectedRows);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (selectedRowKeys, rows) => {
          const newSelectedRows = rows.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRows(newSelectedRows);
        },
      },
    ],
  };
  const rowComponents = {
    body: {
      cell: EditableCell,
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [defaultPageSize, setDefaultPageSize] = useState(pageSize);

  const indexColumn = {
    title: "S/N",
    key: "index_no",
    fixed: "left",
    width: idx,
    render: (text, row, index) => {
      return (currentPage - 1) * defaultPageSize + index + 1;
    },
  };

  const updateChangeOfPage = (page, size) => {
    setDefaultPageSize(size);
    setCurrentPage(page);
  };

  return (
    <Table
      components={isEditable ? rowComponents : null}
      dataSource={data}
      rowSelection={selectableRow ? rowSelection : null}
      columns={[
        indexColumn,
        ...filter(columns, (column) => !column.hidden).map((item) => {
          return { ...item, className: `${item.className || ""} font500` };
        }),
      ]}
      size="small"
      className="text-sm"
      rowClassName={`text-sm p-1 ${isEditable ? "editable-row" : ""}`}
      rowKey={rowKey}
      pagination={
        data.length > defaultPageSize && {
          defaultPageSize,
          pageSize: defaultPageSize,
          total: data.length,
          pageSizeOptions: ["10", "20", "50", "100", "200", "500"],
          showSizeChanger: true,
          onChange: updateChangeOfPage,
          onShowSizeChange: updateChangeOfPage,
        }
      }
      scroll={{ y: 1000, x: xScroll }}
      onRow={(record) => {
        return {
          onClick: () => setSelectedRows([record]),
        };
      }}
      {...props}
    >
      {children}
    </Table>
  );
}

AntDTable.defaultProps = {
  selectableRow: false,
  isEditable: false,
  data: [],
  selectedRows: [],
  xScroll: "100vw",
  pageSize: 50,
  idx: 50,
  setSelectedRows: () => {},
  selectDisableField: null,
  selectDisableValue: true,
  children: null,
  rowKey: "id",
  type: "checkbox",
};

AntDTable.propTypes = {
  columns: PropTypes.oneOfType([array]).isRequired,
  isEditable: PropTypes.bool,
  data: PropTypes.oneOfType([any]),
  selectableRow: PropTypes.bool,
  pageSize: PropTypes.number,
  idx: PropTypes.number,
  selectedRows: PropTypes.oneOfType([array]),
  setSelectedRows: PropTypes.func,
  selectDisableField: PropTypes.string,
  selectDisableValue: PropTypes.oneOfType([any]),
  children: PropTypes.oneOfType([any]),
  xScroll: PropTypes.string,
  rowKey: PropTypes.string,
  type: PropTypes.string,
};

export default AntDTable;
