import { isEmpty } from "lodash";
import PropTypes, { object } from "prop-types";
import React from "react";
import { DataNotFound } from "../../components/common";
import AntDTable from "../../components/common/AntDTable";

function BeneficiaryDetailsExpanded({ data }) {
  return (
    <div>
      {isEmpty(data.payments) ? (
        <DataNotFound message="No Payments found" />
      ) : (
        <AntDTable
          idx={10}
          data={data.payments}
          columns={[
            {
              title: "(CODE) INSTITUTION",
              dataIndex: "institution_id",
              render: () =>
                `(${data.institution.code}) - ${data.institution.name}`,
              width: 50,
            },
            {
              title: "SUPPORT ITEM",
              dataIndex: "support_id",
              render: () => `${data.supportItem.metadata_value}`,
              width: 50,
            },
            {
              title: "AMOUNT PAID",
              dataIndex: "amount_paid",
              render: (amount) => (amount ? amount.toLocaleString() : 0),
              width: 50,
            },
            {
              title: "AMOUNT DUE",
              dataIndex: "amount_due",
              render: (amount) => (amount ? amount.toLocaleString() : 0),
              width: 50,
            },
            // {
            //   title: 'UNALLOCATED',
            //   dataIndex: 'unallocated_amount',
            //   render: amount => (amount ? amount.toLocaleString() : 0),
            //   width: 120
            // },
            // {
            //   title: 'CURRENCY',
            //   dataIndex: 'currency',
            //   width: 100
            // },
            // {
            //   title: 'MODE REF.  NO.',
            //   dataIndex: 'mode_reference',
            //   width: 150
            // },
            // {
            //   title: 'BANK',
            //   dataIndex: 'bank_name',
            //   width: 100
            // },
            // {
            //   title: 'BANK BRANCH',
            //   dataIndex: 'bank_branch',
            //   width: 200
            // },
            // {
            //   title: 'PAYMENT DATE',
            //   dataIndex: 'payment_date',
            //   render: paymentDate => moment(paymentDate).format('YYYY-MM-DD'),
            //   width: 120
            // },
            // {
            //   title: 'ACTION',
            //   key: 'action',
            //   fixed: 'right',
            //   render: actionButton,
            //   width: 120
            // }
          ]}
        />
      )}
    </div>
  );
}

BeneficiaryDetailsExpanded.defaultProps = {
  data: {},
};

BeneficiaryDetailsExpanded.propTypes = {
  data: PropTypes.oneOfType([object]),
};

export default BeneficiaryDetailsExpanded;
