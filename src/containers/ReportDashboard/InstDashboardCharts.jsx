import { isEmpty, sumBy, toLower } from 'lodash';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SubmitButton } from '../../components/common';
import { apexChartState } from './format';
import ReportDetailsModal from './ReportDetailsModal';

function IntDashboardCharts () {
  const { instDashboardReport } = useSelector(state => state.beneficiary)
  const [showReportsModal, setShowReportsModal] = useState({display: false, reportType: ""})
  const enrollLabel = ['Enrolled', 'Not Enrolled', 'Never Enrolled']
  const enrollData = [
    instDashboardReport.currentEnrollment,
    instDashboardReport.notEnrolledInCurrentAY,
    instDashboardReport.neverEnrolled
  ]

  const statusLabel = instDashboardReport?.enrollmentStatus?.map(
    dt => dt.enrollment_status
  )
  const statusData = instDashboardReport?.enrollmentStatus?.map(
    dt => dt.beneficiaries
  )

  const genderLabel = ['MALE', 'FEMALE']
  const genderData = [
    sumBy(
      instDashboardReport?.genderSummary?.filter(
        dt => toLower(dt.gender) === 'male'
      ),
      'beneficiaries'
    ),
    sumBy(
      instDashboardReport?.genderSummary?.filter(
        dt => toLower(dt.gender) === 'female'
      ),
      'beneficiaries'
    )
  ]

  return (
    <>
      <Row className='row-deck text-center'>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
              Current academic year enrollments
              <div className='card-options'>
                <SubmitButton
                  disabled={isEmpty(instDashboardReport)}
                  text='View Details'
                  onClick={() => setShowReportsModal({ display: true, reportType: "enrollment type" })}
                />
              </div>
            </Card.Header>
            {!isEmpty(instDashboardReport) && (
              <Chart
                options={apexChartState(enrollLabel, enrollData).options}
                series={apexChartState(enrollLabel, enrollData).series}
                type='donut'
                width='380'
              />
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
              enrollment status report
              <div className='card-options'>
                <SubmitButton
                  disabled={isEmpty(instDashboardReport)}
                  text='View Details'
                  onClick={() => setShowReportsModal({ display: true, reportType: "enrollment status" })}
                />
              </div>
            </Card.Header>
            {!isEmpty(instDashboardReport) && (
              <Chart
                options={apexChartState(statusLabel, statusData).options}
                series={apexChartState(statusLabel, statusData).series}
                type='donut'
                width='380'
              />
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
              Gender status report
              <div className='card-options'>
                <SubmitButton disabled text='View Details' />
              </div>
            </Card.Header>
            {!isEmpty(instDashboardReport) && (
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
      {showReportsModal.display && 
        <ReportDetailsModal
          showModal={showReportsModal}
          closeModal={() => setShowReportsModal({ display: false, reportType: "" })}
        />}
    </>
  )
}

export default IntDashboardCharts
