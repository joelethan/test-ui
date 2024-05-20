import { Table } from 'antd';
import { filter, isArray, isFunction, map } from 'lodash';
import PropTypes, { any, array } from 'prop-types';
import React, { useEffect, useState } from 'react';

function StateDataTable({
  columns,
  selectableRow,
  selectedRows,
  setSelectedRows,
  pageSize,
  currentPage,
  selectDisableField,
  selectDisableValue,
  hideIndex,
  data,
  xScroll,
  rowKey,
  type,
  children,
  loading,
  ...props
}) {
  const [current, setCurrent] = useState(currentPage);
  const [defaultPageSize, setDefaultPageSize] = useState(pageSize);

  let tableColumns = filter(columns, (column) => !column.hidden);

  useEffect(() => {
    if (isFunction(setSelectedRows)) setSelectedRows([]);
  }, []);

  if (!hideIndex) {
    tableColumns = [
      {
        title: 'S/N',
        key: 'index_no',
        fixed: 'left',
        width: 40,
        render: (text, row, index) => {
          return (current - 1) * defaultPageSize + index + 1;
        },
      },
      ...tableColumns,
    ];
  }

  const updateChangeOfPage = (page, size) => {
    setDefaultPageSize(size);
    setCurrent(page);
  };

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
        key: 'odd',
        text: 'Select Odd Row',
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
        key: 'even',
        text: 'Select Even Row',
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

  return (
    <Table
      dataSource={isArray(data) ? data : []}
      rowSelection={selectableRow ? rowSelection : null}
      columns={tableColumns}
      className="text-sm"
      rowClassName="text-sm p-0"
      rowKey={rowKey}
      pagination={
        data.length <= defaultPageSize
          ? false
          : {
              defaultPageSize,
              pageSize: defaultPageSize,
              total: data.length,
              pageSizeOptions: ['10', '20', '50', '100', '200', '500'],
              showSizeChanger: true,
              onChange: updateChangeOfPage,
              current,
              onShowSizeChange: updateChangeOfPage,
            }
      }
      scroll={{ y: 550, x: xScroll }}
      loading={loading}
      {...props}
    >
      {children}
    </Table>
  );
}

StateDataTable.defaultProps = {
  selectableRow: false,
  loading: false,
  data: [],
  selectedRows: [],
  xScroll: '100vw',
  pageSize: 50,
  currentPage: 1,
  setSelectedRows: null,
  selectDisableField: null,
  selectDisableValue: true,
  hideIndex: false,
  children: null,
  rowKey: 'id',
  type: 'checkbox',
};

StateDataTable.propTypes = {
  columns: PropTypes.oneOfType([array]).isRequired,
  data: PropTypes.oneOfType([any]),
  selectableRow: PropTypes.bool,
  loading: PropTypes.bool,
  hideIndex: PropTypes.bool,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  selectedRows: PropTypes.oneOfType([array]),
  setSelectedRows: PropTypes.func,
  selectDisableField: PropTypes.string,
  selectDisableValue: PropTypes.oneOfType([any]),
  children: PropTypes.oneOfType([any]),
  xScroll: PropTypes.oneOfType([any]),
  rowKey: PropTypes.string,
  type: PropTypes.string,
};

export default StateDataTable;
