import { tabActions } from "../actions";
import initialState from "../initialState";

const tab = (state = initialState.tab, actions) => {
  switch (actions.type) {
    case tabActions.PROGRAMME_TAB_REQUEST:
      return {
        ...state,
        programmeTab: { ...state.programmeTab, active: actions.activeTab },
        programmeVersionTab: {
          ...state.programmeVersionTab,
          active:
            actions.activeTab === "programmes"
              ? "view"
              : state.programmeVersionTab.active,
        },
      };

    case tabActions.PROGRAMME_VERSION_TAB:
      return {
        ...state,
        programmeVersionTab: {
          ...state.programmeVersionTab,
          active: actions.activeTab,
        },
      };

    case tabActions.FEES_WAIVERS_TAB:
      return {
        ...state,
        feesWaiversTab: {
          ...state.feesElementsTab,
          active: actions.activeTab,
        },
      };
    case tabActions.OTHER_FEES_TAB:
      return {
        ...state,
        otherFeesTab: {
          ...state.otherFeesTab,
          active: actions.activeTab,
        },
      };
    case tabActions.WAIVER_DISCOUNTS_TAB:
      return {
        ...state,
        waiverDiscountsTab: {
          ...state.waiverDiscountsTab,
          active: actions.activeTab,
        },
      };
    case tabActions.ACADEMIC_YEAR_TAB:
      return {
        ...state,
        academicYearTab: {
          ...state.academicYearTab,
          active: actions.activeTab,
        },
      };

    case tabActions.ACADEMIC_YEAR_EVENT_TAB:
      return {
        ...state,
        academicYearEventTab: {
          ...state.academicYearEventTab,
          active: actions.activeTab,
        },
      };

    case tabActions.ADVERTISE_PROGRAMME_TAB:
      return {
        ...state,
        viewProgrammeTab: {
          ...state.viewProgrammeTab,
          active: actions.activeTab,
        },
      };

    default:
      return state;
  }
};

export default tab;
