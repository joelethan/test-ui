import axios from "axios";
import { fork, put, takeLatest } from "redux-saga/effects";
import { runningAdmissionActions } from "../../actions";

function* getStateHouseUsers() {
  try {
    const response = yield axios({
      url: "/user-mgt/users",
      method: "GET",
    });
    yield put({
      type: runningAdmissionActions.GET_STATE_HOUSE_USERS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: runningAdmissionActions.GET_STATE_HOUSE_USERS_ERROR,
      error: error.data,
    });
  }
}

function* fetchPendingSHUsers() {
  try {
    const response = yield axios({
      url: "/user-mgt/approval/pending",
      method: "GET",
    });
    yield put({
      type: runningAdmissionActions.GET_PENDING_SH_USERS_SUCCESS,
      data: response.pending,
    });
  } catch (error) {
    yield put({
      type: runningAdmissionActions.GET_PENDING_SH_USERS_ERROR,
      error: error.data,
    });
  }
}

function* fetchUsersPendingFinalApproval() {
  try {
    const response = yield axios({
      url: "/user-mgt/approval/pending-final-approval",
      method: "GET",
    });
    yield put({
      type: runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_SUCCESS,
      data: response.pending,
    });
  } catch (error) {
    yield put({
      type: runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_ERROR,
      error: error.data,
    });
  }
}

function* getUserById(actions) {
  try {
    const response = yield axios({
      url: `/user-mgt/users/${actions.id}`,
      method: "GET",
    });
    yield put({
      type: runningAdmissionActions.GET_USER_BY_ID_SUCCESS,
      data: response.user,
    });
  } catch (error) {
    yield put({
      type: runningAdmissionActions.GET_USER_BY_ID_ERROR,
      error: error.data,
    });
  }
}

function* watchGetStateHouseUsers() {
  yield takeLatest(
    runningAdmissionActions.GET_STATE_HOUSE_USERS_REQUEST,
    getStateHouseUsers
  );
}

function* watchFetchPendingUsers() {
  yield takeLatest(
    runningAdmissionActions.GET_PENDING_SH_USERS_REQUEST,
    fetchPendingSHUsers
  );
}

function* watchFetchUsersPendingFinalApproval() {
  yield takeLatest(
    runningAdmissionActions.GET_USERS_PENDING_FINAL_APPROVAL_REQUEST,
    fetchUsersPendingFinalApproval
  );
}

function* watchGetUserById() {
  yield takeLatest(runningAdmissionActions.GET_USER_BY_ID_REQUEST, getUserById);
}

const forkFunctions = [
  fork(watchFetchUsersPendingFinalApproval),
  fork(watchGetStateHouseUsers),
  fork(watchFetchPendingUsers),
  fork(watchGetUserById),
];

export default forkFunctions;
