import admission from "./admission";
import appInitialState from "./app";
import auth from "./auth";
import setting from "./setting";
import tab from "./tab";
import beneficiary from "./beneficiary";

const initialStates = {
  ...appInitialState,
  ...setting,
  ...admission,
  ...beneficiary,
  ...auth,
  tab,
};

export default initialStates;
