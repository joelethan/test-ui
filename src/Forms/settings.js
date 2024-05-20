export const addSupportItems = [
  {
    label: "Support Items",
    name: "items",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Enter Support Items",
      },
    ],
    inputAttributes: {
      allowClear: true,
      mode: "multiple",
    },
    itemAttributes: {},
  },
];

export const addPaymentCycles = [
  {
    label: "Payment Cycles",
    name: "cycles",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Enter Payment Cycles",
      },
    ],
    inputAttributes: {
      allowClear: true,
      mode: "multiple",
    },
    itemAttributes: {},
  },
];

export const addStudyClasses = [
  {
    label: "Study Classes",
    name: "classes",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Enter Study Classes",
      },
    ],
    inputAttributes: {
      allowClear: true,
      mode: "multiple",
    },
    itemAttributes: {},
  },
];
