const admission = {
  runningAdmission: {

    submittingForm: false,
    submitError: {},
    submittedForm: {},
    myApplicationForms: [],

    programmes: [],
    gettingProgrammes: false,
    getProgrammesError: {},

    gettingStateHouseUsers: false,
    stateHouseUsersError: {},
    stateHouseUsers: [],

    gettingPendingUsers: false,
    pendingStateHouseUsers: [],
    pendingUsersError: {},

    usersPendingFinal: [],
    pendingFinalApprovalError: {},
    gettingUsersPendingFinal: false,

    gettingUserById: false,
    userByIdError: {},
    stateUserById: {},

    userToEdit: {},
  },
  applicationSection: {
    loading: false,
    loadError: {},
    applicationSections: [],

    newFormId: null,
    sectionUrl: null,

    creating: false,
    createError: {},
    createdSection: {},

    updating: false,
    updateError: {},
    updatedSection: {},

    singleApplicationSections: [],
    singleApplicationSection: {},

    deleting: false,
    deleteError: {},
    deleteSuccess: {},

    gettingUnebResults: false,
    unebResultError: {},
    unebResultSuccess: {},
  },
  myApplicationForm: {
    loading: false,
    myApplicationForms: [],
    loadError: {},
    generatingPaymentReference: false,
    paymentReferenceError: {},
    paymentReferenceSuccess: {},

    gettingApplicationHistory: false,
    applicationHistory: [],
    applicationHistoryError: {},

    downloadingForm: false,
    downloadFormId: null,
    downloadFormError: {},

    selectedApplication: {},
    showPreviewModal: false,

    showVisaModal: false,
  },
};

export default admission;
