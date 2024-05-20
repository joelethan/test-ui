import { groupBy, isEmpty, map, sumBy } from 'lodash';
import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { apexChartState } from '../ReportDashboard/format';
import { beneficiaryActions } from '../../config/actions';
import { AntDInputText, SubmitButton } from '../../components/common';
import { objectifyStringArray } from '../../helpers/dataFormatter';

function AllocatedFundsReport () {
  const dispatch = useDispatch();
  const {
    selectedReportInstType,
    selectedReportInst,
    institutionsReportLabels,
    supportItemsReportLabels,
    institutionsReportSeries,
    supportItemsReportSeries,
    fetchSystemReportRes,
    fetchSystemReportRes: {
      allocInstTypeSeries = {},
      allocInstSeries = {},
      allocInstTypeSeriesSummary = {},
      allocInstSeriesSummary = {}
    }
  } = useSelector(state => state.beneficiary);

  // System Inst Type Reports
  const instTypeAllocatedSeries = Object.values(allocInstTypeSeriesSummary);
  const instTypeAllocatedLabels = Object.keys(allocInstTypeSeriesSummary);
  const instTypeOptions = objectifyStringArray(Object.keys(allocInstTypeSeriesSummary));
  const institutionOptions = objectifyStringArray(Object.keys(allocInstSeriesSummary));

  useEffect(() => {
    // Check to load when data empty and not loading
    dispatch(beneficiaryActions.fetchSystemReports());
  }, []);

  // Set Default Institution Type Funds
  useEffect(() => {
    if (!isEmpty(allocInstTypeSeriesSummary) && isEmpty(selectedReportInstType)) {
      dispatch(beneficiaryActions.setSelectedReportInstType(Object.keys(allocInstTypeSeriesSummary)[0]));
    }
    if (!isEmpty(allocInstSeriesSummary) && isEmpty(selectedReportInst)) {
      dispatch(beneficiaryActions.setSelectedReportInst(Object.keys(allocInstSeriesSummary)[0]));
    }
  }, [allocInstTypeSeriesSummary, allocInstSeriesSummary]);

  const handleChangeType = value =>
    dispatch(beneficiaryActions.setSelectedReportInstType(value));

  const handleChangeInst = (value) =>
    dispatch(beneficiaryActions.setSelectedReportInst(value));

  useEffect(() => {
    const groupedData = groupBy(allocInstTypeSeries[selectedReportInstType], 'inst_name');
    const labels = Object.keys(groupedData);
    const series = map(Object.values(groupedData), it => sumBy(it, 'total_allocation_amount'));
    dispatch(beneficiaryActions.setInstitutionsReport({ labels, series }));
  }, [selectedReportInstType]);

  useEffect(() => {
    const groupedData = groupBy(allocInstSeries[selectedReportInst], 'support_item');
    const labels = Object.keys(groupedData);
    const series = map(Object.values(groupedData), it => sumBy(it, 'total_allocation_amount'));
    dispatch(beneficiaryActions.setSupportItemsReport({ labels, series }));
  }, [selectedReportInst]);

  // Start Bar Options
const barOptions = {
  optionsMixedChart: {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    stroke: {
      width: [4, 0, 0]
    },
    xaxis: {
      categories: []
      // categories: instAllocatedFundsLabels
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8
      }
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 100
    }
  },
  seriesMixedChart: [
    {
      name: "series-1",
      type: "line",
      data: []
      // data: instAllocatedFundsSeries
    },
    {
      name: "series-2",
      type: "column",
      data: []
      // data: instAllocatedFundsSeries
    },
    {
      name: "series-3",
      type: "column",
      data: []
      // data: instAllocatedFundsSeries
    }
  ],
  optionsRadial: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            formatter: (val) =>  val,
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Percent"]
  },
  seriesRadial: [76],
  optionsBar: {
    chart: {
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 0
    },
    xaxis: {
      categories: ["Fav Color"],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    fill: {
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.35,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [90, 0, 100]
      }
    },

    legend: {
      position: "bottom",
      horizontalAlign: "right"
    }
  },
  seriesBar: [
    {
      name: "blue",
      data: [32]
    },
    {
      name: "green",
      data: [41]
    },
    {
      name: "yellow",
      data: [12]
    },
    {
      name: "red",
      data: [65]
    }
  ]
};
// End Bar Options


  return (
    <div
      className='mt-2 mx-2'
      style={{ overflowY: "scroll", maxHeight: "85vh", overflowX: "hidden" }}
      >
      <Row className='row-deck text-center'>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold pt-3 pb-2'>
              ALLOCATED FUNDS BY INSTITUTION TYPE
            </Card.Header>
            {!isEmpty(fetchSystemReportRes) && (
              <Chart
                  options={apexChartState(instTypeAllocatedLabels, instTypeAllocatedSeries).options}
                  series={apexChartState(instTypeAllocatedLabels, instTypeAllocatedSeries).series}
                type='donut'
                width='380'
              />
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
              INSTITUTION TYPE ALLOCATED FUNDS
              <div className='card-options'>
                <SubmitButton
                  text='Details'
                  // onClick={() => setShowReportsModal({ display: true, reportType: "enrollment type" })}
                />
              </div>
            </Card.Header>
            <div className='p-3' key={selectedReportInstType} >
              <AntDInputText
                name="institution_type"
                label="Institution Type"
                inputAttributes={{
                  defaultValue: selectedReportInstType,
                  onChange: handleChangeType,
                }}
                options={instTypeOptions}
                type="select"
              />
            </div>
            {!isEmpty(fetchSystemReportRes) && (
              <Chart
                  options={apexChartState(institutionsReportLabels, institutionsReportSeries).options}
                  series={apexChartState(institutionsReportLabels, institutionsReportSeries).series}
                type='donut'
                width='380'
              />
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
            INSTITUTION ALLOCATED FUNDS
              <div className='card-options'>
                <SubmitButton
                  text='Details'
                  // onClick={() => setShowReportsModal({ display: true, reportType: "enrollment type" })}
                />
              </div>
            </Card.Header>
            <div className='p-3' key={selectedReportInst} >
              <AntDInputText
                name="institution_type"
                label="Institution"
                inputAttributes={{
                  defaultValue: selectedReportInst,
                  onChange: handleChangeInst,
                }}
                options={institutionOptions}
                type="select"
              />
            </div>
            {!isEmpty(fetchSystemReportRes) && (
              <Chart
                  options={apexChartState(supportItemsReportLabels, supportItemsReportSeries).options}
                  series={apexChartState(supportItemsReportLabels, supportItemsReportSeries).series}
                type='donut'
                width='380'
              />
            )}
          </Card>
        </Col>
        {/* Start Bar */}
        {false && <Col md={8}>
          <Card>
            <Card.Header className='text-sm text-uppercase text-center fw-bold p-2'>
              AMOUNT PAID PER INSTITUTION TYPE
            </Card.Header>
            <Chart
              options={barOptions.optionsMixedChart}
              series={barOptions.seriesMixedChart}
              type='line'
              width='500'
            />
          </Card>
        </Col>}
        {/* End Bar */}
      </Row>
    </div>
  )
}

export default AllocatedFundsReport;
