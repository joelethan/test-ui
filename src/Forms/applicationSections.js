import { toUpper } from "lodash";
import { gender, nationalityList } from "../containers/constants";

export const bioDataForm = [
  {
    section: "Personal Details",
    key: 1,
    fields: [
      {
        label: "Surname",
        name: "surname",
        rules: [
          {
            required: true,
            message: "Your Surname is required",
          },
        ],
        inputAttributes: {
          disabled: true,
        },
        itemAttributes: {},
      },
      {
        label: "Other Names",
        name: "other_names",
        rules: [
          {
            required: true,
            message: "Your other name is required",
          },
        ],
        inputAttributes: {
          disabled: true,
        },
        itemAttributes: {},
      },
      {
        label: "Sex",
        name: "gender",
        rules: [
          {
            required: true,
            message: "Please input user's sex",
          },
        ],
        type: "select",
        options: gender.map((g) => {
          return {
            label: g,
            value: g,
          };
        }),
        inputAttributes: {
          disabled: true,
        },
        itemAttributes: {},
      },
      {
        label: "Email",
        name: "email",
        rules: [
          {
            required: true,
            message: "Your Email is required",
          },
        ],
        inputAttributes: {
          type: "email",
          disabled: true,
        },
        itemAttributes: {},
      },
      {
        label: "Telephone No.",
        name: "phone",
        rules: [
          {
            required: true,
            message: "Please Select Phone Number",
          },
          {
            validator: (_, value) => {
              if (value && value.length !== 12)
                return Promise.reject(new Error('Please Enter a Valid Phone Number'));
              return Promise.resolve();
            }
          }
        ],
        inputAttributes: {
          placeholder: "256XXXXXXX",
          type: "number",
        },
        itemAttributes: {},
      },
      // {
      //   label: "Date of Birth",
      //   name: "date_of_birth",
      //   type: "date",
      //   rules: [
      //     {
      //       required: true,
      //       message: "Date of Birth is required",
      //     },
      //   ],
      //   inputAttributes: {},
      //   itemAttributes: {},
      // },
      {
        label: "Marital status",
        name: "marital_status",
        rules: [
          {
            required: true,
            message: "Please input user's sex",
          },
        ],
        type: "select",
        options: [
          {
            label: "MARRIED",
            value: "MARRIED",
          },
          {
            label: "SINGLE",
            value: "SINGLE",
          },
          {
            label: "DIVORCED",
            value: "DIVORCED",
          },
          {
            label: "SEPARATED",
            value: "SEPARATED",
          },
          {
            label: "WIDOWED",
            value: "WIDOWED",
          },
          {
            label: "COHABITING",
            value: "COHABITING",
          },
          {
            label: "NOT DISCLOSED",
            value: "NOT DISCLOSED",
          },
        ],
        inputAttributes: {},
        itemAttributes: {},
      },
      {
        label: "Religious Affiliation.",
        name: "religion",
        rules: [],
        inputAttributes: {},
        itemAttributes: {
          extra: "If any",
        },
      },
      {
        label: "Fax No.",
        name: "fax_no",
        rules: [],
        inputAttributes: {},
        itemAttributes: {},
      },
    ],
  },
  {
    key: 2,
    section: "Other Details",
    fields: [
      {
        label: "Permanent Address",
        name: "permanent_address",
        rules: [
          {
            required: true,
            message: "Your Address is required",
          },
        ],
        inputAttributes: {
          maxLength: 100,
        },
        itemAttributes: {},
      },
      {
        label: "Emergency Contact",
        name: "emergency_contact_address",
        rules: [],
        inputAttributes: {
          maxLength: 100,
        },
        itemAttributes: {
          extra: "If different from Permanent address",
        },
      },
      {
        label: "Citizenship",
        name: "citizenship",
        rules: [
          {
            required: true,
            message: "Your Citizenship is required",
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
        label: "Home District",
        name: "home_district",
        rules: [
          {
            required: true,
            message: "Your District is required",
          },
        ],
        inputAttributes: {
          placeholder: null,
        },
        itemAttributes: {},
      },
      {
        label: "County",
        name: "county",
        rules: [
          {
            required: true,
            message: "Your County is required",
          },
        ],
        inputAttributes: {},
        itemAttributes: {},
      },
      {
        label: "Sub County (L.C III)",
        name: "sub_county",
        rules: [
          {
            required: true,
            message: "Your Sub-county is required",
          },
        ],
        inputAttributes: {},
        itemAttributes: {},
      },
      {
        label: "Parish (L.C II)",
        name: "parish",
        rules: [
          {
            required: true,
            message: "Your Parish is required",
          },
        ],
        inputAttributes: {},
        itemAttributes: {},
      },
      {
        label: "Village (L.C I)",
        name: "village",
        rules: [
          {
            required: true,
            message: "Village is required",
          },
        ],
        inputAttributes: {},
        itemAttributes: {},
      },
    ],
  },
];

export const programmeChoiceForm = [];
