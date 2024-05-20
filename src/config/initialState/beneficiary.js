const beneficiary = {
  beneficiary: {
    nonAcmisBeneficiaryError: {},
    gettingNonAcmisBeneficiary: false,
    nonAcmisBeneficiary: {},

    createAcmisBeneficiaryError: {},
    createdAcmisBeneficiary: {},
    creatingAcmisBeneficiary: false,

    acmisBeneficiaries: [],
    acmisBeneficiariesError: {},
    gettingAcmisBeneficiaries: false,

    createNonAcmisBeneficiaryError: {},
    createdNonAcmisBeneficiary: {},
    creatingNonAcmisBeneficiary: false,

    updateBeneficiaryAttachmentsError: {},
    updatedBeneficiaryAttachmentsRes: {},
    updatingBeneficiaryAttachments: false,

    updateNonAcmisBeneficiaryError: {},
    updatedNonAcmisBeneficiary: {},
    updatingNonAcmisBeneficiary: false,

    showPayForm: false,
    selectedReportInst: "",
    selectedReportInstType: "",
    institutionsReportSeries: [],
    supportItemsReportSeries: [],
    institutionsReportLabels: [],
    supportItemsReportLabels: [],
    unfilteredStateData: [],
    createBeneficiaryForm: "beneficiary-details",
    beneficiaryContext: {},
    selectedAllocation: {},
    formDataToSend: {},
    taxCodeContext: {},
    selectedBeneficiary: {},
    showBeneficiaryModal: false,
    dashboardYear: null,
    dashboardInstitution: null,
    searchParam: {},
    searchValidationErrors: [],
    selectedInstitutionType: {},
    selectedInstBeneficiaries: { original: [], edited: [] },

    nonAcmisBeneficiaries: [],
    getNonAcmisBeneficiariesError: {},
    gettingNonAcmisBeneficiaries: false,

    downloadNonAcmisBeneficiariesTemplateError: {},
    downloadNonAcmisBeneficiariesTemplate: {},
    downloadingNonAcmisBeneficiariesTemplate: false,

    uploadNonAcmisBeneficiariesTemplateError: {},
    uploadNonAcmisBeneficiariesTemplate: {},
    uploadingNonAcmisBeneficiariesTemplate: false,

    downloadNonAcmisPaymentsTemplateError: {},
    downloadNonAcmisPaymentsTemplate: {},
    downloadingNonAcmisPaymentsTemplate: false,

    uploadNonAcmisPaymentsTemplateError: {},
    uploadNonAcmisPaymentsTemplate: {},
    uploadingNonAcmisPaymentsTemplate: false,

    taxHeadBeneficiaries: [],
    getTaxHeadBeneficiariesError: {},
    gettingTaxHeadBeneficiaries: false,

    acmisSearchedBeneficiaries: [],
    getAcmisSearchedBeneficiariesError: {},
    gettingAcmisSearchedBeneficiaries: false,

    uploadNonAcmisTemplateError: {},
    uploadNonAcmisTemplate: {},
    uploadingNonAcmisTemplate: false,

    addNonAcmisPaymentSuccess: {},
    addNonAcmisError: {},
    addingNonAcmisPayments: false,

    contextBeneficiaries: [],
    contextBeneficiariesError: {},
    gettingContextBeneficiaries: false,

    searchBeneficiaryError: {},
    searchedSystemBeneficiary: {},
    searchingSystemBeneficiary: false,

    institutionBeneficiaries: [],
    institutionBeneficiariesError: {},
    gettingInstitutionBeneficiaries: false,

    addAllocationsError: {},
    addAllocationsSuccess: {},
    addingAllocations: false,

    addAllocationPaymentError: {},
    addAllocationPaymentSuccess: {},
    addingAllocationPayments: false,

    pendingBeneficiariesData: [],
    pendingBeneficiariesError: {},
    loadingPendingBeneficiaries: false,

    benePendingFinalApproval: [],
    benePendingFinalApprovalError: {},
    loadingBenePendingFinalApproval: false,

    approveBeneficiariesRes: {},
    approveBeneficiariesError: {},
    approvingPendingBeneficiaries: false,

    finalBeneficiaryApprovalRes: {},
    finalBeneficiaryApprovalError: {},
    approvingBeneficiaryFinalPending: false,

    pendingPaymentsData: [],
    pendingPaymentsError: {},
    loadingPendingPayments: false,

    pendingAllocationsData: [],
    pendingAllocationsError: {},
    loadingPendingAllocations: false,

    approvePaymentsRes: {},
    approvePaymentsError: {},
    approvingPendingPayments: false,

    approveAllocationsRes: {},
    approveAllocationsError: {},
    approvingPendingAllocations: false,

    fetchSystemReportRes: [],
    fetchSystemReportsError: {},
    fetchingSystemReports: false,

    fetchACMISResultsRes: {},
    fetchACMISResultsError: {},
    fetchingACMISResultsPayments: false,

    enrollemtnReportError: {},
    fetchingEnrollmentReport: false,
    enrollmentReportRes: {},

    dashboardReport: {},
    fetchingDashboardError: {},
    fetchingDashboardReport: false,

    instDashboardReport: {},
    fetchingInstDashboardError: {},
    fetchingInstDashboardReport: false,
  },
  institution: {
    createInstitutionError: {},
    createInstitutionSuccess: {},
    creatingInstitution: false,

    updateInstitutionError: {},
    updateInstitutionSuccess: {},
    updatingInstitution: false,

    fetchInstitutionError: {},
    stateInstitutions: [],
    fetchingInstitution: false,

    downloadInstitutionsTemplateError: {},
    downloadInstitutionsTemplate: {},
    downloadingInstitutionsTemplate: false,

    uploadInstitutionsTemplateError: {},
    uploadInstitutionsTemplate: {},
    uploadingInstitutionsTemplate: false,

    addingSupportItems: false,
    addSupportItemError: {},
    addSupportItemSuccess: {},

    gettingSupportItems: false,
    getSupportItemError: {},
    getSupportItemSuccess: [],

    deletingSupportItems: false,
    deleteSupportItemSuccess: {},
    deleteSupportItemError: {},

    gettingPaymentCycles: false,
    getPaymentCycleError: {},
    getPaymentCycleSuccess: [],

    gettingStudyClasses: false,
    getStudyClassesError: {},
    getStudyClassesSuccess: [],

    addingPaymentCycles: false,
    addPaymentCycleError: {},
    addPaymentCycleSuccess: {},

    addingStudyClasses: false,
    addStudyClasssError: {},
    addStudyClassesSuccess: {},

    deletingPaymentCycles: false,
    deletePaymentCycleSuccess: {},
    deletePaymentCycleError: {},

    deletingStudyClass: false,
    deleteStudyClassSuccess: {},
    deleteStudyClassError: {},

    supportInstitution: {},
    institutionToEdit: {},
  },
};

export default beneficiary;
