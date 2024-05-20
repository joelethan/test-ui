import { takeLatest, fork, put } from "redux-saga/effects";
import axios from "axios";
import FileSaver from "file-saver";
import { institutionActions } from "../../actions";

function* createInstitution(actions) {
  try {
    const response = yield axios({
      url: "/institution-mgt/institutions",
      method: "POST",
      data: actions.data,
    });
    yield put({
      type: institutionActions.CREATE_INSTITUTION_SUCCESS,
      data: response,
    });
    yield put({ type: institutionActions.FETCH_INSTITUTIONS_REQUEST });
    yield put({
      type: "SET_INSTITUTIONS_TAB_VIEW",
      payload: "view-institutions",
    });
  } catch (error) {
    yield put({
      type: institutionActions.CREATE_INSTITUTION_ERROR,
      error: error.data,
    });
  }
}

function* updateInstitution(actions) {
  try {
    const response = yield axios({
      url: `/institution-mgt/institutions/${actions.instId}`,
      method: "PUT",
      data: actions.data,
    });
    yield put({
      type: institutionActions.UPDATE_INSTITUTION_SUCCESS,
      data: response,
    });
    yield put({ type: institutionActions.FETCH_INSTITUTIONS_REQUEST });
    yield put({
      type: "SET_INSTITUTIONS_TAB_VIEW",
      payload: "view-institutions",
    });
  } catch (error) {
    yield put({
      type: institutionActions.UPDATE_INSTITUTION_ERROR,
      error: error.data,
    });
  }
}

function* fetchInstitutions() {
  try {
    const response = yield axios({
      url: "/institution-mgt/institutions",
      method: "GET",
    });
    yield put({
      type: institutionActions.FETCH_INSTITUTIONS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: institutionActions.FETCH_INSTITUTIONS_ERROR,
      error: error.data,
    });
  }
}

function* addSupportItems(actions) {
  try {
    const response = yield axios({
      url: "/institution-mgt/support-items",
      method: "POST",
      data: actions.payload,
    });
    yield put({
      type: institutionActions.ADD_SUPPORT_ITEMS_SUCCESS,
      data: response.data,
    });
    yield put({
      type: institutionActions.GET_SUPPORT_ITEMS_REQUEST,
    });
    yield put({
      type: "SET_METADATA_VALUE_VIEW",
      payload: "view-values",
    });
  } catch (error) {
    yield put({
      type: institutionActions.ADD_SUPPORT_ITEMS_ERROR,
      error: error.data,
    });
  }
}

function* addPaymentCycles(actions) {
  try {
    const response = yield axios({
      url: "/institution-mgt/payment-cycles",
      method: "POST",
      data: actions.payload,
    });
    yield put({
      type: institutionActions.ADD_PAYMENT_CYCLES_SUCCESS,
      data: response.data,
    });
    yield put({
      type: institutionActions.GET_PAYMENT_CYCLES_REQUEST,
    });
    yield put({
      type: "SET_METADATA_VALUE_VIEW",
      payload: "view-values",
    });
  } catch (error) {
    yield put({
      type: institutionActions.ADD_PAYMENT_CYCLES_ERROR,
      error: error.data,
    });
  }
}

function* addStudyClasses(actions) {
  try {
    const response = yield axios({
      url: "/institution-mgt/study-levels",
      method: "POST",
      data: actions.payload,
    });
    yield put({
      type: institutionActions.ADD_STUDY_CLASSES_SUCCESS,
      data: response.data,
    });
    yield put({
      type: institutionActions.GET_STUDY_CLASSES_REQUEST,
    });
    yield put({
      type: "SET_METADATA_VALUE_VIEW",
      payload: "view-values",
    });
  } catch (error) {
    yield put({
      type: institutionActions.ADD_STUDY_CLASSES_ERROR,
      error: error.data,
    });
  }
}

function* getSupportItems() {
  try {
    const response = yield axios({
      url: "/institution-mgt/support-items",
      method: "GET",
    });
    yield put({
      type: institutionActions.GET_SUPPORT_ITEMS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: institutionActions.GET_SUPPORT_ITEMS_ERROR,
      error: error.data,
    });
  }
}

function* getPaymentCycles() {
  try {
    const response = yield axios({
      url: "/institution-mgt/payment-cycles",
      method: "GET",
    });
    yield put({
      type: institutionActions.GET_PAYMENT_CYCLES_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: institutionActions.GET_PAYMENT_CYCLES_ERROR,
      error: error.data,
    });
  }
}

function* getStudyClasses() {
  try {
    const response = yield axios({
      url: "/institution-mgt/study-levels",
      method: "GET",
    });
    yield put({
      type: institutionActions.GET_STUDY_CLASSES_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: institutionActions.GET_STUDY_CLASSES_ERROR,
      error: error.data,
    });
  }
}

function* deleteSupportItem({ itemId }) {
  try {
    const response = yield axios({
      url: `/institution-mgt/support-items/${itemId}`,
      method: "DELETE",
    });
    yield put({
      type: institutionActions.DELETE_SUPPORT_ITEM_SUCCESS,
      data: response.data,
    });
    yield put({ type: "SET_DELETE_MODAL", payload: false });
    yield put({ type: institutionActions.GET_SUPPORT_ITEMS_REQUEST });
  } catch (error) {
    yield put({
      type: institutionActions.DELETE_SUPPORT_ITEM_ERROR,
      error: error.data,
    });
  }
}

function* deletePaymentCycle({ itemId }) {
  try {
    const response = yield axios({
      url: `/institution-mgt/payment-cycles/${itemId}`,
      method: "DELETE",
    });
    yield put({
      type: institutionActions.DELETE_PAYMENT_CYCLE_SUCCESS,
      data: response.data,
    });
    yield put({ type: "SET_DELETE_MODAL", payload: false });
    yield put({ type: institutionActions.GET_PAYMENT_CYCLES_REQUEST });
  } catch (error) {
    yield put({
      type: institutionActions.DELETE_PAYMENT_CYCLE_ERROR,
      error: error.data,
    });
  }
}

function* deleteStudyClass({ itemId }) {
  try {
    const response = yield axios({
      url: `/institution-mgt/study-levels/${itemId}`,
      method: "DELETE",
    });
    yield put({
      type: institutionActions.DELETE_STUDY_CLASS_SUCCESS,
      data: response.data,
    });
    yield put({ type: "SET_DELETE_MODAL", payload: false });
    yield put({ type: institutionActions.GET_STUDY_CLASSES_REQUEST });
  } catch (error) {
    yield put({
      type: institutionActions.DELETE_STUDY_CLASS_ERROR,
      error: error.data,
    });
  }
}

function* downloadInstitutionsTemplate() {
  try {
    yield axios({
      url: "/institution-mgt/institutions/download-template",
      method: "POST",
      responseType: "blob",
    }).then((response) => {
      FileSaver.saveAs(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `${process.env.REACT_APP_NAME}-NON-ACMIS-INSTITUTIONS.xlsx`
      );
    });
    yield put({
      type: institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_SUCCESS,
      data: { server: { message: "File downloaded!", status: true } },
    });
  } catch (error) {
    yield put({
      type: institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
}

function* uploadInstitutionsTemplate(actions) {
  try {
    const response = yield axios({
      url: `/institution-mgt/institutions/upload-template?roleId=${actions.roleId}`,
      method: "POST",
      data: actions.data,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 300000,
    });
    yield put({
      type: institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_SUCCESS,
      data: response.data,
    });
    yield put({
      type: "SET_INSTITUTIONS_TAB_VIEW",
      payload: "view-institutions",
    });
    yield put({
      type: institutionActions.FETCH_INSTITUTIONS_REQUEST,
      roleId: actions.roleId,
    });
  } catch (error) {
    yield put({
      type: institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_ERROR,
      error: error.data,
    });
  }
  yield put({
    type: "SET_INSTITUTIONS_TAB_VIEW",
    payload: "view-institutions",
  });
}

function* watchCreateInstitution() {
  yield takeLatest(
    institutionActions.CREATE_INSTITUTION_REQUEST,
    createInstitution
  );
}

function* watchUpdateInstitution() {
  yield takeLatest(
    institutionActions.UPDATE_INSTITUTION_REQUEST,
    updateInstitution
  );
}

function* watchFetchInstitutions() {
  yield takeLatest(
    institutionActions.FETCH_INSTITUTIONS_REQUEST,
    fetchInstitutions
  );
}

function* watchAddSupportItems() {
  yield takeLatest(
    institutionActions.ADD_SUPPORT_ITEMS_REQUEST,
    addSupportItems
  );
}

function* watchAddPaymentCycles() {
  yield takeLatest(
    institutionActions.ADD_PAYMENT_CYCLES_REQUEST,
    addPaymentCycles
  );
}

function* watchAddStudyClasses() {
  yield takeLatest(
    institutionActions.ADD_STUDY_CLASSES_REQUEST,
    addStudyClasses
  );
}

function* watchGetSupportItems() {
  yield takeLatest(
    institutionActions.GET_SUPPORT_ITEMS_REQUEST,
    getSupportItems
  );
}

function* watchGetPaymentCycles() {
  yield takeLatest(
    institutionActions.GET_PAYMENT_CYCLES_REQUEST,
    getPaymentCycles
  );
}

function* watchGetStudyClasses() {
  yield takeLatest(
    institutionActions.GET_STUDY_CLASSES_REQUEST,
    getStudyClasses
  );
}

function* watchDeleteSupportItem() {
  yield takeLatest(
    institutionActions.DELETE_SUPPORT_ITEM_REQUEST,
    deleteSupportItem
  );
}

function* watchDeletePaymentCycle() {
  yield takeLatest(
    institutionActions.DELETE_PAYMENT_CYCLE_REQUEST,
    deletePaymentCycle
  );
}

function* watchDeleteStudyClass() {
  yield takeLatest(
    institutionActions.DELETE_STUDY_CLASS_REQUEST,
    deleteStudyClass
  );
}

function* watchDownloadInstitutionsTemplate() {
  yield takeLatest(
    institutionActions.DOWNLOAD_INSTITUTIONS_TEMPLATE_REQUEST,
    downloadInstitutionsTemplate
  );
}

function* watchUploadInstitutionsTemplate() {
  yield takeLatest(
    institutionActions.UPLOAD_INSTITUTIONS_TEMPLATE_REQUEST,
    uploadInstitutionsTemplate
  );
}

const forkFunctions = [
  fork(watchCreateInstitution),
  fork(watchUpdateInstitution),
  fork(watchAddSupportItems),
  fork(watchAddStudyClasses),
  fork(watchAddPaymentCycles),
  fork(watchDeleteSupportItem),
  fork(watchDeletePaymentCycle),
  fork(watchDeleteStudyClass),
  fork(watchGetSupportItems),
  fork(watchGetPaymentCycles),
  fork(watchGetStudyClasses),
  fork(watchFetchInstitutions),
  fork(watchUploadInstitutionsTemplate),
  fork(watchDownloadInstitutionsTemplate),
];

export default forkFunctions;
