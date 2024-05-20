import initialState from "../initialState";

function settings(state = initialState.setting, action) {
  switch (action.type) {
    case "SET_SELECTED_MENU":
      return {
        ...state,
        selectedMenu: action.payload,
      };

    case "SWITCH_SIDE_MENU_TAB":
      return {
        ...state,
        sideMenuTab: action.payload,
      };

    case "SHOW_SELECT_PROGRAMME_MODAL":
      return {
        ...state,
        showSelectProgrammeModal: action.payload,
      };

    case "SET_STATE_USERS_VIEW":
      return {
        ...state,
        stateUsersView: action.payload,
      };

    case "SET_ACMIS_BENEFICIARY_VIEW":
      return {
        ...state,
        acmisBeneficiaryView: action.payload,
      };

    case "SET_ACMIS_SEARCH_PARAM":
      return {
        ...state,
        acmisSearchParam: action.payload,
      };

    case "SET_INSTITUTIONS_TAB_VIEW":
      return {
        ...state,
        institutionsTabView: action.payload,
      };

    case "SET_ACMIS_BENEFICIARY_TAB_VIEW":
      return {
        ...state,
        acmisBeneficiaryTabView: action.payload,
      };

    case "SET_APPROVALS_TAB_VIEW":
      return {
        ...state,
        approvalsTabView: action.payload,
      };

    case "SET_SHOW_MODAL":
      return {
        ...state,
        showModal: action.payload,
      };

    case "SET_DELETE_MODAL":
      return {
        ...state,
        showDeleteModal: action.payload,
      };

    case "SET_DELETE_DATA":
      return {
        ...state,
        deleteData: action.payload,
      };

    default:
      return state;
  }
}

export default settings;
