const tab = {
  PROGRAMME_TAB_REQUEST: "PROGRAMME_TAB_REQUEST",

  PROGRAMME_VERSION_TAB: "PROGRAMME_VERSION_TAB",

  FEES_WAIVERS_TAB: "FEES_WAIVERS_TAB",

  OTHER_FEES_TAB: "OTHER_FEES_TAB",
  ADVERTISE_PROGRAMME_TAB: "ADVERTISE_PROGRAMME_TAB",

  WAIVER_DISCOUNTS_TAB: "WAIVER_DISCOUNTS_TAB",
  ACADEMIC_YEAR_TAB: "ACADEMIC_YEAR_TAB",
  ACADEMIC_YEAR_EVENT_TAB: "ACADEMIC_YEAR_EVENT_TAB",

  switchProgrammeTab: (activeTab) => ({
    type: tab.PROGRAMME_TAB_REQUEST,
    activeTab,
  }),

  switchProgrammeVersionTab: (activeTab) => ({
    type: tab.PROGRAMME_VERSION_TAB,
    activeTab,
  }),

  switchFeesWaiversTab: (activeTab) => ({
    type: tab.FEES_WAIVERS_TAB,
    activeTab,
  }),

  switchOtherFeesTab: (activeTab) => ({
    type: tab.OTHER_FEES_TAB,
    activeTab,
  }),

  switchWaiverDiscountsTab: (activeTab) => ({
    type: tab.WAIVER_DISCOUNTS_TAB,
    activeTab,
  }),

  switchAcademicYearTab: (activeTab) => ({
    type: tab.ACADEMIC_YEAR_TAB,
    activeTab,
  }),

  switchEventTab: (activeTab) => ({
    type: tab.ACADEMIC_YEAR_EVENT_TAB,
    activeTab,
  }),

  switchAdvertiseProgrammeTab: (activeTab) => ({
    type: tab.ADVERTISE_PROGRAMME_TAB,
    activeTab,
  }),
};

export default tab;
