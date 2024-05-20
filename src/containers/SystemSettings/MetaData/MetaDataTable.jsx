import { isEmpty, orderBy } from "lodash";
import PropTypes, { array } from "prop-types";
import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { DataNotFound, DataSpinner } from "../../../components/common";
import darkHeader from "../../../helpers/dataTableCustomStyle";

function MetaDataTable({ metadata, handleRowClick, loading }) {
  const { selectedMetadata } = useSelector((state) => state.metadata);
  const conditionalRowStyles = [
    {
      when: (row) => row.id === selectedMetadata?.id,
      style: {
        backgroundColor: "var(--bs-gray)",
      },
    },
  ];
  return (
    <DataTable
      data={orderBy(metadata, ["metadata_name"])}
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
          name: "METADATA",
          selector(row) {
            return row?.metadata_name;
          },
          wrap: true,
        },
        {
          name: "TYPE",
          width: "100",
          selector(row) {
            return row?.metadata_type;
          },
          right: true,
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
      progressPending={loading && isEmpty(metadata)}
      progressComponent={<DataSpinner />}
      noDataComponent={<DataNotFound message="No Metadata Found..." />}
    />
  );
}

MetaDataTable.propTypes = {
  metadata: PropTypes.oneOfType([array]).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MetaDataTable;
