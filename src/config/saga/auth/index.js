import { takeLatest, fork, put } from "redux-saga/effects";
import axios from "axios";
import { authActions, runningAdmissionActions } from "../../actions";
import { clearToken } from "../../services/storageService";

function* registerUser(actions) {
  try {
    const response = yield axios({
      url: "/user-mgt/users",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: authActions.REGISTER_USER_SUCCESS,
      data: response,
    });
    yield put({
      type: "SET_STATE_USERS_VIEW",
      payload: "view-users",
    });
    yield put({ type: runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST });
  } catch (error) {
    yield put({
      type: authActions.REGISTER_USER_ERROR,
      error: error.data,
    });
    yield put({
      type: "SET_STATE_USERS_VIEW",
      payload: "view-users",
    });
    yield put({ type: runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST });
  }
}

function* updateStateUser(actions) {
  try {
    const response = yield axios({
      url: `/user-mgt/users/${actions.userId}`,
      method: "PUT",
      data: actions.data,
    });
    yield put({
      type: authActions.UPDATE_STATE_USER_SUCCESS,
      data: response,
    });
    yield put({
      type: "SET_STATE_USERS_VIEW",
      payload: "view-users",
    });
    if (actions.userId === actions.authUserId)
      yield put({ type: authActions.GET_AUTH_USER_REQUEST });
    yield put({ type: runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST });
  } catch (error) {
    yield put({
      type: authActions.UPDATE_STATE_USER_ERROR,
      error: error.data,
    });
    yield put({ type: runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST });
  }
}

function* loginApplicant(actions) {
  try {
    const response = yield axios({
      url: "/auth/user/login",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: authActions.LOGIN_APPLICANT_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.SET_AUTH_USER,
      user: response.applicant,
    });
  } catch (error) {
    yield put({
      type: authActions.LOGIN_APPLICANT_ERROR,
      error: error.data,
    });
  }
}

function* logoutUser() {
  try {
    const response = yield axios({
      url: "/auth/user/logout",
      method: "POST",
    });
    yield put({
      type: authActions.LOGOUT_SUCCESS,
      data: response,
    });
    clearToken();
    yield put({
      type: authActions.REMOVE_AUTH_USER,
    });
    yield put({
      type: authActions.SET_IS_AUTHENTICATED,
      payload: false,
    });
  } catch (error) {
    if (error.status === 403 || error.status === 401) clearToken();
    yield put({
      type: authActions.LOGOUT_ERROR,
      error: error.data,
    });
  }
}

function* changePassword(action) {
  try {
    const response = yield axios({
      url: "/user-mgt/users/change-password",
      method: "PUT",
      data: action.data,
    });

    yield put({
      type: authActions.CHANGE_PASSWORD_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.CHANGE_PASSWORD_ERROR,
      error: error.data,
    });
  }
}

function* changeDefaultPassword(action) {
  try {
    const response = yield axios({
      url: "/user-mgt/users/change-otp",
      method: "PUT",
      data: action.data,
    });

    yield put({
      type: authActions.CHANGE_DEFAULT_PASSWORD_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.GET_AUTH_USER_REQUEST,
    });
  } catch (error) {
    yield put({
      type: authActions.CHANGE_DEFAULT_PASSWORD_ERROR,
      error: error.data,
    });
  }
}

function* requestToken(action) {
  try {
    const response = yield axios({
      url: `/pujab/applicant-portal/request-token`,
      method: "POST",
      data: action.data,
    });
    yield put({
      type: authActions.REQUEST_TOKEN_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.REQUEST_TOKEN_ERROR,
      error: error.data,
    });
  }
}

function* resetPassword(action) {
  try {
    const response = yield axios({
      url: `/pujab/applicant-portal/reset-password`,
      method: "PUT",
      data: action.data,
    });
    yield put({
      type: authActions.RESET_PASSWORD_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.RESET_PASSWORD_ERROR,
      error: error.data,
    });
  }
}

function* fetchAuthUser() {
  try {
    const response = yield axios({
      url: "/user-mgt/users/profile",
      method: "GET",
    });
    yield put({
      type: authActions.GET_AUTH_USER_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.SET_AUTH_USER,
      user: response.user,
    });
    yield put({
      type: authActions.SET_USER_ROLES,
      roles: response?.user?.roles || [],
    });
  } catch (error) {
    yield put({
      type: authActions.GET_AUTH_USER_ERROR,
      error: error.data,
    });
  }
}

function* requestEmailVerificationLink(action) {
  try {
    const response = yield axios({
      url: `/email/resend-verification-link`,
      method: "POST",
      data: action.data,
    });
    yield put({
      type: authActions.EMAIL_VERIFICATION_LINK_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.EMAIL_VERIFICATION_LINK_ERROR,
      error: error.data || error,
    });
  }
}

function* verifyEmail(action) {
  try {
    const response = yield axios({
      url: `/email/verify/${action.token}`,
      method: "POST",
    });
    yield put({
      type: authActions.VERIFY_EMAIL_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.VERIFY_EMAIL_ERROR,
      error: error.data || error,
    });
  }
}

function* watchRegisterUser() {
  yield takeLatest(authActions.REGISTER_USER_REQUEST, registerUser);
}

function* watchUpdateStateUser() {
  yield takeLatest(authActions.UPDATE_STATE_USER_REQUEST, updateStateUser);
}

function* watchLoginApplicant() {
  yield takeLatest(authActions.LOGIN_APPLICANT_REQUEST, loginApplicant);
}

function* watchLogout() {
  yield takeLatest(authActions.LOGOUT_REQUEST, logoutUser);
}

function* watchChangePassword() {
  yield takeLatest(authActions.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchChangeDefaultPassword() {
  yield takeLatest(
    authActions.CHANGE_DEFAULT_PASSWORD_REQUEST,
    changeDefaultPassword
  );
}

function* watchRequestToken() {
  yield takeLatest(authActions.REQUEST_TOKEN_REQUEST, requestToken);
}

function* watchResetPassword() {
  yield takeLatest(authActions.RESET_PASSWORD_REQUEST, resetPassword);
}

function* watchFetchAuthUser() {
  yield takeLatest(authActions.GET_AUTH_USER_REQUEST, fetchAuthUser);
}

function* watchRequestEmailVerificationLink() {
  yield takeLatest(
    authActions.EMAIL_VERIFICATION_LINK_REQUEST,
    requestEmailVerificationLink
  );
}

function* watchVerifyEmail() {
  yield takeLatest(authActions.VERIFY_EMAIL_REQUEST, verifyEmail);
}

const forkFunctions = [
  fork(watchRegisterUser),
  fork(watchLoginApplicant),
  fork(watchLogout),
  fork(watchUpdateStateUser),
  fork(watchChangePassword),
  fork(watchChangeDefaultPassword),
  fork(watchRequestToken),
  fork(watchResetPassword),
  fork(watchFetchAuthUser),
  fork(watchRequestEmailVerificationLink),
  fork(watchVerifyEmail),
];

export default forkFunctions;
