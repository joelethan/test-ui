const runningAdmission = {
  GET_STATE_HOUSE_USERS_REQUEST: "GET_STATE_HOUSE_USERS_REQUEST",
  GET_STATE_HOUSE_USERS_SUCCESS: "GET_STATE_HOUSE_USERS_SUCCESS",
  GET_STATE_HOUSE_USERS_ERROR: "GET_STATE_HOUSE_USERS_ERROR",

  GET_PENDING_SH_USERS_REQUEST: "GET_PENDING_SH_USERS_REQUEST",
  GET_PENDING_SH_USERS_SUCCESS: "GET_PENDING_SH_USERS_SUCCESS",
  GET_PENDING_SH_USERS_ERROR: "GET_PENDING_SH_USERS_ERROR",

  GET_USERS_PENDING_FINAL_APPROVAL_REQUEST: "GET_USERS_PENDING_FINAL_APPROVAL_REQUEST",
  GET_USERS_PENDING_FINAL_APPROVAL_SUCCESS: "GET_USERS_PENDING_FINAL_APPROVAL_SUCCESS",
  GET_USERS_PENDING_FINAL_APPROVAL_ERROR: "GET_USERS_PENDING_FINAL_APPROVAL_ERROR",

  GET_USER_BY_ID_REQUEST: "GET_USER_BY_ID_REQUEST",
  GET_USER_BY_ID_SUCCESS: "GET_USER_BY_ID_SUCCESS",
  GET_USER_BY_ID_ERROR: "GET_USER_BY_ID_ERROR",

  SET_USER_TO_EDIT: "SET_USER_TO_EDIT",

  getStateHouseUsers: () => ({
    type: runningAdmission.GET_STATE_HOUSE_USERS_REQUEST,
  }),

  fetchPendingSHUsers: () => ({
    type: runningAdmission.GET_PENDING_SH_USERS_REQUEST,
  }),

  fetchUsersPendingFinalApproval: () => ({
    type: runningAdmission.GET_USERS_PENDING_FINAL_APPROVAL_REQUEST,
  }),

  getUserById: (id) => ({
    type: runningAdmission.GET_USER_BY_ID_REQUEST,
    id,
  }),

  setUserToEdit: (payload) => ({
    type: runningAdmission.SET_USER_TO_EDIT,
    payload,
  }),
};

export default runningAdmission;