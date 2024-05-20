import { isEmpty } from 'lodash';
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { apexChartState } from './format';

function DashboardCharts () {
  const {
    dashboardReport,
    dashboardReport: { summary }
  } = useSelector(state => state.beneficiary)

  const beneLabel = summary?.summaryInstitutionType?.map(
    item => item.institution_type
  )
  const beneSeries = summary?.summaryInstitutionType?.map(
    item => item.beneficiaries
  )
  const amountSeries = summary?.summaryInstitutionType?.map(
    item => item.allocation_amount
  )

  const genderLabel = ["MALE", "FEMALE"];
  const genderData = [
    summary?.genderSummary.find(item => item.gender === 'MALE').beneficiaries,
    summary?.genderSummary.find(item => item.gender === 'FEMALE').beneficiaries
  ]

  return (
    <Row className='row-deck text-center'>
      <Col md={4}>
        <Card>
          <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
            BENEFICIARIES BY INSTITUTION TYPE
          </Card.Header>
          {!isEmpty(dashboardReport) && (
            <Chart
              options={apexChartState(beneLabel, beneSeries).options}
              series={apexChartState(beneLabel, beneSeries).series}
              type='donut'
              width='380'
            />
          )}
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
            AMOUNT PAID PER INSTITUTION TYPE
          </Card.Header>
          {!isEmpty(dashboardReport) && (
            <Chart
              options={apexChartState(beneLabel, amountSeries).options}
              series={apexChartState(beneLabel, amountSeries).series}
              type='donut'
              width='380'
            />
          )}
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
            BENEFICIARIES BY GENDER
          </Card.Header>
          {!isEmpty(dashboardReport) && (
            <Chart
              options={apexChartState(genderLabel, genderData).options}
              series={apexChartState(genderLabel, genderData).series}
              type='donut'
              width='380'
            />
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardCharts
