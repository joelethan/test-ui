import { metadataActions } from "../../actions";
import initialState from "../../initialState";

function metadata(state = initialState.metadata, actions) {
  switch (actions.type) {
    case metadataActions.GET_META_DATA_REQUEST:
      return {
        ...state,
        metadataError: {},
        loading: true,
      };
    case metadataActions.GET_META_DATA_SUCCESS:
      return {
        ...state,
        metadata: actions.data,
        loading: false,
      };
    case metadataActions.GET_META_DATA_ERROR:
      return {
        ...state,
        metadataError: actions.error,
        loading: false,
      };

    case metadataActions.CREATE_META_DATA_REQUEST:
      return {
        ...state,
        createMetadataError: {},
        creating: true,
      };
    case metadataActions.CREATE_META_DATA_SUCCESS:
      return {
        ...state,
        metadataSuccess: actions.data,
        creating: false,
      };
    case metadataActions.CREATE_META_DATA_ERROR:
      return {
        ...state,
        createMetadataError: actions.error,
        creating: false,
      };

    case metadataActions.ADD_METADATA_VALUES_REQUEST:
      return {
        ...state,
        addMetadataValuesError: {},
        addingMetaDataValue: true,
      };
    case metadataActions.ADD_METADATA_VALUES_SUCCESS:
      return {
        ...state,
        addMetadataSuccess: actions.data,
        addingMetaDataValue: false,
      };
    case metadataActions.ADD_METADATA_VALUES_ERROR:
      return {
        ...state,
        addMetadataValuesError: actions.error,
        addingMetaDataValue: false,
      };

    case metadataActions.SET_SEARCH_PARAM:
      return {
        ...state,
        searchParam: actions.data,
      };

    case metadataActions.SET_SELECTED_METADATA:
      // const orderingArray = null;
      // if (actions.payload.metadata_name === "STUDY LEVELS") {}
      return {
        ...state,
        selectedMetadata: actions.payload,
        // orderingArray: actions.payload,
      };

    case metadataActions.SET_METADATA_VALUE_VIEW:
      return {
        ...state,
        metadataValueView: actions.payload,
      };

    default:
      return state;
  }
}

export default metadata;
