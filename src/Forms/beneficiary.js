import { isEmpty, toUpper } from "lodash";
import moment from "moment";
import {
  countryList,
  districts,
  institutionCodes,
  nationalityList,
} from "../containers/constants";
import deadOrAlive from "../containers/constants/deadOrAlive";

export const applicantProfileForm = [
  {
    label: "Surname",
    name: "surname",
    rules: [
      {
        required: true,
        message: "Please input user surname!",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Other Names",
    name: "other_names",
    rules: [
      {
        required: true,
        message: "Please input user other names",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Email",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please input user Email",
      },
    ],
    inputAttributes: {
      type: "email",
    },
    itemAttributes: {},
  },
  {
    label: "Phone Number",
    name: "phone",
    rules: [
      {
        required: true,
        message: "Please input user telephone number",
      },
    ],
    inputAttributes: {
      placeholder: "256XXXXXXX",
      type: "tel",
    },
    itemAttributes: {},
  },
  {
    label: "Sex",
    name: "gender",
    rules: [],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Last Login",
    name: "last_login",
    rules: [],
    inputAttributes: {
      disabled: true,
    },
    itemAttributes: {},
  },
];

export const changeDefaultPasswordForm = [];

export const changeOldPasswordForm = [
  {
    name: "old_password",
    label: "Old Password",
    type: "password",
    rules: [
      {
        required: true,
        message: "Please your Old Password",
      },
    ],
    inputAttributes: {},
    itemAttributes: {
      tooltip: "Password used during Login",
    },
  },
  {
    label: "New Password",
    name: "new_password",
    rules: [
      {
        required: true,
        message: "Please Enter your New Password",
      },
    ],
    inputAttributes: {
      type: "password",
      autoComplete: "off",
    },
    type: "password",
    itemAttributes: {
      tooltip: "At least 6 characters long",
    },
  },
  {
    label: "Confirm Password",
    name: "confirm_password",
    dependencies: ["new_password"],
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: "Please Confirm your New password",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("new_password") === value) {
            return Promise.resolve();
          }

          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ],
    type: "password",
    inputAttributes: {
      type: "password",
      autoComplete: "off",
    },
    itemAttributes: {
      tooltip: "Must match the New Password",
    },
  },
];

export const beneficiariesColumn = [
  {
    name: "surname",
    label: "Surname",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter User surname",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Other Names",
    name: "other_names",
    rules: [
      {
        required: true,
        message: "Please input user other names",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Email",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please input user Email",
      },
    ],
    inputAttributes: {
      type: "email",
    },
    itemAttributes: {},
  },
  {
    label: "Phone Number",
    name: "phone",
    rules: [
      {
        required: true,
        message: "Please input user telephone number",
      },
    ],
    inputAttributes: {
      placeholder: "256XXXXXXX",
      type: "tel",
    },
    itemAttributes: {},
  },
  {
    label: "Sex",
    name: "gender",
    rules: [
      {
        required: true,
        message: "Please input user Gender",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Salutation",
    name: "salutation_id",
    rules: [
      {
        required: true,
        message: "Please input user Title",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const createStateUser = [
  {
    label: "Salutation",
    name: "salutation_id",
    rules: [
      {
        required: true,
        message: "Please input user Title",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter User surname",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Other Names",
    name: "other_names",
    rules: [
      {
        required: true,
        message: "Please input user other names",
      },
    ],
    inputAttributes: {
      placeholder: null,
    },
    itemAttributes: {},
  },
  {
    label: "Email",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please input user Email",
      },
    ],
    inputAttributes: {
      type: "email",
    },
    itemAttributes: {},
  },
];

export const moreCreateStateUser = [
  {
    label: "Phone Number",
    name: "phone",
    rules: [
      {
        required: true,
        message: "Please Select Phone Number",
      },
      {
        validator: (_, value) => {
          if (value && value.length !== 12)
            return Promise.reject(
              new Error("Please Enter a Valid Phone Number")
            );
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {
      placeholder: "256XXXXXXX",
      type: "number",
    },
    itemAttributes: {},
  },
  {
    label: "Sex",
    name: "gender",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please input user Gender",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Permissions",
    name: "permissions",
    rules: [],
    type: "select",
    inputAttributes: {
      allowClear: true,
      mode: "multiple",
    },
    itemAttributes: {},
  },
];

export const createBeneficiary = [
  {
    label: "Student Number",
    name: "student_number",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter ACMIS Student Number",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Registration Number",
    name: "registration_number",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter ACMIS Registration Number",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Name",
    name: "tax_head_code",
    rules: [
      {
        required: true,
        message: "Please Select Student's Institution",
      },
    ],
    type: "select",
    options: institutionCodes.map((item) => {
      return { label: toUpper(item.name), value: toUpper(item.code) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Guardian's Relationship",
    name: "relationship",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Relationship",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Guardian's Nationality",
    name: "nationality",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Nationality",
      },
    ],
    options: nationalityList.map((country) => {
      return { label: toUpper(country), value: toUpper(country) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const moreCreateBeneficiary = [
  {
    label: "Guardian's Name",
    name: "surname",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Guardian's Name",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Other Names",
    name: "other_names",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Other Names",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Date of Birth1",
    name: "date_of_birth",
    type: "simple_date",
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
    label: "Salutation",
    name: "salutation_id",
    rules: [
      {
        required: true,
        message: "Please Select Salutation",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
];
export const calendarForm = {
  type: "simple_date",
  rules: [],
  inputAttributes: {},
  itemAttributes: {},
};

export const createNonAcmisBeneficiary = [
  // {
  //   label: "Surname",
  //   name: "surname",
  //   type: "text",
  //   rules: [
  //     {
  //       required: true,
  //       message: "Please Enter Surname",
  //     },
  //   ],
  //   inputAttributes: {},
  //   itemAttributes: {},
  // },
  // {
  //   label: "Other Names",
  //   name: "other_names",
  //   type: "text",
  //   rules: [
  //     {
  //       required: true,
  //       message: "Please Enter Other Names",
  //     },
  //   ],
  //   inputAttributes: {},
  //   itemAttributes: {},
  // },
  // {
  //   label: "Gender",
  //   name: "gender_id",
  //   rules: [
  //     {
  //       required: true,
  //       message: "Please Select Gender",
  //     },
  //   ],
  //   type: "select",
  //   inputAttributes: {},
  //   itemAttributes: {},
  // },
  // {
  //   label: "Beneficiary Contact",
  //   name: "phone",
  //   rules: [
  //     {
  //       required: true,
  //       message: "Please Select Phone Number",
  //     },
  //     {
  //       validator: (_, value) => {
  //         if ((value && value.length !== 9) || /^[a-zA-Z]+$/.test(value))
  //           return Promise.reject(
  //             new Error("Please Enter a Valid Phone Number")
  //           );
  //         return Promise.resolve();
  //       },
  //     },
  //   ],
  //   type: "tel",
  //   inputAttributes: {},
  //   itemAttributes: {},
  // },
  {
    label: "Date of Birth",
    name: "date_of_birth",
    type: "simple_date",
    rules: [
      {
        required: true,
        message: "Please Select Date of Birth",
      },
      {
        validator: (_, value) => {
          const today = moment().startOf("day");
          if (value.isSame(today) || value.isAfter(today)) {
            return Promise.reject(new Error("Please Select a Past Date"));
          }
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const fatherGuardian = [
  {
    label: "Father's Surname",
    name: "father_surname",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Surname",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Father's Other Names",
    name: "father_other_names",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Other Names",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Dead / Alive",
    name: "father_dead_or_alive",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select",
      },
    ],
    options: deadOrAlive.map((item) => {
      return { label: toUpper(item), value: toUpper(item) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const fatherDoA = [
  {
    label: "If dead (Period)",
    name: "father_death_period",
    rules: [],
    inputAttributes: {
      type: "number",
      placeholder: "No. of Years",
    },
    itemAttributes: {},
  },
];

export const fatherExtra = [
  {
    label: "Occupation",
    name: "father_occupation",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Occupation",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Place of Work",
    name: "father_place_of_work",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Place of Work",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Father's Contact",
    name: "father_telephone_number",
    rules: [
      {
        required: true,
        message: "Please Select Phone Number",
      },
      {
        validator: (_, value) => {
          if (value && value.length !== 12)
            return Promise.reject(
              new Error("Please Enter a Valid Phone Number")
            );
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {
      placeholder: "256XXXXXXX",
      type: "number",
    },
    itemAttributes: {},
  },
];

export const motherGuardian = [
  {
    label: "Mother's Surname",
    name: "mother_surname",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Surname",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Mother's Other Names",
    name: "mother_other_names",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Other Names",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Dead / Alive",
    name: "mother_dead_or_alive",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select",
      },
    ],
    options: deadOrAlive.map((item) => {
      return { label: toUpper(item), value: toUpper(item) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const motherDoA = [
  {
    label: "If dead (Period)",
    name: "mother_death_period",
    rules: [],
    inputAttributes: {
      type: "number",
      placeholder: "No. of Years",
    },
    itemAttributes: {},
  },
];

export const motherExtra = [
  {
    label: "Occupation",
    name: "mother_occupation",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Occupation",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Place of Work",
    name: "mother_place_of_work",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Place of Work",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Mother's Contact",
    name: "mother_telephone_number",
    rules: [
      {
        required: true,
        message: "Please Select Phone Number",
      },
      {
        validator: (_, value) => {
          if (value && value.length !== 12)
            return Promise.reject(
              new Error("Please Enter a Valid Phone Number")
            );
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {
      placeholder: "256XXXXXXX",
      type: "number",
    },
    itemAttributes: {},
  },
];

export const villageOptions = [
  {
    label: "ID Number",
    name: "national_id",
    type: "text",
    rules: [],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Place of Birth",
    name: "district_of_birth",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    options: districts.map((item) => {
      return { label: toUpper(item), value: toUpper(item) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Place of Residence",
    name: "permanent_address",
    rules: [
      {
        required: true,
        message: "Field Required",
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
    label: "Home District",
    name: "home_district",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    type: "select",
    options: districts.map((item) => {
      return { label: toUpper(item), value: toUpper(item) };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const moreNonAcmisBeneficiary = [
  {
    label: "Upload Photo",
    name: "avatar",
    type: "test",
    rules: [
      {
        required: true,
        message: "Please Select Photo",
        validator: (_, value) => {
          if (value === undefined) {
            return Promise.reject(new Error());
          }
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Helped By?",
    name: "helped_by",
    type: "text",
    rules: [
      {
        required: true,
        message: "Enter The Person Who Helped You Join Sponsorship",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Reason for Joining",
    name: "reason",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "Please Enter a Reason",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Nationality",
    name: "nationality",
    rules: [
      {
        required: true,
        message: "Nationality is required",
      },
    ],
    type: "select",
    options: countryList.map((country) => {
      return {
        label: toUpper(country.nationality),
        value: toUpper(country.nationality),
      };
    }),
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const paymentOptions = [
  {
    label: "Institution",
    name: "pay_institution_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Academic Year",
    name: "academic_year_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Academic Year",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Amount Paid",
    name: "amount_paid",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Amount Paid",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Payment Date",
    name: "payment_date",
    type: "date",
    rules: [
      {
        required: true,
        message: "Payment Date is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Description",
    name: "narration",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "Please Enter Payment Description",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const addPaymentOptions = [
  {
    label: "Amount Paid",
    name: "amount_paid",
    type: "number",
    rules: [
      {
        required: true,
        message: "Please Enter Amount",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const allocationOptions = [
  {
    label: "Support Item",
    name: "support_item_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Academic Year",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Class / Year",
    name: "class_or_year_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Class",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Allocation Amount",
    name: "amount",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Amount",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const institutionOptions = [
  {
    label: "Institution Type",
    name: "institution_type_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution Type",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution",
    name: "institution_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Directive From",
    name: "directive_by_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Directive From",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Directive Attachment",
    name: "directive_attachment",
    type: "file",
    rules: [
      {
        required: true,
        message: "Please Select Attachment",
        validator: (_, value) => {
          if (isEmpty(value.fileList)) {
            return Promise.reject(new Error());
          }
          return Promise.resolve();
        },
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution Join Date",
    name: "institution_start_date",
    type: "date",
    rules: [
      {
        required: true,
        message: "Start Date is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Sponsorship Start Date",
    name: "sponsorship_start_date",
    type: "date",
    rules: [
      {
        required: true,
        message: "Start Date is required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Academic Year",
    name: "academic_year_id",
    rules: [
      {
        required: true,
        message: "Please Select Academic Year",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Class / Year",
    name: "class_or_year_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Select Class",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Sponsorship Period",
    name: "sponsorship_period",
    rules: [],
    inputAttributes: {
      type: "number",
      placeholder: "No. of Years",
    },
    itemAttributes: {},
  },
];

export const progExtra = [
  {
    label: "Programme of Study",
    name: "programme_of_study",
    type: "text",
    rules: [],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Programme Type",
    name: "programme_type_id",
    type: "select",
    rules: [],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const acmisPaymentsOptions = [
  {
    label: "Academic Year",
    name: "academic_year_id",
    rules: [
      {
        required: true,
        message: "Please Select Academic Year",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Amount Paid",
    name: "amount_paid",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please Enter Amount Paid",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const userRoleOptions = [
  {
    label: "Role",
    name: "role_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Enter Role",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institutions",
    name: "institutions",
    rules: [],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "System Admin?",
    name: "is_admin",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please Enter Role",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const resultsContextOptions = [
  {
    label: "Institution Type",
    name: "institution_type",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution",
    name: "institution_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Academic Year",
    name: "academic_year_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const beneficiaryContextOptions = [
  {
    label: "Institution Type",
    name: "institution_type",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution",
    name: "institution_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Payment Cycle",
    name: "payment_cycle_id",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Academic Year",
    name: "academic_year_id",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const institutionBeneficiariesOptions = [
  {
    label: "Institution Type",
    name: "institution_type",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Institution",
    name: "institution_id",
    rules: [
      {
        required: true,
        message: "Please Select Institution",
      },
    ],
    type: "select",
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const searchBeneficiary = [
  {
    label: "Search Parameter",
    name: "beneficiary",
    type: "text",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {
      placeholder: "Enter Beneficiary SH-number or Phone-number",
    },
    itemAttributes: {},
  },
];

export const dashboardOptions = [
  {
    label: "Academic Year",
    name: "academicYearId",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];

export const taxCodeOptions = [
  {
    label: "Institution",
    name: "institutionId",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Search Parameter",
    name: "searchBy",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
  {
    label: "Student Detail",
    name: "student",
    type: "text",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {
      placeholder: "Search ...",
    },
    itemAttributes: {},
  },
  {
    label: "Entry Academic Year",
    name: "academicYearId",
    type: "select",
    rules: [
      {
        required: true,
        message: "Field Required",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
  },
];
