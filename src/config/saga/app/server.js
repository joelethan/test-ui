import { takeLatest, fork, put } from "redux-saga/effects";
import axios from "axios";
import { serverActions } from "../../actions";

function* verifyGoogleToken(actions) {
  try {
    const response = yield axios({
      url: "recaptcha/api/siteverify",
      method: "POST",
      baseURL: "https://www.google.com/",
      data: actions.data,
    });
    yield put({
      type: serverActions.VERIFY_GOOGLE_RECAPTURE_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: serverActions.VERIFY_GOOGLE_RECAPTURE_ERROR,
      error: error.data,
    });
  }
}

function* watchVerifyGoogleToken() {
  yield takeLatest(
    serverActions.VERIFY_GOOGLE_RECAPTURE_REQUEST,
    verifyGoogleToken
  );
}

const forkFunctions = [fork(watchVerifyGoogleToken)];

export default forkFunctions;
