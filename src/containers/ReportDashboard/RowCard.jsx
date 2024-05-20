import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { sumBy, toLower } from "lodash";

function RowCard({tab}) {
  const {
  dashboardReport: { summary },
  instDashboardReport
} = useSelector(state => state.beneficiary)

const acadData = [
  {
    name: 'No. of Beneficiaries',
    number: summary?.numberOfBeneficiaries || '---'
  },
  {
    name: 'No. of Male Beneficiaries',
    number:
      summary?.genderSummary.find(item => item.gender === 'MALE')
        .beneficiaries || '---'
  },
  {
    name: 'No. of Female Beneficiaries',
    number:
      summary?.genderSummary.find(item => item.gender === 'FEMALE')
        .beneficiaries || '---'
  }
]

const instData = [
  {
    name: 'No. of Beneficiaries',
    number: instDashboardReport.numberOfBeneficiaries || '---'
  },
  {
    name: 'No. of Male Beneficiaries',
    number: sumBy(instDashboardReport?.genderSummary?.filter(dt => toLower(dt.gender) === "male"), "beneficiaries") || '---'
  },
  {
    name: 'No. of Female Beneficiaries',
    number: sumBy(instDashboardReport?.genderSummary?.filter(dt => toLower(dt.gender) === "female"), "beneficiaries") || '---'
  }
]

  return (
    <Row className="row-deck g-2 text-center text-muted">
      {(tab === "academic-year" ? acadData : instData).map((item) => (
        <Col className="mb-2" md key={item.name}>
          <Card>
            <Card.Body>
              <Card.Text className="text-sm text-uppercase fw-bold mb-2">
                {item.name}
              </Card.Text>
              <span className="text-success fw-bold mx-1">{item.number}</span>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

RowCard.defaultProps = {
  tab: "academic-year"
};

RowCard.propTypes = {
  tab: PropTypes.string,
};

export default RowCard;
