const settings = {
  setSelectedMenu: (e) => ({
    type: "SET_SELECTED_MENU",
    payload: e,
  }),

  switchSideMenuTab: (e) => ({
    type: "SWITCH_SIDE_MENU_TAB",
    payload: e,
  }),

  showSelectProgrammeModal: (e) => ({
    type: "SHOW_SELECT_PROGRAMME_MODAL",
    payload: e,
  }),

  setStateUsersView: (e) => ({
    type: "SET_STATE_USERS_VIEW",
    payload: e,
  }),

  setAcisBeneficiaryView: (e) => ({
    type: "SET_ACMIS_BENEFICIARY_VIEW",
    payload: e,
  }),

  setAcisSearchParam: (e) => ({
    type: "SET_ACMIS_SEARCH_PARAM",
    payload: e,
  }),

  setInstitutionsTabView: (e) => ({
    type: "SET_INSTITUTIONS_TAB_VIEW",
    payload: e,
  }),

  setAcmisBeneficiaryTabView: (e) => ({
    type: "SET_ACMIS_BENEFICIARY_TAB_VIEW",
    payload: e,
  }),

  setApprovalsTabView: (e) => ({
    type: "SET_APPROVALS_TAB_VIEW",
    payload: e,
  }),

  setReportsTabView: (e) => ({
    type: "SET_REPORTS_TAB_VIEW",
    payload: e,
  }),

  showModal: (e) => ({
    type: "SET_SHOW_MODAL",
    payload: e,
  }),

  showDeleteModal: (e) => ({
    type: "SET_DELETE_MODAL",
    payload: e,
  }),

  setDeleteData: (e) => ({
    type: "SET_DELETE_DATA",
    payload: e,
  }),
};

export default settings;
// PROM PRIMARY
// EXIT DETAILS: PREMATURE OR AFTER COMPLETING
// PAYMENTS
// ACADEMIC DETAILS
// REPORTS
