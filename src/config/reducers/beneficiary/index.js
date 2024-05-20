import { beneficiaryActions } from "../../actions";
import initialState from "../../initialState";

function beneficiary(state = initialState.beneficiary, actions) {
  switch (actions.type) {
    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_REQUEST:
      return {
        ...state,
        nonAcmisBeneficiaryError: {},
        gettingNonAcmisBeneficiary: true,
      };
    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_SUCCESS:
      return {
        ...state,
        nonAcmisBeneficiary: actions.data,
        gettingNonAcmisBeneficiary: false,
      };
    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARY_ERROR:
      return {
        ...state,
        nonAcmisBeneficiaryError: actions.error,
        gettingNonAcmisBeneficiary: false,
      };

    case beneficiaryActions.CREATE_ACMIS_BENEFICIARY_REQUEST:
      return {
        ...state,
        createAcmisBeneficiaryError: {},
        createdAcmisBeneficiary: {},
        creatingAcmisBeneficiary: true,
      };
    case beneficiaryActions.CREATE_ACMIS_BENEFICIARY_SUCCESS:
      return {
        ...state,
        createdAcmisBeneficiary: actions.data,
        createAcmisBeneficiaryError: {},
        creatingAcmisBeneficiary: false,
      };
    case beneficiaryActions.CREATE_ACMIS_BENEFICIARY_ERROR:
      return {
        ...state,
        createAcmisBeneficiaryError: actions.error,
        creatingAcmisBeneficiary: false,
      };

    case beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_REQUEST:
      return {
        ...state,
        createNonAcmisBeneficiaryError: {},
        creatingNonAcmisBeneficiary: true,
      };
    case beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_SUCCESS:
      return {
        ...state,
        createdNonAcmisBeneficiary: actions.data,
        createNonAcmisBeneficiaryError: {},
        creatingNonAcmisBeneficiary: false,
      };
    case beneficiaryActions.CREATE_NON_ACMIS_BENEFICIARY_ERROR:
      return {
        ...state,
        createNonAcmisBeneficiaryError: actions.error,
        creatingNonAcmisBeneficiary: false,
      };

    case beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_REQUEST:
      return {
        ...state,
        updateBeneficiaryAttachmentsError: {},
        updatedBeneficiaryAttachmentsRes: {},
        updatingBeneficiaryAttachments: true,
      };
    case beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        updatedBeneficiaryAttachmentsRes: actions.data,
        updateBeneficiaryAttachmentsError: {},
        updatingBeneficiaryAttachments: false,
      };
    case beneficiaryActions.UPDATE_BENEFICIARY_ATTACHMENTS_ERROR:
      return {
        ...state,
        updateBeneficiaryAttachmentsError: actions.error,
        updatingBeneficiaryAttachments: false,
      };

    case beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_REQUEST:
      return {
        ...state,
        updateNonAcmisBeneficiaryError: {},
        updatedNonAcmisBeneficiary: {},
        updatingNonAcmisBeneficiary: true,
      };
    case beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_SUCCESS:
      return {
        ...state,
        updatedNonAcmisBeneficiary: actions.data,
        updateNonAcmisBeneficiaryError: {},
        updatingNonAcmisBeneficiary: false,
      };
    case beneficiaryActions.UPDATE_NON_ACMIS_BENEFICIARY_ERROR:
      return {
        ...state,
        createNonAcmisBeneficiaryError: actions.error,
        creatingNonAcmisBeneficiary: false,
      };

    case beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_REQUEST:
      return {
        ...state,
        addAllocationsError: {},
        addAllocationsSuccess: {},
        addingAllocations: true,
      };
    case beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        addAllocationsSuccess: actions.data,
        addAllocationsError: {},
        addingAllocations: false,
      };
    case beneficiaryActions.ADD_BENEFICIARY_ALLOCATIONS_ERROR:
      return {
        ...state,
        addAllocationsError: actions.error,
        addingAllocations: false,
      };

    case beneficiaryActions.ADD_ALLOCATION_PAYMENT_REQUEST:
      return {
        ...state,
        addAllocationPaymentError: {},
        addAllocationPaymentSuccess: {},
        addingAllocationPayments: true,
      };
    case beneficiaryActions.ADD_ALLOCATION_PAYMENT_SUCCESS:
      return {
        ...state,
        addAllocationPaymentSuccess: actions.data,
        addAllocationPaymentError: {},
        addingAllocationPayments: false,
      };
    case beneficiaryActions.ADD_ALLOCATION_PAYMENT_ERROR:
      return {
        ...state,
        addAllocationPaymentError: actions.error,
        addingAllocationPayments: false,
      };

    case beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_REQUEST:
      return {
        ...state,
        downloadNonAcmisBeneficiariesTemplateError: {},
        downloadNonAcmisBeneficiariesTemplate: {},
        downloadingNonAcmisBeneficiariesTemplate: true,
      };
    case beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_SUCCESS:
      return {
        ...state,
        downloadNonAcmisBeneficiariesTemplate: actions.data,
        downloadNonAcmisBeneficiariesTemplateError: {},
        downloadingNonAcmisBeneficiariesTemplate: false,
      };
    case beneficiaryActions.DOWNLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_ERROR:
      return {
        ...state,
        downloadNonAcmisBeneficiariesTemplateError: actions.error,
        downloadingNonAcmisBeneficiariesTemplate: false,
      };

    case beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_REQUEST:
      return {
        ...state,
        downloadResultsTemplateError: {},
        downloadResultsTemplate: {},
        downloadingResultsTemplate: true,
      };
    case beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_SUCCESS:
      return {
        ...state,
        downloadResultsTemplate: actions.data,
        downloadResultsTemplateError: {},
        downloadingResultsTemplate: false,
      };
    case beneficiaryActions.DOWNLOAD_RESULTS_TEMPLATE_ERROR:
      return {
        ...state,
        downloadResultsTemplateError: actions.error,
        downloadingResultsTemplate: false,
      };

    case beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_REQUEST:
      return {
        ...state,
        uploadResultsTemplateError: {},
        uploadResultsTemplate: {},
        uploadingResultsTemplate: true,
      };
    case beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_SUCCESS:
      return {
        ...state,
        uploadResultsTemplate: actions.data,
        uploadResultsTemplateError: {},
        uploadingResultsTemplate: false,
      };
    case beneficiaryActions.UPLOAD_RESULTS_TEMPLATE_ERROR:
      return {
        ...state,
        uploadResultsTemplateError: actions.error,
        uploadingResultsTemplate: false,
      };

    case beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_REQUEST:
      return {
        ...state,
        uploadNonAcmisBeneficiariesTemplateError: {},
        uploadNonAcmisBeneficiariesTemplate: {},
        uploadingNonAcmisBeneficiariesTemplate: true,
      };
    case beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_SUCCESS:
      return {
        ...state,
        uploadNonAcmisBeneficiariesTemplate: actions.data,
        uploadNonAcmisBeneficiariesTemplateError: {},
        uploadingNonAcmisBeneficiariesTemplate: false,
      };
    case beneficiaryActions.UPLOAD_NON_ACMIS_BENEFICIARIES_TEMPLATE_ERROR:
      return {
        ...state,
        uploadNonAcmisBeneficiariesTemplateError: actions.error,
        uploadingNonAcmisBeneficiariesTemplate: false,
      };

    case beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_REQUEST:
      return {
        ...state,
        downloadNonAcmisPaymentsTemplateError: {},
        downloadNonAcmisPaymentsTemplate: {},
        downloadingNonAcmisPaymentsTemplate: true,
      };
    case beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_SUCCESS:
      return {
        ...state,
        downloadNonAcmisPaymentsTemplate: actions.data,
        downloadNonAcmisPaymentsTemplateError: {},
        downloadingNonAcmisPaymentsTemplate: false,
      };
    case beneficiaryActions.DOWNLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_ERROR:
      return {
        ...state,
        downloadNonAcmisPaymentsTemplateError: actions.error,
        downloadingNonAcmisPaymentsTemplate: false,
      };

    case beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_REQUEST:
      return {
        ...state,
        uploadNonAcmisPaymentsTemplateError: {},
        uploadNonAcmisPaymentsTemplate: {},
        uploadingNonAcmisPaymentsTemplate: true,
      };
    case beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_SUCCESS:
      return {
        ...state,
        uploadNonAcmisPaymentsTemplate: actions.data,
        uploadNonAcmisPaymentsTemplateError: {},
        uploadingNonAcmisPaymentsTemplate: false,
      };
    case beneficiaryActions.UPLOAD_NON_ACMIS_PAYMENTS_TEMPLATE_ERROR:
      return {
        ...state,
        uploadNonAcmisPaymentsTemplateError: actions.error,
        uploadingNonAcmisPaymentsTemplate: false,
      };

    case beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_REQUEST:
      return {
        ...state,
        addNonAcmisError: {},
        addingNonAcmisPayments: true,
      };
    case beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_SUCCESS:
      return {
        ...state,
        addNonAcmisPaymentSuccess: actions.data,
        addNonAcmisError: {},
        addingNonAcmisPayments: false,
      };
    case beneficiaryActions.ADD_NON_ACMIS_PAYMENTS_ERROR:
      return {
        ...state,
        addNonAcmisError: actions.error,
        addingNonAcmisPayments: false,
      };

    case beneficiaryActions.FETCH_PENDING_BENEFICIARIES_REQUEST:
      return {
        ...state,
        pendingBeneficiariesError: {},
        loadingPendingBeneficiaries: true,
      };
    case beneficiaryActions.FETCH_PENDING_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        pendingBeneficiariesData: actions.data,
        pendingBeneficiariesError: {},
        loadingPendingBeneficiaries: false,
      };
    case beneficiaryActions.FETCH_PENDING_BENEFICIARIES_ERROR:
      return {
        ...state,
        pendingBeneficiariesError: actions.error,
        loadingPendingBeneficiaries: false,
      };

    case beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_REQUEST:
      return {
        ...state,
        benePendingFinalApprovalError: {},
        loadingBenePendingFinalApproval: true,
      };
    case beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_SUCCESS:
      return {
        ...state,
        benePendingFinalApproval: actions.data,
        benePendingFinalApprovalError: {},
        loadingBenePendingFinalApproval: false,
      };
    case beneficiaryActions.FETCH_BENEFICIARIES_PENDING_FINAL_APPROVAL_ERROR:
      return {
        ...state,
        benePendingFinalApprovalError: actions.error,
        loadingBenePendingFinalApproval: false,
      };

    case beneficiaryActions.FETCH_PENDING_PAYMENTS_REQUEST:
      return {
        ...state,
        pendingPaymentsError: {},
        loadingPendingPayments: true,
      };
    case beneficiaryActions.FETCH_PENDING_PAYMENTS_SUCCESS:
      return {
        ...state,
        pendingPaymentsData: actions.data,
        pendingPaymentsError: {},
        loadingPendingPayments: false,
      };
    case beneficiaryActions.FETCH_PENDING_PAYMENTS_ERROR:
      return {
        ...state,
        pendingPaymentsError: actions.error,
        loadingPendingPayments: false,
      };

    case beneficiaryActions.FETCH_PENDING_ALLOCATIONS_REQUEST:
      return {
        ...state,
        pendingAllocationsError: {},
        loadingPendingAllocations: true,
      };
    case beneficiaryActions.FETCH_PENDING_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        pendingAllocationsData: actions.data,
        pendingAllocationsError: {},
        loadingPendingAllocations: false,
      };
    case beneficiaryActions.FETCH_PENDING_ALLOCATIONS_ERROR:
      return {
        ...state,
        pendingAllocationsError: actions.error,
        loadingPendingAllocations: false,
      };

    case beneficiaryActions.APPROVE_BENEFICIARIES_REQUEST:
      return {
        ...state,
        approveBeneficiariesError: {},
        approvingPendingBeneficiaries: true,
      };
    case beneficiaryActions.APPROVE_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        approveBeneficiariesRes: actions.data,
        approveBeneficiariesError: {},
        approvingPendingBeneficiaries: false,
      };
    case beneficiaryActions.APPROVE_BENEFICIARIES_ERROR:
      return {
        ...state,
        approveBeneficiariesError: actions.error,
        approvingPendingBeneficiaries: false,
      };

    case beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_REQUEST:
      return {
        ...state,
        finalBeneficiaryApprovalError: {},
        approvingBeneficiaryFinalPending: true,
      };
    case beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_SUCCESS:
      return {
        ...state,
        finalBeneficiaryApprovalRes: actions.data,
        finalBeneficiaryApprovalError: {},
        approvingBeneficiaryFinalPending: false,
      };
    case beneficiaryActions.FINAL_BENEFICIARIES_APPROVE_ERROR:
      return {
        ...state,
        finalBeneficiaryApprovalError: actions.error,
        approvingBeneficiaryFinalPending: false,
      };

    case beneficiaryActions.APPROVE_PAYMENTS_REQUEST:
      return {
        ...state,
        approvePaymentsError: {},
        approvingPendingPayments: true,
      };
    case beneficiaryActions.APPROVE_PAYMENTS_SUCCESS:
      return {
        ...state,
        approvePaymentsRes: actions.data,
        approvePaymentsError: {},
        approvingPendingPayments: false,
      };
    case beneficiaryActions.APPROVE_PAYMENTS_ERROR:
      return {
        ...state,
        approvePaymentsError: actions.error,
        approvingPendingPayments: false,
      };

    case beneficiaryActions.APPROVE_ALLOCATIONS_REQUEST:
      return {
        ...state,
        approveAllocationsError: {},
        approvingPendingAllocations: true,
      };
    case beneficiaryActions.APPROVE_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        approveAllocationsRes: actions.data,
        approveAllocationsError: {},
        approvingPendingAllocations: false,
      };
    case beneficiaryActions.APPROVE_ALLOCATIONS_ERROR:
      return {
        ...state,
        approveAllocationsError: actions.error,
        approvingPendingAllocations: false,
      };

    case beneficiaryActions.FETCH_SYSTEM_REPORTS_REQUEST:
      return {
        ...state,
        fetchSystemReportsError: {},
        fetchingSystemReports: true,
      };
    case beneficiaryActions.FETCH_SYSTEM_REPORTS_SUCCESS:
      return {
        ...state,
        fetchSystemReportRes: actions.data,
        fetchSystemReportsError: {},
        fetchingSystemReports: false,
      };
    case beneficiaryActions.FETCH_SYSTEM_REPORTS_ERROR:
      return {
        ...state,
        fetchSystemReportsError: actions.error,
        fetchingSystemReports: false,
      };

    case beneficiaryActions.FETCH_BENEFICIARY_RESULTS_REQUEST:
      return {
        ...state,
        fetchACMISResultsError: {},
        fetchingACMISResultsPayments: true,
      };
    case beneficiaryActions.FETCH_BENEFICIARY_RESULTS_SUCCESS:
      return {
        ...state,
        fetchACMISResultsError: {},
        fetchingACMISResultsPayments: false,
        fetchACMISResultsRes: {
          ...state.fetchACMISResultsRes,
          [`${actions.instCode}-${actions.studentNo}`]: actions.data,
        },
      };
    case beneficiaryActions.FETCH_BENEFICIARY_RESULTS_ERROR:
      return {
        ...state,
        fetchACMISResultsError: actions.error,
        fetchingACMISResultsPayments: false,
      };

    case beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_REQUEST:
      return {
        ...state,
        enrollemtnReportError: {},
        fetchingEnrollmentReport: true,
      };
    case beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_SUCCESS:
      return {
        ...state,
        enrollemtnReportError: {},
        fetchingEnrollmentReport: false,
        enrollmentReportRes: {
          ...state.enrollmentReportRes,
          [`${actions.code}-${actions.acadYr}${
            actions.enrollmentType ? `-${actions.enrollmentType}` : ""
          }${actions.enrollmentStatus ? `-${actions.enrollmentStatus}` : ""}`]:
            actions.data,
        },
      };
    case beneficiaryActions.FETCH_ENROLLMENT_TYPE_REPORT_ERROR:
      return {
        ...state,
        enrollemtnReportError: actions.error,
        fetchingEnrollmentReport: false,
      };

    case beneficiaryActions.GET_ACMIS_BENEFICIARIES_REQUEST:
      return {
        ...state,
        getAcmisBeneficiariesError: {},
        gettingAcmisBeneficiaries: true,
      };
    case beneficiaryActions.GET_ACMIS_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        acmisBeneficiaries: actions.data,
        getAcmisBeneficiariesError: {},
        gettingAcmisBeneficiaries: false,
      };
    case beneficiaryActions.GET_ACMIS_BENEFICIARIES_ERROR:
      return {
        ...state,
        getAcmisBeneficiariesError: actions.error,
        gettingAcmisBeneficiaries: false,
      };

    case beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_REQUEST:
      return {
        ...state,
        getTaxHeadBeneficiariesError: {},
        gettingTaxHeadBeneficiaries: true,
      };
    case beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        taxHeadBeneficiaries: actions.data,
        gettingTaxHeadBeneficiaries: false,
      };
    case beneficiaryActions.GET_TAX_CODE_ACAD_YEAR_BENEFICIARIES_ERROR:
      return {
        ...state,
        getTaxHeadBeneficiariesError: actions.error,
        gettingTaxHeadBeneficiaries: false,
      };

    case beneficiaryActions.GET_SEARCHED_BENEFICIARIES_REQUEST:
      return {
        ...state,
        getAcmisSearchedBeneficiariesError: {},
        gettingAcmisSearchedBeneficiaries: true,
      };
    case beneficiaryActions.GET_SEARCHED_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        acmisSearchedBeneficiaries: actions.data,
        gettingAcmisSearchedBeneficiaries: false,
      };
    case beneficiaryActions.GET_SEARCHED_BENEFICIARIES_ERROR:
      return {
        ...state,
        getAcmisSearchedBeneficiariesError: actions.error,
        gettingAcmisSearchedBeneficiaries: false,
      };

    case beneficiaryActions.GET_CONTEXT_BENEFICIARIES_REQUEST:
      return {
        ...state,
        contextBeneficiariesError: {},
        gettingContextBeneficiaries: true,
      };
    case beneficiaryActions.GET_CONTEXT_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        contextBeneficiaries: actions.data,
        contextBeneficiariesError: {},
        gettingContextBeneficiaries: false,
      };
    case beneficiaryActions.GET_CONTEXT_BENEFICIARIES_ERROR:
      return {
        ...state,
        contextBeneficiariesError: actions.error,
        gettingContextBeneficiaries: false,
      };

    case beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_REQUEST:
      return {
        ...state,
        searchBeneficiaryError: {},
        searchingSystemBeneficiary: true,
      };
    case beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_SUCCESS:
      return {
        ...state,
        searchedSystemBeneficiary: actions.data || {},
        searchBeneficiaryError: {},
        searchingSystemBeneficiary: false,
      };
    case beneficiaryActions.SEARCH_SYSTEM_BENEFICIARY_ERROR:
      return {
        ...state,
        searchBeneficiaryError: actions.error,
        searchingSystemBeneficiary: false,
      };

    case beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_REQUEST:
      return {
        ...state,
        institutionBeneficiariesError: {},
        gettingInstitutionBeneficiaries: true,
      };
    case beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        institutionBeneficiaries: actions.data,
        institutionBeneficiariesError: {},
        gettingInstitutionBeneficiaries: false,
      };
    case beneficiaryActions.FETCH_INSTITUTION_BENEFICIARIES_ERROR:
      return {
        ...state,
        institutionBeneficiariesError: actions.error,
        gettingInstitutionBeneficiaries: false,
      };

    case beneficiaryActions.GET_SYSTEM_DASHBOARD_REQUEST:
      return {
        ...state,
        fetchingDashboardError: {},
        fetchingDashboardReport: true,
      };
    case beneficiaryActions.GET_SYSTEM_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardReport: actions.data,
        fetchingDashboardError: {},
        fetchingDashboardReport: false,
      };
    case beneficiaryActions.GET_SYSTEM_DASHBOARD_ERROR:
      return {
        ...state,
        fetchingDashboardError: actions.error,
        fetchingDashboardReport: false,
      };

    case beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_REQUEST:
      return {
        ...state,
        fetchingInstDashboardError: {},
        fetchingInstDashboardReport: true,
      };
    case beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_SUCCESS:
      return {
        ...state,
        instDashboardReport: actions.data,
        fetchingInstDashboardError: {},
        fetchingInstDashboardReport: false,
      };
    case beneficiaryActions.GET_INST_SYSTEM_DASHBOARD_ERROR:
      return {
        ...state,
        fetchingInstDashboardError: actions.error,
        fetchingInstDashboardReport: false,
      };

    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_REQUEST:
      return {
        ...state,
        getNonAcmisBeneficiariesError: {},
        gettingNonAcmisBeneficiaries: true,
      };

    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        nonAcmisBeneficiaries: actions.data,
        getNonAcmisBeneficiariesError: {},
        gettingNonAcmisBeneficiaries: false,
      };

    case beneficiaryActions.GET_NON_ACMIS_BENEFICIARIES_ERROR:
      return {
        ...state,
        getNonAcmisBeneficiariesError: actions.error,
        gettingNonAcmisBeneficiaries: false,
      };

    case beneficiaryActions.SET_UNFILTERED_STATE_DATA:
      return {
        ...state,
        unfilteredStateData: actions.data,
      };

    case beneficiaryActions.SET_BENEFICIARY_SEARCH_PARAM:
      return {
        ...state,
        searchParam: actions.data,
      };

    case beneficiaryActions.SET_SEARCH_VALIDATION_ERRORS:
      return {
        ...state,
        searchValidationErrors: actions.error,
      };

    case beneficiaryActions.SET_SELECTED_INSTITUTION_TYPE:
      return {
        ...state,
        selectedInstitutionType: actions.data,
      };

    case beneficiaryActions.SET_SELECTED_INST_BENEFICIARIES:
      return {
        ...state,
        selectedInstBeneficiaries: actions.data,
      };

    case beneficiaryActions.SET_CREATE_BENEFICIARY_FORM:
      return {
        ...state,
        createBeneficiaryForm: actions.payload,
      };

    case beneficiaryActions.SET_FORM_DATA_TO_SEND:
      return {
        ...state,
        formDataToSend: actions.payload,
      };

    case beneficiaryActions.SET_BENEFICIARY_CONTEXT:
      return {
        ...state,
        beneficiaryContext: actions.payload,
      };

    case beneficiaryActions.SET_SELECTED_ALLOCATION:
      return {
        ...state,
        selectedAllocation: actions.payload,
      };

    case beneficiaryActions.SET_SHOW_PAY_FORM:
      return {
        ...state,
        showPayForm: actions.payload,
      };

    case beneficiaryActions.SET_SELECTED_INSTITUTION_REPORT:
      return {
        ...state,
        selectedReportInst: actions.payload,
      };

    case beneficiaryActions.SET_SELECTED_INST_TYPE_REPORT:
      return {
        ...state,
        selectedReportInstType: actions.payload,
      };

    case beneficiaryActions.SET_INSTITUTIONS_REPORT:
      return {
        ...state,
        institutionsReportLabels: actions.payload.labels,
        institutionsReportSeries: actions.payload.series,
      };

    case beneficiaryActions.SET_SUPPORT_ITEMS_REPORT:
      return {
        ...state,
        supportItemsReportLabels: actions.payload.labels,
        supportItemsReportSeries: actions.payload.series,
      };

    case beneficiaryActions.SET_DASHBOARD_YEAR:
      return {
        ...state,
        dashboardYear: actions.year,
      };

    case beneficiaryActions.SET_DASHBOARD_INSTITUTION:
      return {
        ...state,
        dashboardInstitution: actions.institutionId,
      };

    case beneficiaryActions.SET_TAX_CODE_CONTEXT:
      return {
        ...state,
        taxCodeContext: actions.context,
      };

    case beneficiaryActions.SET_SELECTED_BENEFICIARY:
      return {
        ...state,
        selectedBeneficiary: actions.payload,
      };

    case beneficiaryActions.SET_SHOW_BENEFICIARY_MODAL:
      return {
        ...state,
        showBeneficiaryModal: actions.payload,
      };

    default:
      return state;
  }
}

export default beneficiary;
