import { groupBy, max, sumBy, toLower, toUpper } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { BsPeopleFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { useSelector } from "react-redux";
import AntDTable from "../../components/common/AntDTable";

function SingleInstitutionBeneficiaries({ institution }) {
  const { taxHeadBeneficiaries } = useSelector((state) => state.beneficiary);

  const columns = [
    {
      title: "NAME",
      fixed: "left",
      render: (text, row) => (
        <>
          {toUpper(
            `${row.bio_data.student.surname} ${row.bio_data.student.other_names}`
          )}
        </>
      ),
      width: 150,
    },
    {
      title: "EMAIL",
      render: (text, row) => (
        <>{toLower(`${row.bio_data.student.email}`)}</>
      ),
      width: 200,
    },
    {
      title: "REG. NUMBER",
      render: (text, row) => (
        <>{toUpper(`${row.bio_data.registration_number}`)}</>
      ),
      width: 100,
    },
    {
      title: "STD NUMBER",
      render: (text, row) => (
        <>{toUpper(`${row.bio_data.student_number}`)}</>
      ),
      width: 100,
    },
    {
      title: "AMOUNT PAID",
      render: (text, row) => (
        <>{`${parseInt(row.amount, 10).toLocaleString()} ${
          row?.sponsorTransaction?.currency || ''
        }`}</>
      ),
      width: 100,
    },
    {
      title: "URA PRN",
      render: (text, row) => <>{`${row?.sponsorTransaction?.ura_prn}`}</>,
      width: 100,
    },
    {
      title: "PROGRAMME COURSE",
      render: (text, row) => (
        <>{toUpper(`${row.bio_data.programme.programme_title}`)}</>
      ),
      width: 180,
    },
  ];

  return (
    <>
      <Accordion defaultActiveKey={0} key={institution}>
        {Object.keys(taxHeadBeneficiaries[institution]).map((item, index) => {
          const progs = groupBy(
            taxHeadBeneficiaries[institution][item].records,
            "bio_data.programme_id"
          );
          const arr = Object.keys(progs).map((key) => {
            return sumBy(progs[key], "amount");
          });
          const maxProg = Object.values(progs)[arr.indexOf(max(arr))];
          const data = [
            {
              title: "Total Amount Allocated",
              value: `${sumBy(
                taxHeadBeneficiaries[institution][item].records,
                "amount"
              ).toLocaleString()} UGX`,
              color: "red",
              icon: <FaMoneyBill size={20} className="db-red" />,
            },
            {
              title: "No. of Sponsored Students",
              value: taxHeadBeneficiaries[institution][item].records.length,
              color: "blue",
              icon: <BsPeopleFill size={20} className="db-blue" />,
            },
            {
              title: `Most sponsored Prog (${maxProg[0].bio_data.programme.programme_code})`,
              value: `${sumBy(maxProg, "amount").toLocaleString()} UGX`,
              color: "purple",
              icon: <ImBooks size={20} className="db-purple" />,
            },
          ];
          return (
            <Accordion.Item eventKey={index} key={item}>
              <Accordion.Header>
                {taxHeadBeneficiaries[institution][item].academic_year}
              </Accordion.Header>
              <Accordion.Body>
                <Row className="text-uppercase">
                  {data.map((row) => (
                    <Col key={row.title}>
                      <Card>
                        <Card.Header
                          className={`font600 text-sm border-0 py-2 db-${row.color} db-l-${row.color}`}
                        >
                          {row.title}
                        </Card.Header>
                        <Card.Header className="font400 px-3 text-muted text-xs">
                          {row.value}
                        </Card.Header>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <AntDTable
                  columns={columns}
                  data={taxHeadBeneficiaries[institution][item].records}
                  virtualized
                  pageSize={10}
                  rowClassName="text-sm"
                  bordered
                  size="small"
                />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
}

SingleInstitutionBeneficiaries.propTypes = {
  institution: PropTypes.string.isRequired,
};

export default SingleInstitutionBeneficiaries;
