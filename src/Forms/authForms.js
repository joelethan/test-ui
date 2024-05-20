/* eslint-disable react/react-in-jsx-scope */
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const loginForm = (loginType) => [
  {
    label: loginType === "email" ? "Email address" : "Phone Number",
    name: "username",
    rules: [
      {
        required: true,
        message: `Please enter your ${
          loginType === "email" ? "email address" : "Phone Number"
        } `,
      },
    ],
    inputAttributes: {
      type: loginType === "email" ? loginType : "number",
      min: 0,
      prefix:
        loginType === "email" ? (
          <MailOutlined className="site-form-item-icon" />
        ) : (
          <PhoneOutlined className="site-form-item-icon" />
        ),
    },
    itemAttributes: {
      className: "mb-3",
    },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    rules: [
      {
        required: true,
        message: "Please enter your Password.",
      },
    ],
    inputAttributes: {
      prefix: <LockOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {
      className: "mb-3",
    },
  },
];

export const registerForm = [
  {
    label: "SURNAME",
    name: "surname",
    rules: [
      {
        required: true,
        message: `Please enter your Surname`,
      },
    ],
    inputAttributes: {
      prefix: <UserOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {},
  },
  {
    label: "OTHER NAMES",
    name: "other_names",
    rules: [
      {
        required: true,
        message: "Please enter Other Names.",
      },
    ],
    inputAttributes: {
      prefix: <UserOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {},
  },
  {
    label: "EMAIL ADDRESS",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please enter E-mail address.",
      },
    ],
    inputAttributes: {
      prefix: <MailOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {
      extra: "Provide a valid Email address",
    },
  },
  {
    label: "PHONE NO.",
    name: "phone",
    rules: [
      {
        required: true,
        message: "Please enter Phone Number",
      },
    ],
    inputAttributes: {
      min: 0,
      type: "number",
      prefix: <PhoneOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {
      extra: "Include country code(E.G 256xxxxxxx)",
    },
  },
];

export const forgotPasswordForm = [
  {
    label: "Email Address",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please enter your Email address",
      },
    ],
    inputAttributes: {
      placeholder: "myexample@domain.com",
      type: "email",
      prefix: <MailOutlined className="site-form-item-icon" />,
    },
    itemAttributes: {},
  },
];

export const resetWithForm = (resetType) => [
  {
    label: resetType === "email" ? "Email address" : "Phone Number",
    name: "username",
    rules: [
      {
        required: true,
        message: `Please enter your ${
          resetType === "email" ? "email address" : "Phone Number"
        } `,
      },
    ],
    inputAttributes: {
      type: resetType === "email" ? resetType : "tel",
    },
    itemAttributes: {},
  },
];

export const resetPasswordForm = [
  {
    name: "otp",
    label: "One Time Password (OTP)",
    rules: [
      {
        required: true,
        message: "Please enter Token",
      },
    ],
    inputAttributes: {},
    itemAttributes: {},
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
      tooltip: "The Token sent to your Phone or Email",
    },
  },
  {
    label: "Confirm New Password",
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
    itemAttributes: {},
  },
];
