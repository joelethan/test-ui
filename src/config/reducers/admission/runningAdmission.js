import { runningAdmissionActions } from "../../actions";
import initialState from "../../initialState";

function runningAdmission(state = initialState.runningAdmission, actions) {
  switch (actions.type) {
    case runningAdmissionActions.SET_USER_TO_EDIT:
      return {
        ...state,
        userToEdit: actions.payload,
      };

    case runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST:
      return {
        ...state,
        gettingStateHouseUsers: true,
        stateHouseUsersError: {},
      };
    case runningAdmissionActions.GET_STATE_HOUSE_USERS_SUCCESS:
      return {
        ...state,
        stateHouseUsers: actions.data,
        gettingStateHouseUsers: false,
      };
    case runningAdmissionActions.GET_STATE_HOUSE_USERS_ERROR:
      return {
        ...state,
        stateHouseUsersError: actions.error,
        gettingStateHouseUsers: false,
      };

    case runningAdmissionActions.GET_PENDING_SH_USERS_REQUEST:
      return {
        ...state,
        gettingPendingUsers: true,
        pendingUsersError: {},
      };
    case runningAdmissionActions.GET_PENDING_SH_USERS_SUCCESS:
      return {
        ...state,
        pendingStateHouseUsers: actions.data,
        gettingPendingUsers: false,
      };
    case runningAdmissionActions.GET_PENDING_SH_USERS_ERROR:
      return {
        ...state,
        pendingUsersError: actions.error,
        gettingPendingUsers: false,
      };

    case runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_REQUEST:
      return {
        ...state,
        gettingUsersPendingFinal: true,
        pendingFinalApprovalError: {},
      };
    case runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_SUCCESS:
      return {
        ...state,
        usersPendingFinal: actions.data,
        gettingUsersPendingFinal: false,
      };
    case runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_ERROR:
      return {
        ...state,
        pendingFinalApprovalError: actions.error,
        gettingUsersPendingFinal: false,
      };

    case runningAdmissionActions.GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        gettingUserById: true,
        userByIdError: {},
      };
    case runningAdmissionActions.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        stateUserById: actions.data,
        gettingUserById: false,
      };
    case runningAdmissionActions.GET_USER_BY_ID_ERROR:
      return {
        ...state,
        userByIdError: actions.error,
        gettingUserById: false,
      };

    default:
      return state;
  }
}

export default runningAdmission;
