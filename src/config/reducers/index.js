import { combineReducers } from "redux";
import { authActions } from "../actions";
import metadata from "./app/metadata";
import server from "./app/server";
import auth from "./auth";
import setting from "./setting";
import runningAdmission from "./admission/runningAdmission";
import beneficiary from "./beneficiary";
import institution from "./institution";
import tab from "./tab";

const appReducer = combineReducers({
  setting,
  auth,
  metadata,
  server,
  tab,
  runningAdmission,
  beneficiary,
  institution,
});

const rootReducer = (state, actions) => {
  let newState = state;
  if (actions.type === authActions.LOGOUT_SUCCESS) {
    newState = {};
  }
  return appReducer(newState, actions);
};

export default rootReducer;
