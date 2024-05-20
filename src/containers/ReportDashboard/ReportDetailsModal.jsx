import { Tag } from 'antd'
import { toLower, toUpper, uniqBy } from 'lodash'
import PropTypes, { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormModal, SearchField } from '../../components/common'
import AntDTable from '../../components/common/AntDTable'
import TabMenu from '../../components/common/TabMenu'
import { beneficiaryActions } from '../../config/actions'
import { acmisInstitutionOptions } from '../constants'
import { searchPlaceholder } from './format'
import { searchStringInArrayObject } from '../../helpers/dataFormatter'

function ReportDetailsModal ({ showModal, closeModal }) {
  const dispatch = useDispatch()
  const {
    fetchingEnrollmentReport,
    instDashboardReport,
    dashboardInstitution,
    enrollmentReportRes,
    unfilteredStateData
  } = useSelector(state => state.beneficiary)
  const [currentTab, setCurrentTab] = useState(
    showModal.reportType === 'enrollment type' ? 'enrolled' : 'FINALIST'
  )

  // fetchEnrollmentTypeReport works the same for both,
  // Just watch the positional parameters
  // instCode, acadYr, enrollmentType, enrollmentStatus
  useEffect(() => {
    if (showModal.reportType === 'enrollment type') {
      dispatch(
        beneficiaryActions.fetchEnrollmentTypeReport(
          dashboardInstitution,
          instDashboardReport.currentAcademicYEear,
          currentTab,
          null
        )
      )
    } else {
      dispatch(
        beneficiaryActions.fetchEnrollmentTypeReport(
          dashboardInstitution,
          instDashboardReport.currentAcademicYEear,
          null,
          currentTab
        )
      )
    }
  }, [currentTab])

  useEffect(() => {
    const stateData = uniqBy(
      enrollmentReportRes[
        `${dashboardInstitution}-${instDashboardReport.currentAcademicYEear}-${currentTab}`
      ]?.enrollments || [],
      'email'
    )
    dispatch(beneficiaryActions.setUnfilteredStateData(stateData))
  }, [enrollmentReportRes])

  const [displayData, setDisplayData] = useState(unfilteredStateData)

  const columns = [
    {
      title: 'NAME',
      fixed: 'left',
      render: (text, row) => {
        return (
          <>{`${toUpper(`${row.surname}`)} ${toUpper(`${row.other_names}`)}`}</>
        )
      },
      width: 100
    },
    {
      title: 'EMAIL',
      render: (text, row) => (
        <div className='italic text-xs'>{toLower(`${row?.email}`)}</div>
      ),
      width: 100
    },
    {
      title: 'STUDENT NUMBER',
      render: (text, row) => <div>{`${row?.student_number}`}</div>,
      width: 50
    },
    {
      title: 'REG NUMBER',
      render: (text, row) => (
        <div>{toUpper(`${row?.registration_number}`)}</div>
      ),
      width: 50
    },
    {
      title: 'PROG CODE',
      render: (text, row) => <div>{toUpper(`${row?.programme_code}`)}</div>,
      width: 50
    },
    {
      title: 'PROG TITLE',
      render: (text, row) => (
        <div>{toUpper(`${row?.programme_title}`)}</div>
      ),
      width: 120
    }
  ]

  const onSearch = e => {
    e.preventDefault()
    const searchKey = e.target.value
    if (searchKey.length >= 1) {
      setDisplayData(
        uniqBy(
          searchStringInArrayObject(
            unfilteredStateData,
            [
              'surname',
              'other_names',
              'email',
              'student_number',
              'registration_number'
            ],
            searchKey
          ),
          'email'
        )
      )
    } else {
      setDisplayData(unfilteredStateData)
    }
  }

  return (
    <FormModal
      formTitle='ENROLLMENT STATUS REPORT DETAILS'
      defaultShow={showModal.display}
      onCloseModal={closeModal}
      width={1000}
      handleSubmit={null}
      submitButtonProps={null}
      dialogClassName='modal-90w'
    >
      <Card>
        <TabMenu
          currentMenu={currentTab}
          setCurrentMenu={setCurrentTab}
          menus={[
            {
              title: 'ENROLLED',
              action: 'enrolled',
              hidden: showModal.reportType !== 'enrollment type'
            },
            {
              title: 'NOT ENROLLED',
              action: 'not-enrolled',
              hidden: showModal.reportType !== 'enrollment type'
            },
            {
              title: 'NEVER ENROLLED',
              action: 'never-enrolled',
              hidden: showModal.reportType !== 'enrollment type'
            },
            {
              title: 'FINALIST',
              action: 'FINALIST',
              hidden: showModal.reportType === 'enrollment type'
            },
            {
              title: 'CONTINUING STUDENT',
              action: 'CONTINUING STUDENT',
              hidden: showModal.reportType === 'enrollment type'
            },
            {
              title: 'FRESHER',
              action: 'FRESHER',
              hidden: showModal.reportType === 'enrollment type'
            },
            {
              title: 'DOING RETAKES AFTER FINAL YEAR',
              action: 'DOING RETAKES AFTER FINAL YEAR',
              hidden: showModal.reportType === 'enrollment type'
            }
          ]}
        />
        <Card.Header className='border my-2 py-2 '>
          <Tag color='processing'>
            INSTITUTION:{' '}
            <span className='fw-bold'>
              {
                acmisInstitutionOptions.find(
                  inst => inst.value === dashboardInstitution
                ).label
              }
            </span>
          </Tag>
          <Tag color='processing'>
            CURRENT ACADEMIC YEAR:{' '}
            <span className='fw-bold'>
              {instDashboardReport.currentAcademicYEear}
            </span>
          </Tag>
          <Tag color='processing'>
            NO. OF BENEFICIARIES:{' '}
            <span className='fw-bold'>
              {
                enrollmentReportRes[
                  `${dashboardInstitution}-${instDashboardReport.currentAcademicYEear}-${currentTab}`
                ]?.number
              }
            </span>
          </Tag>
          <SearchField
            placeholder={`${searchPlaceholder(currentTab)} ...`}
            onChange={onSearch}
            name='search'
            type='search'
          />
        </Card.Header>
        <AntDTable
          idx={20}
          data={displayData}
          columns={columns}
          noHeader
          striped
          virtualized
          rowClassName='text-sm'
          rowKey='id'
          loading={fetchingEnrollmentReport}
          bordered
          size='small'
        />
      </Card>
    </FormModal>
  )
}

ReportDetailsModal.defaultProps = {
  showModal: { display: false, reportType: '' }
}

ReportDetailsModal.propTypes = {
  showModal: PropTypes.oneOfType([object]),
  closeModal: PropTypes.func.isRequired
}

export default ReportDetailsModal
