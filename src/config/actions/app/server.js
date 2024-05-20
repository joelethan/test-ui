const server = {
  SERVER_REQUEST: "SERVER_REQUEST",
  SERVER_SUCCESS: "SERVER_SUCCESS",
  SERVER_ERROR: "SERVER_ERROR",

  VERIFY_GOOGLE_RECAPTURE_REQUEST: "VERIFY_GOOGLE_RECAPTURE_REQUEST",
  VERIFY_GOOGLE_RECAPTURE_SUCCESS: "VERIFY_GOOGLE_RECAPTURE_SUCCESS",
  VERIFY_GOOGLE_RECAPTURE_ERROR: "VERIFY_GOOGLE_RECAPTURE_ERROR",

  serverRequest: () => ({
    type: server.SERVER_REQUEST,
  }),

  verifyGoogleToken: (data) => ({
    type: server.VERIFY_GOOGLE_RECAPTURE_REQUEST,
    data,
  }),

  serverError: (error) => ({
    type: server.SERVER_ERROR,
    error,
  }),

  serverSuccess: (data) => ({
    type: server.SERVER_SUCCESS,
    data,
  }),
};

export default server;
