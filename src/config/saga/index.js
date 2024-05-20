import { all } from "redux-saga/effects";
import metadata from "./app/metadata";
import server from "./app/server";
import auth from "./auth";
import runningAdmission from "./admission/runningAdmission";
import beneficiary from "./beneficiary";
import institution from "./institution";

const rootSaga = function* root() {
  yield all([
    ...auth,
    ...metadata,
    ...server,
    ...runningAdmission,
    ...beneficiary,
    ...institution,
  ]);
};

export default rootSaga;
