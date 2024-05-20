import { authActions } from "../../actions";
import initialState from "../../initialState";

function auth(state = initialState.auth, actions) {
  switch (actions.type) {
    case authActions.REGISTER_USER_REQUEST:
      return {
        ...state,
        registerError: {},
        registering: true,
      };
    case authActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registeredApplicant: actions.data,
        registerError: {},
        registering: false,
      };
    case authActions.REGISTER_USER_ERROR:
      return {
        ...state,
        registerError: actions.error,
        registering: false,
      };

    case authActions.UPDATE_STATE_USER_REQUEST:
      return {
        ...state,
        updatingUserError: {},
        updatingUser: true,
      };
    case authActions.UPDATE_STATE_USER_SUCCESS:
      return {
        ...state,
        updateUserSuccess: actions.data,
        updatingUserError: {},
        updatingUser: false,
      };
    case authActions.UPDATE_STATE_USER_ERROR:
      return {
        ...state,
        updatingUserError: actions.error,
        updatingUser: false,
      };

    case authActions.LOGIN_APPLICANT_REQUEST:
      return {
        ...state,
        loginError: {},
        loginIn: true,
        authUserError: {},
      };
    case authActions.LOGIN_APPLICANT_SUCCESS:
      return {
        ...state,
        loginData: actions.data,
        loginError: {},
        loginIn: false,
      };
    case authActions.LOGIN_APPLICANT_ERROR:
      return {
        ...state,
        loginError: actions.error,
        loginIn: false,
      };
    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        loggingOut: true,
        logoutData: {},
        logoutError: {},
      };
    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        false: true,
        logoutData: actions.data,
      };
    case authActions.LOGOUT_ERROR:
      return {
        ...state,
        loggingOut: false,
        false: true,
        logoutError: actions.error,
      };

    case authActions.GET_AUTH_USER_REQUEST:
      return {
        ...state,
        gettingAuthUser: true,
        authUserError: {},
      };

    case authActions.GET_AUTH_USER_SUCCESS:
      return {
        ...state,
        gettingAuthUser: false,
        authUser: actions.data.user,
      };

    case authActions.GET_AUTH_USER_ERROR:
      return {
        ...state,
        gettingAuthUser: false,
        authUserError: actions.error,
      };

    case authActions.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changingPassword: true,
        changePasswordError: {},
      };
    case authActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        changePasswordSuccess: actions.data,
      };
    case authActions.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changingPassword: false,
        changePasswordError: actions.error,
      };

    case authActions.CHANGE_DEFAULT_PASSWORD_REQUEST:
      return {
        ...state,
        changingDefaultPassword: true,
        changeDefaultPasswordError: {},
      };
    case authActions.CHANGE_DEFAULT_PASSWORD_SUCCESS:
      return {
        ...state,
        changingDefaultPassword: false,
        changeDefaultPasswordSuccess: actions.data,
      };
    case authActions.CHANGE_DEFAULT_PASSWORD_ERROR:
      return {
        ...state,
        changingDefaultPassword: false,
        changeDefaultPasswordError: actions.error,
      };

    case authActions.REQUEST_TOKEN_REQUEST:
      return {
        ...state,
        requestingToken: true,
        requestTokenError: {},
        requestTokenSuccess: {},
      };

    case authActions.REQUEST_TOKEN_SUCCESS:
      return {
        ...state,
        requestingToken: false,
        requestTokenSuccess: actions.data,
      };

    case authActions.REQUEST_TOKEN_ERROR:
      return {
        ...state,
        requestingToken: false,
        requestTokenError: actions.error,
      };

    case authActions.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resettingPassword: true,
        resetPasswordError: {},
        resetPasswordSuccess: {},
      };

    case authActions.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resettingPassword: false,
        resetPasswordSuccess: actions.data,
      };

    case authActions.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resettingPassword: false,
        resetPasswordError: actions.error,
      };

    case authActions.EMAIL_VERIFICATION_LINK_REQUEST:
      return {
        ...state,
        requesting: true,
        requestEmailError: {},
        requestEmailSuccess: {},
      };

    case authActions.EMAIL_VERIFICATION_LINK_SUCCESS:
      return {
        ...state,
        requesting: false,
        requestEmailSuccess: actions.data,
      };

    case authActions.EMAIL_VERIFICATION_LINK_ERROR:
      return {
        ...state,
        requesting: false,
        requestEmailError: actions.error,
      };

    case authActions.VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        verifying: true,
        verifyEmailError: {},
        verifyEmailSuccess: {},
      };

    case authActions.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifying: false,
        verifyEmailSuccess: actions.data,
      };

    case authActions.VERIFY_EMAIL_ERROR:
      return {
        ...state,
        verifying: false,
        verifyEmailError: actions.error,
      };

    case authActions.SET_AUTH_USER:
      return {
        ...state,
        authUser: actions.user,
      };

    case authActions.SET_USER_ROLES:
      return {
        ...state,
        userRoles: actions.roles,
      };

    case authActions.SET_USER_CURRENT_ROLE:
      return {
        ...state,
        currentRole: actions.role,
        userInstitutions: actions.role.institutions,
      };

    case authActions.SET_USER_CURRENT_INST:
      return {
        ...state,
        currentInst: actions.inst,
      };

    case authActions.SET_USER_CURRENT_TYPE:
      return {
        ...state,
        currentType: actions.payload,
      };

    case authActions.SET_USER_CURRENT_INST_TYPE:
      return {
        ...state,
        currentInstType: actions.payload,
      };

    case authActions.REMOVE_AUTH_USER:
      return {
        ...state,
        authUser: {},
      };

    case authActions.SET_IS_AUTHENTICATED:
      return {
        ...state,
        authUser: {},
        isAuthenticated: actions.payload,
      };

    default:
      return state;
  }
}

export default auth;
