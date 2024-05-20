import { toUpper } from "lodash";
import { districts } from "../containers/constants";

export const createInstitution = [
  {
    label: "Institution Type",
    name: "institution_type_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution Code",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Name",
    name: "name",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Institution Name",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Code",
    name: "code",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Institution Code",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Address",
    name: "address",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "Please Enter Institution Address",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const moreCreateInstitution = [
  {
    label: "Institution Location",
    name: "district",
    rules: [
      {
        required: true,
        message: "Please Enter District of Location",
      },
    ],
    type: "select",
    options: districts.map((item) => {
      return { label: toUpper(item), value: toUpper(item) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Email",
    name: "email",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Institution Email",
      },
    ],
    inputAttributes: {
      type: "email",
    },
    itemAttributes: {},
  },
  {
    label: "Institution Phone",
    name: "telephone_1",
    rules: [
      {
        required: true,
        message: "Please Enter Institution Phone",
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
];
