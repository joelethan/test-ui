const appInitialState = {
  server: {
    error: {},
    success: {},

    verifyingGoogleToken: false,
    verifyGoogleTokenResponse: {},
    verifyGoogleTokenError: {},
  },
  metadata: {
    metadata: [],
    singleMetadata: {},
    metadataError: {},
    loading: false,
    searchParam: "",
    selectedMetadata: {},
    metadataValueView: "view-values",

    createMetadataError: {},
    metadataSuccess: {},
    creating: false,

    addMetadataSuccess: {},
    addMetadataValuesError: {},
    addingMetaDataValue: false,
  },
};

export default appInitialState;
