const metadata = {
  GET_META_DATA_REQUEST: "GET_META_DATA_REQUEST",
  GET_META_DATA_SUCCESS: "GET_META_DATA_SUCCESS",
  GET_META_DATA_ERROR: "GET_META_DATA_ERROR",

  CREATE_META_DATA_REQUEST: "CREATE_META_DATA_REQUEST",
  CREATE_META_DATA_SUCCESS: "CREATE_META_DATA_SUCCESS",
  CREATE_META_DATA_ERROR: "CREATE_META_DATA_ERROR",

  ADD_METADATA_VALUES_REQUEST: "ADD_METADATA_VALUES_REQUEST",
  ADD_METADATA_VALUES_SUCCESS: "ADD_METADATA_VALUES_SUCCESS",
  ADD_METADATA_VALUES_ERROR: "ADD_METADATA_VALUES_ERROR",

  SET_METADATA_VALUE_VIEW: "SET_METADATA_VALUE_VIEW",
  SET_SELECTED_METADATA: "SET_SELECTED_METADATA",
  SET_SEARCH_PARAM: "SET_SEARCH_PARAM",

  getMetadata: () => ({
    type: metadata.GET_META_DATA_REQUEST,
  }),

  createMetadata: (data) => ({
    type: metadata.CREATE_META_DATA_REQUEST,
    data,
  }),

  addMetadataValues: (data) => ({
    type: metadata.ADD_METADATA_VALUES_REQUEST,
    data,
  }),

  setSearchParam: (data) => ({
    type: metadata.SET_SEARCH_PARAM,
    data,
  }),

  setSelectedMetadata: (payload) => ({
    type: metadata.SET_SELECTED_METADATA,
    payload,
  }),

  setMetadataValueView: (payload) => ({
    type: metadata.SET_METADATA_VALUE_VIEW,
    payload,
  }),
};

export default metadata;
