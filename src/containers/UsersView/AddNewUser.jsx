import { Divider, Form, Input, Select } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AlertMessage, SubmitButton } from "../../components/common";
import BarLoader from "../../components/common/BarLoader";
import { authActions, metadataActions } from "../../config/actions";
import { formatMetadata } from "../../helpers/dataFormatter";
import usePrevious from "../Hooks/usePrevious";
import { genderOptions } from "../constants";

const { Option } = Select;

function AddNewUser() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [changeSuccess, setChangeSuccess] = useState(null);
  const [userTitleOptions, setUserTitleOptions] = useState([]);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const {
    changePasswordError,
    changePasswordSuccess,
    registering,
    updatingUser,
    authUser,
  } = useSelector((state) => state.auth);
  const { metadata } = useSelector((state) => state.metadata);
  const { stateUsersView } = useSelector((state) => state.setting);
  const { userToEdit, gettingUserById } = useSelector(
    (state) => state.runningAdmission
  );
  const { fetchingInstitution } = useSelector((state) => state.institution);

  const [initialValues] = useState(() => {
    return {
      surname: userToEdit.surname,
      other_names: userToEdit.other_names,
      email: userToEdit.email,
      phone: userToEdit.phone,
      gender: userToEdit.gender,
      permissions: userToEdit?.permissions?.map((i) => i.permission_id),
      salutation_id: userToEdit?.userDetails?.salutation_id,
    };
  });
  const prevState = usePrevious({ changePasswordError, changePasswordSuccess });

  const prefixSelector = (pre = "") => (
    <Form.Item name={`${pre}prefix`} initialValue="256" noStyle>
      <Select
        style={{
          width: 80,
        }}
      >
        <Option value="255">+255</Option>
        <Option value="254">+254</Option>
        <Option value="256">+256</Option>
        <Option value="250">+250</Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(changePasswordError) &&
      changePasswordError !== prevState.changePasswordError
    ) {
      setErrorMessage(
        changePasswordError?.error?.message ||
          changePasswordError?.server?.message
      );
    }
    if (
      !isEmpty(prevState) &&
      !isEmpty(changePasswordSuccess) &&
      changePasswordSuccess !== prevState.changePasswordSuccess
    ) {
      setChangeSuccess(changePasswordSuccess?.server?.message);
    }
  }, [changePasswordError, changePasswordSuccess]);

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
  }, []);

  useEffect(() => {
    setUserTitleOptions(formatMetadata(metadata, "SALUTATIONS"));
    setPermissionsOptions(formatMetadata(metadata, "PERMISSIONS"));
  }, [metadata]);

  const onSubmitForm = (data) => {
    setErrorMessage(null);

    const dataToSend = {
      surname: data.surname,
      other_names: data.other_names,
      salutation_id: data.salutation_id,
      permissions: (data.permissions || []).map((item) => {
        return { permission_id: item };
      }),
      gender: data.gender,
      phone: data.prefix + data.phone,
      email: data.email,
    };
    if (stateUsersView !== "update-user") {
      return dispatch(authActions.registerUser(dataToSend));
    }
    return dispatch(
      authActions.updateStateUser(dataToSend, userToEdit.id, authUser.id)
    );
  };

  return (
    <>
      <AlertMessage
        message={errorMessage || changeSuccess}
        type={errorMessage ? "error" : "success"}
      />
      {stateUsersView === "update-user" && fetchingInstitution && <BarLoader />}
      <Form
        onFinish={onSubmitForm}
        initialValues={stateUsersView === "update-user" ? initialValues : {}}
        labelCol={{
          className: "text-sm",
        }}
        className="my-0"
        // layout="vertical"
        autoComplete="off"
        key={changeSuccess}
      >
        <Row>
          <Divider className="text-info text-uppercase fw-bold">
            USER DETAILS
          </Divider>

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="salutation_id"
              label="Salutation"
              rules={[
                {
                  required: true,
                  message: "Please Select Title",
                },
              ]}
            >
              <Select
                placeholder="Select option"
                allowClear
                showSearch
                options={userTitleOptions}
              />
            </Form.Item>
          </Col>
          <Col md={5}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please Enter Phone Number",
                },
                {
                  validator: (_, value) => {
                    if (value && value.length !== 9)
                      return Promise.reject(
                        new Error("Please Enter a Valid Phone Number")
                      );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector()}
                style={{
                  width: "100%",
                }}
                type="number"
              />
            </Form.Item>
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="surname"
              label="Surname"
              rules={[
                {
                  required: true,
                  message: "Please Enter Surname",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={5}>
            <Form.Item
              name="other_names"
              label="Other Names"
              rules={[
                {
                  required: true,
                  message: "Please Enter Other Names",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please Select Gender",
                },
              ]}
            >
              <Select
                placeholder="Select option"
                allowClear
                showSearch
                options={genderOptions}
              />
            </Form.Item>
          </Col>
          <Col md={5}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please Enter Email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item name="permissions" label="Permissions" rules={[]}>
              <Select
                placeholder="Select option"
                allowClear
                showSearch
                mode="multiple"
                options={permissionsOptions}
              />
            </Form.Item>
          </Col>
          <Col md={6} />
        </Row>

        <div className="text-end mb-3 me-3">
          <SubmitButton
            size="sm"
            text={
              stateUsersView !== "update-user" ? "register user" : "Update User"
            }
            loadingText={
              stateUsersView !== "update-user"
                ? "registering..."
                : "Updating..."
            }
            disabled={gettingUserById}
            loading={registering || updatingUser}
            className="text-sm fw-bold mt-3 text-white text-uppercase"
          />
        </div>
      </Form>
    </>
  );
}

export default AddNewUser;
