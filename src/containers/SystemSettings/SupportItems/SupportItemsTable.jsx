import { isEmpty, orderBy } from "lodash";
import PropTypes, { array } from "prop-types";
import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { DataNotFound, DataSpinner } from "../../../components/common";
import darkHeader from "../../../helpers/dataTableCustomStyle";

function SupportItemsTable({ institutions, handleRowClick, loading }) {
  const { supportInstitution } = useSelector((state) => state.institution);

  const conditionalRowStyles = [
    {
      when: (row) => row.id === supportInstitution?.id,
      style: {
        backgroundColor: "var(--bs-gray)",
      },
    },
  ];

  return (
    <DataTable
      data={orderBy(institutions, ["code"])}
      columns={[
        {
          name: "S/N",
          sortable: true,
          width: "60px",
          cell(row, index) {
            return index + 1;
          },
        },
        {
          name: "CODE",
          width: "120PX",
          selector(row) {
            return row?.code;
          },
        },
        {
          name: "INSTITUTION",
          selector(row) {
            return row?.name;
          },
          // right: true,
          wrap: true,
        },
      ]}
      height={500}
      onRowClicked={(data) => handleRowClick(data)}
      bordered
      dense
      noHeader
      highlightOnHover
      striped
      pointerOnHover
      fixedHeader
      fixedHeaderScrollHeight="70vh"
      customStyles={darkHeader}
      conditionalRowStyles={conditionalRowStyles}
      progressPending={loading && isEmpty(institutions)}
      progressComponent={<DataSpinner />}
      noDataComponent={<DataNotFound message="No Institutions Found..." />}
    />
  );
}
SupportItemsTable.propTypes = {
  institutions: PropTypes.oneOfType([array]).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default SupportItemsTable;
