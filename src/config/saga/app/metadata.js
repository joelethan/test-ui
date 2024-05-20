import { takeLatest, fork, put } from "redux-saga/effects";
import axios from "axios";
import { metadataActions } from "../../actions";

function* createMetadata(actions) {
  try {
    const response = yield axios({
      url: "/app-mgt/metadata",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: metadataActions.CREATE_META_DATA_SUCCESS,
      data: response.metadata,
    });
    yield put({
      type: metadataActions.GET_META_DATA_REQUEST,
    });
    yield put({ type: "SET_SHOW_MODAL", payload: false });
  } catch (error) {
    yield put({
      type: metadataActions.CREATE_META_DATA_ERROR,
      error: error.data,
    });
  }
}

function* addMetadataValues(actions) {
  try {
    const response = yield axios({
      url: "/app-mgt/metadata-values",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: metadataActions.ADD_METADATA_VALUES_SUCCESS,
      data: response.metadata,
    });
    yield put({
      type: metadataActions.GET_META_DATA_REQUEST,
    });
    yield put({ type: "SET_METADATA_VALUE_VIEW", payload: "view-values" });
  } catch (error) {
    yield put({
      type: metadataActions.ADD_METADATA_VALUES_ERROR,
      error: error.data,
    });
  }
}

function* getAllMetadata() {
  try {
    const response = yield axios({
      url: "/app-mgt/metadata",
      method: "GET",
    });
    yield put({
      type: metadataActions.GET_META_DATA_SUCCESS,
      data: response.metadata,
    });
  } catch (error) {
    yield put({
      type: metadataActions.GET_META_DATA_ERROR,
      error: error.data,
    });
  }
}

function* watchGetMetadata() {
  yield takeLatest(metadataActions.GET_META_DATA_REQUEST, getAllMetadata);
}

function* watchCreateMetadata() {
  yield takeLatest(metadataActions.CREATE_META_DATA_REQUEST, createMetadata);
}

function* watchAddMetadataValues() {
  yield takeLatest(
    metadataActions.ADD_METADATA_VALUES_REQUEST,
    addMetadataValues
  );
}

const forkFunctions = [
  fork(watchGetMetadata),
  fork(watchCreateMetadata),
  fork(watchAddMetadataValues),
];

export default forkFunctions;
