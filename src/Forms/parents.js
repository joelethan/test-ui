import { toUpper } from "lodash";
import { countryList, nationalityList } from "../containers/constants";

const parentsForm = (prefix) => [
  {
    label: "Surname",
    name: `${prefix}surname`,
    rules: [
      {
        required: true,
        message: "Surname is required",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Other Names",
    name: `${prefix}other_names`,
    rules: [
      {
        required: true,
        message: "Other name is required",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Telephone No.",
    name: `${prefix}telephone_number`,
    rules: [],
    inputAttributes: {
      type: "tel",
    },
    itemAttributes: {},
  },
  {
    label: "Permanent Address",
    name: `${prefix}address`,
    rules: [
      {
        required: true,
        message: "Address is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Country of Residence",
    name: `${prefix}country_of_residence`,
    rules: [
      {
        required: true,
        message: "Country of Residence is required",
      },
    ],
    type: "select",
    options: countryList.map((country) => {
      return { label: toUpper(country.name), value: toUpper(country.name) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Citizenship",
    name: `${prefix}citizenship`,
    rules: [
      {
        required: true,
        message: "Citizenship is required",
      },
    ],
    type: "select",
    options: nationalityList.map((country) => {
      return { label: toUpper(country), value: toUpper(country) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Nationality",
    name: `${prefix}nationality`,
    rules: [
      {
        required: true,
        message: "Nationality is required",
      },
    ],
    type: "select",
    options: nationalityList.map((country) => {
      return { label: toUpper(country), value: toUpper(country) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "District of Birth",
    name: `${prefix}district_of_birth`,
    rules: [
      {
        required: true,
        message: "District is required",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Sub County",
    name: `${prefix}sub_county`,
    rules: [
      {
        required: true,
        message: "Sub-county is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Village of Birth",
    name: `${prefix}village_of_birth`,
    rules: [
      {
        required: true,
        message: "Village of Birth is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Date of Birth",
    name: `${prefix}date_of_birth`,
    type: "date",
    rules: [
      {
        required: true,
        message: "Date of Birth is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Relationship",
    name: `${prefix}relationship`,
    rules: [
      {
        required: true,
        message: "Your Relationship is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export default parentsForm;
