import { Form } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { AiOutlineInsertRowBelow } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { dashboardOptions, taxCodeOptions } from "../../Forms/beneficiary";
import { AntDInputText, SubmitButton } from "../../components/common";
import {
  beneficiaryActions,
  metadataActions
} from "../../config/actions";
import {
  currentFinancialYear,
  formatMetadata,
} from "../../helpers/dataFormatter";
import DashboardCharts from "./DashboardCharts";
import RowCard from "./RowCard";
import TabMenu from "../../components/common/TabMenu";
import { acmisInstitutionOptions } from "../constants";
import IntDashboardCharts from "./InstDashboardCharts";

function ReportDashboard() {
  const today = new Date();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { metadata } = useSelector((state) => state.metadata);
  const { authUser } = useSelector((state) => state.runningAdmission);
  const {
    fetchingInstDashboardReport,
    fetchingDashboardReport,
    dashboardYear: academicYearId,
    dashboardInstitution,
    instDashboardReport
  } = useSelector((state) => state.beneficiary);

  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [currentTab, setCurrentTab] = useState("academic-year")

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
  }, []);

  useEffect(() => {
    const currentYr = academicYearOptions.find(
      (item) => item.label === currentFinancialYear(today)
    );
    if (!academicYearId && currentYr) {
      form.setFieldsValue({ academicYearId: currentYr.value });
      // dispatch(beneficiaryActions.fetchSystemDashboard(currentYr.value));
    } else {
      form.setFieldsValue({ academicYearId, institutionId: dashboardInstitution });
    }
    form.setFieldsValue({ institutionId: dashboardInstitution });
  }, [today]);

  useEffect(() => {
    setAcademicYearOptions(formatMetadata(metadata, "ACADEMIC YEARS"));
  }, [metadata]);

  const options = (fieldName, _default) => {
    if (fieldName === "academicYearId") {
      return academicYearOptions;
    }
    if (fieldName === "institutionId") {
      return acmisInstitutionOptions;
    }
    return _default;
  };

  return (
    <div>
      <Card key={authUser?.id}>
        <Card.Header className="bg-white text-sm text-primary fw-bold py-2">
          <AiOutlineInsertRowBelow className="me-1" />
          DASHBOARD
          {/* <div className="card-options">
            <ReloadButton
              loading={gettingAuthUser || gettingStateHouseUsers}
              onClick={getStateHouseUsers}
            />
          </div> */}
        </Card.Header>
        <Card.Body>

        <TabMenu
          currentMenu={currentTab}
          setCurrentMenu={setCurrentTab}
          menus={[
            {
              title: "ACADEMIC YEAR SUMMARY",
              action: "academic-year",
            },
            {
              title: "INSTITUTION SUMMARY",
              action: "institution",
            },
          ]}
        />
          <Form
            onFinish={({ academicYearId: acadYear, institutionId }) => {
              if(currentTab === "academic-year") {
                if (academicYearId === null) dispatch(beneficiaryActions.setDashboardYear(acadYear));
                dispatch(beneficiaryActions.fetchSystemDashboard(acadYear));
              } else {
                dispatch(beneficiaryActions.fetchInstSystemDashboard(institutionId));
              }
            }}
            className="w-100"
            form={form}
          >
            <Row>
              <Col />
              {(currentTab === "academic-year" ? dashboardOptions:taxCodeOptions.filter(iy=>iy.label==="Institution")).map((field) => (
                <Col md={4} key={field.name} className="mt-3">
                  <AntDInputText
                    label={field.label}
                    rules={field.rules}
                    options={options(field.name, field?.options)}
                    name={field.name}
                    type="select"
                  />
                </Col>
              ))}
              <Col className="my-auto">
                <SubmitButton
                  block
                  className="mb-2"
                  loading={fetchingDashboardReport || fetchingInstDashboardReport}
                  loadingText="Loading..."
                  text="submit"
                />
              </Col>
              <Col />
            </Row>
          </Form>
          <div className="vertical-scroll">
            {currentTab !== "academic-year" && !isEmpty(instDashboardReport) && <Card.Header className="border p-2 mb-3 text-uppercase text-sm fw-bold">{`Enrollment Reports for the Current Academic Year: ${instDashboardReport.currentAcademicYEear}`}</Card.Header>}
            <RowCard tab={currentTab} />
            {currentTab === "academic-year" && <DashboardCharts />}
            {currentTab === "institution" && <IntDashboardCharts />}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReportDashboard;
