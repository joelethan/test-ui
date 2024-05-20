import { times } from "lodash";

export const ordinaryLevelForm = [
  {
    label: "SCHOOL NAME",
    name: "school_name",
    rules: [
      {
        required: true,
        message: "School Name is required",
      },
    ],
    col: 6,
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "YEAR OF SITTING",
    name: "exam_year",
    type: "select",
    options: times(7).map((year, index) => {
      const currentDate = parseInt(new Date().getFullYear(), 10) - 1;

      return {
        value: currentDate - index,
        label: currentDate - index,
      };
    }),
    rules: [
      {
        required: true,
        message: "Year of sitting is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
    col: 3,
  },
];

export const advancedLevelForm = [
  {
    label: "SCHOOL NAME",
    name: "school_name",
    rules: [
      {
        required: true,
        message: "School Name is required",
      },
    ],
    col: 6,
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "YEAR OF SITTING",
    name: "exam_year",
    type: "select",
    options: times(4).map((year, index) => {
      const currentDate = parseInt(new Date().getFullYear(), 10) - 1;

      return {
        value: currentDate - index,
        label: currentDate - index,
      };
    }),
    rules: [
      {
        required: true,
        message: "Year of sitting is required",
      },
    ],
    inputAttributes: {
      type: "number",
    },
    itemAttributes: {},
    col: 3,
  },
];

export const oLevelGradeOptions = [
  {
    value: "D1",
    label: "D1",
  },
  {
    value: "D2",
    label: "D2",
  },
  {
    value: "C3",
    label: "C3",
  },
  {
    value: "C4",
    label: "C4",
  },
  {
    value: "C5",
    label: "C5",
  },
  {
    value: "C6",
    label: "C6",
  },
  {
    value: "P7",
    label: "P7",
  },
  {
    value: "P8",
    label: "P8",
  },
  {
    value: "F9",
    label: "F9",
  },
  {
    value: "X",
    label: "X",
  },
];

export const aLevelGradeOptions = [
  {
    value: "F",
    label: "F",
  },
  {
    value: "O",
    label: "O",
  },
  {
    value: "E",
    label: "E",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "A",
    label: "A",
  },
  {
    value: "D1",
    label: "D1",
  },
  {
    value: "D2",
    label: "D2",
  },
  {
    value: "C3",
    label: "C3",
  },
  {
    value: "C4",
    label: "C4",
  },
  {
    value: "C5",
    label: "C5",
  },
  {
    value: "C6",
    label: "C6",
  },
  {
    value: "P7",
    label: "P7",
  },
  {
    value: "P8",
    label: "P8",
  },
  {
    value: "F9",
    label: "F9",
  },
  {
    value: "X",
    label: "x",
  },
];
