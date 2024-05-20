import { serverActions } from "../../actions";
import initialState from "../../initialState";

const server = (state = initialState.server, actions) => {
  switch (actions.type) {
    case serverActions.SERVER_REQUEST:
      return {
        success: {},
        error: {},
      };

    case serverActions.SERVER_ERROR:
      return {
        success: {},
        serverError: actions.error.data,
      };

    case serverActions.SERVER_SUCCESS:
      return {
        success: actions.data,
        error: {},
      };

    case serverActions.VERIFY_GOOGLE_RECAPTURE_REQUEST:
      return {
        verifyingGoogleToken: true,
        verifyGoogleTokenError: {},
      };

    case serverActions.VERIFY_GOOGLE_RECAPTURE_SUCCESS:
      return {
        verifyingGoogleToken: false,
        verifyGoogleTokenResponse: actions.data,
      };

    case serverActions.VERIFY_GOOGLE_RECAPTURE_ERROR:
      return {
        verifyingGoogleToken: false,
        verifyGoogleTokenError: actions.error,
      };

    default:
      return state;
  }
};

export default server;
