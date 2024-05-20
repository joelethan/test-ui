import { institutionActions } from "../../actions";
import initialState from "../../initialState";

function institution(state = initialState.institution, actions) {
  switch (actions.type) {
    case institutionActions.CREATE_INSTITUTION_REQUEST:
      return {
        ...state,
        createInstitutionError: {},
        createInstitutionSuccess: {},
        creatingInstitution: true,
      };
    case institutionActions.CREATE_INSTITUTION_SUCCESS:
      return {
        ...state,
        createInstitutionSuccess: actions.data,
        creatingInstitution: false,
      };
    case institutionActions.CREATE_INSTITUTION_ERROR:
      return {
        ...state,
        createInstitutionError: actions.error,
        creatingInstitution: false,
      };

    case institutionActions.UPDATE_INSTITUTION_REQUEST:
      return {
        ...state,
        updateInstitutionError: {},
        updateInstitutionSuccess: {},
        updatingInstitution: true,
      };
    case institutionActions.UPDATE_INSTITUTION_SUCCESS:
      return {
        ...state,
        updateInstitutionSuccess: actions.data,
        updatingInstitution: false,
      };
    case institutionActions.UPDATE_INSTITUTION_ERROR:
      return {
        ...state,
        updateInstitutionError: actions.error,
        updatingInstitution: false,
      };

    case institutionActions.FETCH_INSTITUTIONS_REQUEST:
      return {
        ...state,
        fetchInstitutionError: {},
        fetchingInstitution: true,
      };
    case institutionActions.FETCH_INSTITUTIONS_SUCCESS:
      return {
        ...state,
        stateInstitutions: actions.data,
        fetchingInstitution: false,
      };
    case institutionActions.FETCH_INSTITUTIONS_ERROR:
      return {
        ...state,
        fetchInstitutionError: actions.error,
        fetchingInstitution: false,
      };

    case institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_REQUEST:
      return {
        ...state,
        downloadInstitutionsTemplateError: {},
        downloadInstitutionsTemplate: {},
        downloadingInstitutionsTemplate: true,
      };
    case institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_SUCCESS:
      return {
        ...state,
        downloadInstitutionsTemplate: actions.data,
        downloadInstitutionsTemplateError: {},
        downloadingInstitutionsTemplate: false,
      };
    case institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_ERROR:
      return {
        ...state,
        downloadInstitutionsTemplateError: actions.error,
        downloadingInstitutionsTemplate: false,
      };

    case institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_REQUEST:
      return {
        ...state,
        uploadInstitutionsTemplateError: {},
        uploadInstitutionsTemplate: {},
        uploadingInstitutionsTemplate: true,
      };
    case institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_SUCCESS:
      return {
        ...state,
        uploadInstitutionsTemplate: actions.data,
        uploadInstitutionsTemplateError: {},
        uploadingInstitutionsTemplate: false,
      };
    case institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_ERROR:
      return {
        ...state,
        uploadInstitutionsTemplateError: actions.error,
        uploadingInstitutionsTemplate: false,
      };

    case institutionActions.ADD_SUPPORT_ITEMS_REQUEST:
      return {
        ...state,
        addingSupportItems: true,
        addSupportItemError: {},
        addSupportItemSuccess: {},
      };
    case institutionActions.ADD_SUPPORT_ITEMS_SUCCESS:
      return {
        ...state,
        addingSupportItems: false,
        addSupportItemSuccess: actions.data,
        addSupportItemError: {},
      };
    case institutionActions.ADD_SUPPORT_ITEMS_ERROR:
      return {
        ...state,
        addingSupportItems: false,
        addSupportItemError: actions.error,
      };

    case institutionActions.ADD_PAYMENT_CYCLES_REQUEST:
      return {
        ...state,
        addingPaymentCycles: true,
        addPaymentCycleError: {},
        addPaymentCycleSuccess: {},
      };
    case institutionActions.ADD_PAYMENT_CYCLES_SUCCESS:
      return {
        ...state,
        addingPaymentCycles: false,
        addPaymentCycleSuccess: actions.data,
        addPaymentCycleError: {},
      };
    case institutionActions.ADD_PAYMENT_CYCLES_ERROR:
      return {
        ...state,
        addingPaymentCycles: false,
        addPaymentCycleError: actions.error,
      };

    case institutionActions.ADD_STUDY_CLASSES_REQUEST:
      return {
        ...state,
        addingStudyClasses: true,
        addStudyClasssError: {},
        addStudyClassesSuccess: {},
      };
    case institutionActions.ADD_STUDY_CLASSES_SUCCESS:
      return {
        ...state,
        addingStudyClasses: false,
        addStudyClassesSuccess: actions.data,
        addStudyClasssError: {},
      };
    case institutionActions.ADD_STUDY_CLASSES_ERROR:
      return {
        ...state,
        addingStudyClasses: false,
        addStudyClasssError: actions.error,
      };

    case institutionActions.GET_SUPPORT_ITEMS_REQUEST:
      return {
        ...state,
        gettingSupportItems: true,
        getSupportItemError: {},
      };
    case institutionActions.GET_SUPPORT_ITEMS_SUCCESS:
      return {
        ...state,
        gettingSupportItems: false,
        getSupportItemSuccess: actions.data,
        getSupportItemError: {},
      };
    case institutionActions.GET_SUPPORT_ITEMS_ERROR:
      return {
        ...state,
        gettingSupportItems: false,
        getSupportItemError: actions.error,
      };
// 
    case institutionActions.GET_PAYMENT_CYCLES_REQUEST:
      return {
        ...state,
        gettingPaymentCycles: true,
        getPaymentCycleError: {},
      };
    case institutionActions.GET_PAYMENT_CYCLES_SUCCESS:
      return {
        ...state,
        gettingPaymentCycles: false,
        getPaymentCycleSuccess: actions.data,
        getPaymentCycleError: {},
      };
    case institutionActions.GET_PAYMENT_CYCLES_ERROR:
      return {
        ...state,
        gettingPaymentCycles: false,
        getPaymentCycleError: actions.error,
      };
// 
    case institutionActions.GET_STUDY_CLASSES_REQUEST:
      return {
        ...state,
        gettingStudyClasses: true,
        getStudyClassesError: {},
      };
    case institutionActions.GET_STUDY_CLASSES_SUCCESS:
      return {
        ...state,
        gettingStudyClasses: false,
        getStudyClassesSuccess: actions.data,
        getStudyClassesError: {},
      };
    case institutionActions.GET_STUDY_CLASSES_ERROR:
      return {
        ...state,
        gettingStudyClasses: false,
        getStudyClassesError: actions.error,
      };

    case institutionActions.DELETE_SUPPORT_ITEM_REQUEST:
      return {
        ...state,
        deletingSupportItems: true,
        deleteSupportItemSuccess: {},
        deleteSupportItemError: {},
      };
    case institutionActions.DELETE_SUPPORT_ITEM_SUCCESS:
      return {
        ...state,
        deletingSupportItems: false,
        deleteSupportItemSuccess: actions.data,
        deleteSupportItemError: {},
      };
    case institutionActions.DELETE_SUPPORT_ITEM_ERROR:
      return {
        ...state,
        deletingSupportItems: false,
        deleteSupportItemError: actions.error,
      };

    case institutionActions.DELETE_PAYMENT_CYCLE_REQUEST:
      return {
        ...state,
        deletingPaymentCycles: true,
        deletePaymentCycleSuccess: {},
        deletePaymentCycleError: {},
      };
    case institutionActions.DELETE_PAYMENT_CYCLE_SUCCESS:
      return {
        ...state,
        deletingPaymentCycles: false,
        deletePaymentCycleSuccess: actions.data,
        deletePaymentCycleError: {},
      };
    case institutionActions.DELETE_PAYMENT_CYCLE_ERROR:
      return {
        ...state,
        deletingPaymentCycles: false,
        deletePaymentCycleError: actions.error,
      };

    case institutionActions.DELETE_STUDY_CLASS_REQUEST:
      return {
        ...state,
        deletingStudyClass: true,
        deleteStudyClassSuccess: {},
        deleteStudyClassError: {},
      };
    case institutionActions.DELETE_STUDY_CLASS_SUCCESS:
      return {
        ...state,
        deletingStudyClass: false,
        deleteStudyClassSuccess: actions.data,
        deleteStudyClassError: {},
      };
    case institutionActions.DELETE_STUDY_CLASS_ERROR:
      return {
        ...state,
        deletingStudyClass: false,
        deleteStudyClassError: actions.error,
      };

    case institutionActions.SET_SUPPORT_INSTITUTION:
      return {
        ...state,
        supportInstitution: actions.payload,
      };

    case institutionActions.SET_INSTITUTION_TO_EDIT:
      return {
        ...state,
        institutionToEdit: actions.payload,
      };

    default:
      return state;
  }
}

export default institution;
