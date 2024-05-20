import axios from "axios";
import FileSaver from "file-saver";
import { fork, put, takeLatest } from "redux-saga/effects";
import { uniqBy } from "lodash";
import { beneficiaryActions } from "../../actions";

function* createAcmisBeneficiary(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/acmis-beneficiaries",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: beneficiaryActions.CREATE_ACMIS_BENEFICIARY_SUCCESS,
      data: response,
    });
    yield put({ type: beneficiaryActions.GET_ACMIS_BENEFICIARIES_REQUEST });
    yield put({
      type: "SET_ACMIS_BENEFICIARY_VIEW",
      payload: "beneficiary-form",
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.CREATE_ACMIS_BENEFICIARY_ERROR,
      error: error.data,
    });
  }
}

function* createNonAcmisBeneficiary(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries`,
      method: "POST",
      data: actions.data.sData,
    });
    yield put({
      type: beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_SUCCESS,
      data: response,
    });
    const { id: Id } = response.result[0];
    const { id: instId } = response.result[0].institutions[0];
    yield put({
      type: beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_REQUEST,
      data: actions.data.fData,
      instId,
      Id,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_ERROR,
      error: error.data,
    });
  }
}

function* updateBeneficiaryAttachments(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries/${actions.Id}/${actions.instId}`,
      method: "PATCH",
      headers: { "Content-Type": "multipart/form-data" },
      data: actions.data,
    });
    yield put({
      type: beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_ERROR,
      error: error.data,
    });
  }
}

function* getNonAcmisBeneficiary(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries/${actions.id}`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_ERROR,
      error: error.data,
    });
  }
}

function* updateNonAcmisBeneficiary(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries/${actions.id}`,
      method: "PUT",
      data: actions.data,
    });
    yield put({
      type: beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_REQUEST,
      instId: actions.instId,
      id: actions.id,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_ERROR,
      error: error.data,
    });
  }
}

function* addBeneficiaryAllocations(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/allocations",
      method: "POST",
      data: { allocations: actions.data },
    });
    yield put({
      type: beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_ALLOCATIONS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_ERROR,
      error: error.data,
    });
  }
}

function* addAllocationPayment(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/allocated-payments",
      method: "POST",
      data: { payments: actions.data },
      // timeout: 180000,
    });
    yield put({
      type: beneficiaryActions.ADD_ALLOCATION_PAYMENT_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.SET_SHOW_PAY_FORM,
      payload: false,
    });
    yield put({
      type: beneficiaryActions.GET_CONTEXT_BENEFICIARIES_REQUEST,
      data: actions.context,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.ADD_ALLOCATION_PAYMENT_ERROR,
      error: error.data,
    });
  }
}

function* downloadNonAcmisBeneficiariesTemplate() {
  try {
    yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/download-template",
      method: "POST",
      responseType: "blob",
    }).then((response) => {
      FileSaver.saveAs(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${process.env.REACT_APP_NAME}-NON-ACMIS-BENEFICIARIES.xlsx`
      );
    });
    yield put({
      type: beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_SUCCESS,
      data: { server: { message: "File downloaded!", status: true } },
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_ERROR,
      error: error.data,
    });
  }
}

function* downloadResultsTemplate(actions) {
  const { institution_id: instId, academic_year_id: acadId } = actions.context;
  try {
    yield axios({
      url: `/beneficiary-mgt/results/download-template?institutionId=${instId}&academicYearId=${acadId}`,
      method: "POST",
      responseType: "blob",
      // timeout: 720000,
    }).then((response) => {
      FileSaver.saveAs(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${process.env.REACT_APP_NAME}-BENEFICIARY-RESULTS.xlsx`
      );
    });
    yield put({
      type: beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_SUCCESS,
      data: { server: { message: "File downloaded!", status: true } },
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
}

function* uploadResultsTemplate(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/results/upload-template",
      method: "POST",
      data: actions.data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    yield put({
      type: beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_SUCCESS,
      data: response.data,
    });
    // yield put({
    // type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_REQUEST,
    // });
  } catch (error) {
    yield put({
      type: beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
  yield put({ type: "SET_ACMIS_BENEFICIARY_TAB_VIEW", payload: "non-acmis" });
}

function* uploadNonAcmisBeneficiariesTemplate(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/upload-template",
      method: "POST",
      data: actions.data,
      headers: { "Content-Type": "multipart/form-data" },
      // timeout: 300000,
    });
    yield put({
      type: beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_SUCCESS,
      data: response.data,
    });
    // yield put({
    //   type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_REQUEST,
    // });
  } catch (error) {
    yield put({
      type: beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_ERROR,
      error: error.data,
    });
  }
  yield put({ type: "SET_ACMIS_BENEFICIARY_TAB_VIEW", payload: "non-acmis" });
}

function* downloadNonAcmisPaymentsTemplate() {
  try {
    yield axios({
      url: "/beneficiary-mgt/allocated-payments/download-template",
      method: "POST",
      responseType: "blob",
    }).then((response) => {
      FileSaver.saveAs(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${process.env.REACT_APP_NAME}-NON-ACMIS-PAYMENTS.xlsx`
      );
    });
    yield put({
      type: beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_SUCCESS,
      data: { server: { message: "File downloaded!", status: true } },
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
}

function* uploadNonAcmisPaymentsTemplate(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/allocated-payments/upload-template",
      method: "POST",
      data: actions.data,
      headers: { "Content-Type": "multipart/form-data" },
      // timeout: 300000,
    });
    yield put({
      type: beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_SUCCESS,
      data: response.data,
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_PAYMENTS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
  yield put({ type: "SET_ACMIS_BENEFICIARY_TAB_VIEW", payload: "non-acmis" });
}

function* addNonAcmisPayments(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries/payments`,
      method: "POST",
      data: actions.payload,
    });
    yield put({
      type: beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_SUCCESS,
      data: response.data,
    });
    // yield put({
    //   type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_REQUEST,
    // });
  } catch (error) {
    yield put({
      type: beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_ERROR,
      error: error.data,
    });
  }
  yield put({ type: "SET_ACMIS_BENEFICIARY_TAB_VIEW", payload: "non-acmis" });
}

function* fetchPendingBeneficiaries() {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/pending-beneficiaries",
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_BENEFICIARIES_SUCCESS,
      data: response.beneficiaries,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_PENDING_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* fetchBeneficiariesPendingFinalApproval() {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/beneficiaries-pending-final-approval",
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_SUCCESS,
      data: response.beneficiaries,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_ERROR,
      error: error.data,
    });
  }
}

function* fetchPendingPayments() {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/pending-payments",
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_PAYMENTS_SUCCESS,
      data: response.payments,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_PENDING_PAYMENTS_ERROR,
      error: error.data,
    });
  }
}

function* fetchPendingAllocations() {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/pending-allocations",
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_ALLOCATIONS_SUCCESS,
      data: response.allocations,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_PENDING_ALLOCATIONS_ERROR,
      error: error.data,
    });
  }
}

function* approveBeneficiaries(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/approve",
      method: "POST",
      data: { beneficiaries: actions.data },
    });
    yield put({
      type: beneficiaryActions.APPROVE_BENEFICIARIES_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_BENEFICIARIES_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.APPROVE_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* finalBeneficiariesApproval(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/final-approval",
      method: "POST",
      data: { beneficiaries: actions.data },
    });
    yield put({
      type: beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_ERROR,
      error: error.data,
    });
  }
}

function* approvePendingPayments(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/payments/approve",
      method: "POST",
      data: { payments: actions.data },
    });
    yield put({
      type: beneficiaryActions.APPROVE_PAYMENTS_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_PAYMENTS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.APPROVE_PAYMENTS_ERROR,
      error: error.data,
    });
  }
}

function* approvePendingAllocations(actions) {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/allocations/approve",
      method: "POST",
      data: { allocations: actions.data },
    });
    yield put({
      type: beneficiaryActions.APPROVE_ALLOCATIONS_SUCCESS,
      data: response,
    });
    yield put({
      type: beneficiaryActions.FETCH_PENDING_ALLOCATIONS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.APPROVE_ALLOCATIONS_ERROR,
      error: error.data,
    });
  }
}

function* fetchBeneficiaryResults(actions) {
  const { instCode, studentNo } = actions;
  try {
    const { result } = yield axios({
      url: `/reports-mgt/dashboard/result?student=${studentNo}&code=${instCode}`,
      method: "GET",
      // timeout: 720000,
      data: { payments: actions.data },
    });
    yield put({
      type: beneficiaryActions.FETCH_BENEFICIARY_RESULTS_SUCCESS,
      data: result,
      instCode,
      studentNo,
    });
    // yield put({
    //   type: beneficiaryActions.FETCH_PENDING_PAYMENTS_REQUEST,
    // });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_BENEFICIARY_RESULTS_ERROR,
      error: error.data,
    });
  }
}

function* fetchSystemReports() {
  try {
    const { report } = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries/allocation-summary-report`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.FETCH_SYSTEM_REPORTS_SUCCESS,
      data: report,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_SYSTEM_REPORTS_ERROR,
      error: error.data,
    });
  }
}

function* fetchEnrollmentTypeReport(actions) {
  const { enrollmentStatus, enrollmentType, code, acadYr } = actions;
  const params = Object.fromEntries(
    Object.entries({
      type: enrollmentType,
      enrollment_status: enrollmentStatus,
      currentAcademicYear: acadYr,
      code,
    }).filter(([value]) => value)
  );
  try {
    const { result } = yield axios({
      url: `/reports-mgt/dashboard/student-enrollments-details`,
      method: "GET",
      params,
    });
    yield put({
      type: beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_SUCCESS,
      data: result,
      enrollmentStatus,
      enrollmentType,
      acadYr,
      code,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_ERROR,
      error: error.data,
    });
  }
}

function* getAcmisBeneficiaries() {
  try {
    const response = yield axios({
      url: "/beneficiary-mgt/acmis-beneficiaries",
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_ACMIS_BENEFICIARIES_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_ACMIS_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* getTaxHeadBeneficiaries(actions) {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/acmis-beneficiaries/fetch-by-institution/FMUK01?entryAcademicYear=2018/2019`,
      // url: `/beneficiary-mgt/acmis-beneficiaries/fetch-by-institution/${actions.code}?entryAcademicYear=2018/2019`,
      // url: `/beneficiary-mgt/acmis-beneficiaries/fetch-by-institution/${actions.code}`,
      method: "GET",
      // timeout: 720000,
    });
    yield put({
      type: beneficiaryActions.GET_TAX_CODE_BENEFICIARIES_SUCCESS,
      data: response.data,
      code: actions.code,
    });
    if (actions.code === "FMUK01") {
      yield put({
        type: beneficiaryActions.GET_TAX_CODE_BENEFICIARIES_REQUEST,
        code: "FKYU03",
      });
    }
    if (actions.code === "FKYU03") {
      yield put({
        type: beneficiaryActions.GET_TAX_CODE_BENEFICIARIES_REQUEST,
        code: "FGUL01",
      });
    }
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_TAX_CODE_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* getTaxHeadAcadYrBeneficiaries(actions) {
  const { code, acadYr, student, searchParam } = actions;
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/acmis-beneficiaries/fetch-by-institution/${code}?entryAcademicYear=${acadYr}`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_SUCCESS,
      data: response.data,
    });
    yield put({
      type: beneficiaryActions.SET_TAX_CODE_CONTEXT,
      context: { code, acadYr, student, searchParam },
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* getAcmicSearchedBeneficiaries(actions) {
  const { code, student, acadYr, searchParam } = actions;
  try {
    const response = yield axios({
      url: `/reports-mgt/dashboard/search-student?code=${code}&student=${student}`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_SEARCHED_BENEFICIARIES_SUCCESS,
      data: response.result.data,
    });
    yield put({
      type: beneficiaryActions.SET_TAX_CODE_CONTEXT,
      context: { code, acadYr, student, searchParam },
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_SEARCHED_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

// TO BE DELETED, IT IS ABSOLUTE
function* getNonAcmisBeneficiaries() {
  try {
    const response = yield axios({
      url: `/beneficiary-mgt/non-acmis-beneficiaries`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* fetchContextBeneficiaries(actions) {
  try {
    const { beneficiaries } = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/context",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: beneficiaryActions.GET_CONTEXT_BENEFICIARIES_SUCCESS,
      data: beneficiaries,
      context: actions.data,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_CONTEXT_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* searchNonAcmisBeneficiary(actions) {
  const data = actions.data.beneficiary.includes("STH-WF")
    ? { beneficiary: actions.data.beneficiary.split("-").pop() }
    : actions.data;
  yield put({
    type: beneficiaryActions.SET_BENEFICIARY_SEARCH_PARAM,
    data: actions.data,
  });
  try {
    const { beneficiaries } = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/search",
      method: "POST",
      data,
    });
    yield put({
      type: beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_SUCCESS,
      data: beneficiaries,
      context: actions.data,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_ERROR,
      error: error.data,
    });
    yield put({
      type: beneficiaryActions.SET_BENEFICIARY_SEARCH_PARAM,
      data: null,
    });
  }
}

function* fetchInstitutionBeneficiaries(actions) {
  try {
    const { result } = yield axios({
      url: "/beneficiary-mgt/non-acmis-beneficiaries/non",
      // url: "/beneficiary-mgt/non-acmis-beneficiary-institutions",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_SUCCESS,
      data: uniqBy(result, "bene_id"),
      context: actions.data,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_ERROR,
      error: error.data,
    });
  }
}

function* fetchSystemDashboard(actions) {
  try {
    const { data } = yield axios({
      url: `/reports-mgt/dashboard?academicYearId=${actions.year}`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_SYSTEM_DASHBOARD_SUCCESS,
      data,
    });
    yield put({
      type: beneficiaryActions.SET_DASHBOARD_YEAR,
      year: actions.year,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_SYSTEM_DASHBOARD_ERROR,
      error: error.data,
    });
    yield put({
      type: beneficiaryActions.SET_DASHBOARD_YEAR,
      year: null,
    });
  }
}

function* fetchInstSystemDashboard(actions) {
  try {
    const { result } = yield axios({
      url: `/reports-mgt/dashboard/student-enrollments-summary?code=${actions.institutionId}`,
      method: "GET",
    });
    yield put({
      type: beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_SUCCESS,
      data: result,
    });
    yield put({
      type: beneficiaryActions.SET_DASHBOARD_INSTITUTION,
      institutionId: actions.institutionId,
    });
  } catch (error) {
    yield put({
      type: beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_ERROR,
      error: error.data,
    });
  }
}

function* watchGetNonAcmisBeneficiary() {
  yield takeLatest(
    beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_REQUEST,
    getNonAcmisBeneficiary
  );
}

function* watchCreateAcmisBeneficiary() {
  yield takeLatest(
    beneficiaryActions.CREATE_ACMIS_BENEFICIARY_REQUEST,
    createAcmisBeneficiary
  );
}

function* watchCreateNonAcmisBeneficiary() {
  yield takeLatest(
    beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_REQUEST,
    createNonAcmisBeneficiary
  );
}

function* watchUpdateBeneficiaryAttachments() {
  yield takeLatest(
    beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_REQUEST,
    updateBeneficiaryAttachments
  );
}

function* watchUpdateNonAcmisBeneficiary() {
  yield takeLatest(
    beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_REQUEST,
    updateNonAcmisBeneficiary
  );
}

function* watchAddBeneficiaryAllocations() {
  yield takeLatest(
    beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_REQUEST,
    addBeneficiaryAllocations
  );
}

function* watchAddAllocationPayment() {
  yield takeLatest(
    beneficiaryActions.ADD_ALLOCATION_PAYMENT_REQUEST,
    addAllocationPayment
  );
}

function* watchDownloadNonAcmisBeneficiariesTemplate() {
  yield takeLatest(
    beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_REQUEST,
    downloadNonAcmisBeneficiariesTemplate
  );
}

function* watchDownloadResultsTemplate() {
  yield takeLatest(
    beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_REQUEST,
    downloadResultsTemplate
  );
}

function* watchUploadResultsTemplate() {
  yield takeLatest(
    beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_REQUEST,
    uploadResultsTemplate
  );
}

function* watchUploadNonAcmisBeneficiariesTemplate() {
  yield takeLatest(
    beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_REQUEST,
    uploadNonAcmisBeneficiariesTemplate
  );
}

function* watchDownloadNonAcmisPaymentsTemplate() {
  yield takeLatest(
    beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_REQUEST,
    downloadNonAcmisPaymentsTemplate
  );
}

function* watchUploadNonAcmisPaymentsTemplate() {
  yield takeLatest(
    beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_REQUEST,
    uploadNonAcmisPaymentsTemplate
  );
}

function* watchAddNonAcmisPayments() {
  yield takeLatest(
    beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_REQUEST,
    addNonAcmisPayments
  );
}

function* watchFetchPendingBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.FETCH_PENDING_BENEFICIARIES_REQUEST,
    fetchPendingBeneficiaries
  );
}

function* watchFetchBeneficiariesPendingFinalApproval() {
  yield takeLatest(
    beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_REQUEST,
    fetchBeneficiariesPendingFinalApproval
  );
}

function* watchFetchPendingPayments() {
  yield takeLatest(
    beneficiaryActions.FETCH_PENDING_PAYMENTS_REQUEST,
    fetchPendingPayments
  );
}

function* watchFetchPendingAllocations() {
  yield takeLatest(
    beneficiaryActions.FETCH_PENDING_ALLOCATIONS_REQUEST,
    fetchPendingAllocations
  );
}

function* watchApproveBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.APPROVE_BENEFICIARIES_REQUEST,
    approveBeneficiaries
  );
}

function* watchFinalBeneficiariesApproval() {
  yield takeLatest(
    beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_REQUEST,
    finalBeneficiariesApproval
  );
}

function* watchApprovePendingPayments() {
  yield takeLatest(
    beneficiaryActions.APPROVE_PAYMENTS_REQUEST,
    approvePendingPayments
  );
}

function* watchApprovePendingAllocations() {
  yield takeLatest(
    beneficiaryActions.APPROVE_ALLOCATIONS_REQUEST,
    approvePendingAllocations
  );
}

function* watchFetchBeneficiaryResults() {
  yield takeLatest(
    beneficiaryActions.FETCH_BENEFICIARY_RESULTS_REQUEST,
    fetchBeneficiaryResults
  );
}

function* watchFetchSystemReports() {
  yield takeLatest(
    beneficiaryActions.FETCH_SYSTEM_REPORTS_REQUEST,
    fetchSystemReports
  );
}

function* watchFetchEnrollmentTypeReport() {
  yield takeLatest(
    beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_REQUEST,
    fetchEnrollmentTypeReport
  );
}

function* watchFetchInstitutionBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_REQUEST,
    fetchInstitutionBeneficiaries
  );
}

function* watchGetAcmisBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_ACMIS_BENEFICIARIES_REQUEST,
    getAcmisBeneficiaries
  );
}

function* watchGetTaxHeadBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_TAX_CODE_BENEFICIARIES_REQUEST,
    getTaxHeadBeneficiaries
  );
}

function* watchGetTaxHeadAcadYrBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_REQUEST,
    getTaxHeadAcadYrBeneficiaries
  );
}

function* watchGetAcmicSearchedBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_SEARCHED_BENEFICIARIES_REQUEST,
    getAcmicSearchedBeneficiaries
  );
}

function* watchNonGetAcmisBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_REQUEST,
    getNonAcmisBeneficiaries
  );
}

function* watchFetchContextBeneficiaries() {
  yield takeLatest(
    beneficiaryActions.GET_CONTEXT_BENEFICIARIES_REQUEST,
    fetchContextBeneficiaries
  );
}

function* watchSearchNonAcmisBeneficiary() {
  yield takeLatest(
    beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_REQUEST,
    searchNonAcmisBeneficiary
  );
}

function* watchFetchSystemDashboard() {
  yield takeLatest(
    beneficiaryActions.GET_SYSTEM_DASHBOARD_REQUEST,
    fetchSystemDashboard
  );
}

function* watchFetchInstSystemDashboard() {
  yield takeLatest(
    beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_REQUEST,
    fetchInstSystemDashboard
  );
}

const forkFunctions = [
  fork(watchDownloadNonAcmisBeneficiariesTemplate),
  fork(watchDownloadResultsTemplate),
  fork(watchUploadResultsTemplate),
  fork(watchFetchPendingBeneficiaries),
  fork(watchFetchBeneficiariesPendingFinalApproval),
  fork(watchFetchPendingAllocations),
  fork(watchFetchPendingPayments),
  fork(watchApproveBeneficiaries),
  fork(watchFinalBeneficiariesApproval),
  fork(watchApprovePendingPayments),
  fork(watchApprovePendingAllocations),
  fork(watchAddNonAcmisPayments),
  fork(watchGetNonAcmisBeneficiary),
  fork(watchCreateAcmisBeneficiary),
  fork(watchGetAcmisBeneficiaries),
  fork(watchGetTaxHeadBeneficiaries),
  fork(watchFetchBeneficiaryResults),
  fork(watchFetchSystemReports),
  fork(watchFetchEnrollmentTypeReport),
  fork(watchGetTaxHeadAcadYrBeneficiaries),
  fork(watchGetAcmicSearchedBeneficiaries),
  fork(watchUpdateNonAcmisBeneficiary),
  fork(watchCreateNonAcmisBeneficiary),
  fork(watchUpdateBeneficiaryAttachments),
  fork(watchAddBeneficiaryAllocations),
  fork(watchAddAllocationPayment),
  fork(watchNonGetAcmisBeneficiaries),
  fork(watchFetchContextBeneficiaries),
  fork(watchSearchNonAcmisBeneficiary),
  fork(watchFetchInstitutionBeneficiaries),
  fork(watchDownloadNonAcmisPaymentsTemplate),
  fork(watchUploadNonAcmisBeneficiariesTemplate),
  fork(watchUploadNonAcmisPaymentsTemplate),
  fork(watchFetchInstSystemDashboard),
  fork(watchFetchSystemDashboard),
];

export default forkFunctions;
