/* eslint-disable import/no-unresolved */
import {
  Avatar,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { isEmpty, toLower, toUpper } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { calendarForm } from "../../Forms/beneficiary";
import { AntDInputText, SubmitButton } from "../../components/common";
import {
  authActions,
  beneficiaryActions,
  institutionActions,
  metadataActions,
  settingActions,
} from "../../config/actions";
import {
  formatMetadata,
  formatStateInstitutions,
  formatStudyClasses,
} from "../../helpers/dataFormatter";
import { countryList, districts } from "../constants";
import deadOrAlive from "../constants/deadOrAlive";
import SimpleCamera from "./SimpleCamera";
import { hasAccessPermissions } from "../../components/shared/helperFunctions";

const { Option } = Select;
const { TextArea } = Input;

dayjs.extend(customParseFormat);

function NonAcmisBeneficiaries() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { currentInst } = useSelector((state) => state.auth);
  const {
    stateInstitutions,
    fetchingInstitution,
    getPaymentCycleSuccess,
    getStudyClassesSuccess,
  } = useSelector((state) => state.institution);
  const {
    authUser: { permissions: userPermissions },
  } = useSelector((state) => state.auth);

  const { metadata } = useSelector((state) => state.metadata);
  const {
    creatingNonAcmisBeneficiary,
    nonAcmisBeneficiaries,
    beneficiaryContext,
  } = useSelector((state) => state.beneficiary);
  const { showModal } = useSelector((state) => state.setting);

  const [stateInstitutionOptions, setStateInstitutionOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [directiveOptions, setDirectiveOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [institutionTypeOptions, setInstitutionTypeOptions] = useState([]);
  const [studyClassOptions, setStudyClassOptions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [directiveList, setDirectiveList] = useState([]);
  const [programmeType, setProgrammeType] = useState([]);

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const onChangeDirective = ({ fileList: attachList }) => {
    setDirectiveList(attachList);
  };

  const beforeUpload = (file) => {
    const isValid = ["png", "jpeg", "jpg"].includes(
      toLower(file.name.split(".").pop())
    );
    if (!isValid) {
      message.error(`The Avatar should be of a JPEG or PNG format`);
    }
    return isValid || Upload.LIST_IGNORE;
  };

  const beforeUploadDirective = (file) => {
    const isValid = ["application/pdf"].includes(file.type);
    if (!isValid) {
      message.error(`The Attachment should be of a PDF format`);
    }
    return isValid || Upload.LIST_IGNORE;
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onPreviewDirective = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const watchObj = Form.useWatch([], form);

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

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  useEffect(() => {
    if (isEmpty(stateInstitutions) && fetchingInstitution) getInstitutions();
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());

    if (isEmpty(getPaymentCycleSuccess)) {
      dispatch(institutionActions.getPaymentCycles());
    }
    if (isEmpty(getStudyClassesSuccess))
      dispatch(institutionActions.getStudyClasses());
    if (!isEmpty(beneficiaryContext)) {
      form.setFieldsValue(beneficiaryContext);
    }
  }, []);

  useEffect(() => {
    setInstitutionTypeOptions(formatMetadata(metadata, "INSTITUTION TYPES"));
    setAcademicYearOptions(formatMetadata(metadata, "ACADEMIC YEARS"));
    setDirectiveOptions(formatMetadata(metadata, "DIRECTIVE BY"));
    setProgrammeType(formatMetadata(metadata, "PROGRAMME TYPE"));
    setGenderOptions(formatMetadata(metadata, "GENDER"));
  }, [metadata]);

  useEffect(() => {
    setStateInstitutionOptions(
      formatStateInstitutions(
        stateInstitutions.filter(
          (d) =>
            parseInt(d.institutionType.id, 10) ===
            parseInt(watchObj?.institution_type_id, 10)
        )
      )
    );
    if (
      parseInt(watchObj?.institution_type_id, 10) !==
      parseInt(beneficiaryContext.institution_type, 10)
    ) {
      form.resetFields(["institution_id"]);
    } else {
      form.setFieldsValue(beneficiaryContext);
    }
  }, [stateInstitutions, watchObj?.institution_type_id]);

  useEffect(() => {
    setStudyClassOptions(
      formatStudyClasses(
        getStudyClassesSuccess.filter(
          (i) =>
            parseInt(i.institution_id, 10) ===
            parseInt(watchObj?.institution_id, 10)
        )
      )
    );
  }, [watchObj?.institution_id]);

  useEffect(() => {
    if (isEmpty(currentInst) && !isEmpty(nonAcmisBeneficiaries)) {
      dispatch(authActions.setCurrentInst(stateInstitutionOptions[0]));
    }
  }, [nonAcmisBeneficiaries]);

  const hasInstPro = () => {
    const strType = institutionTypeOptions.find(
      (type) => type.value === watchObj?.institution_type_id
    )?.label;
    return strType?.includes("TERTIARY") || strType?.includes("UNIVERSITY");
  };

  const onSubmitForm = (data) => {
    const guardians = [
      {
        relationship: "Father",
        surname: data?.father_surname,
        other_names: data?.father_other_names,
        dead_or_alive: data?.father_dead_or_alive,
        death_period: data?.father_death_period,
        occupation: data?.father_occupation,
        place_of_work: data?.father_place_of_work,
        telephone_number: `${data?.f_prefix}${data?.father_telephone_number}`,
      },
      {
        relationship: "Mother",
        surname: data?.mother_surname,
        other_names: data?.mother_other_names,
        dead_or_alive: data?.mother_dead_or_alive,
        death_period: data?.mother_death_period,
        occupation: data?.mother_occupation,
        place_of_work: data?.mother_place_of_work,
        telephone_number: `${data?.m_prefix}${data?.mother_telephone_number}`,
      },
    ];
    const institutions = [
      {
        institution_type_id: data?.institution_type_id,
        institution_id: data?.institution_id,
        class_or_year_id: data?.class_or_year_id,
        academic_year_id: data?.academic_year_id,
        directive_by_id: data?.directive_by_id,
        institution_start_date:
          data?.institution_start_date?.format("YYYY-MM-DD"),
        sponsorship_start_date:
          data?.sponsorship_start_date?.format("YYYY-MM-DD"),
        sponsorship_period: data?.sponsorship_period,
      },
    ];
    const sData = {
      nationality: data?.nationality,
      national_id: data?.national_id,
      surname: data?.surname,
      other_names: data?.other_names,
      gender_id: data?.gender_id,
      phone: `${data?.prefix}${data?.phone}`,
      reason_for_joining: data?.reason,
      helped_by: data?.helped_by,
      date_of_birth: data?.date_of_birth?.format("YYYY-MM-DD"),
      district_of_birth: data?.district_of_birth,
      permanent_address: data?.permanent_address,
      home_district: data?.home_district,
      institutions,
      guardians,
    };

    const fData = new FormData();
    // The order of appending the files determines the order of extracting
    // filePaths in `controller.beneficiaryAttachments`
    fData.append("avatar", data.avatar.file.originFileObj);
    fData.append("directive", data.directive_attachment.file.originFileObj);

    return dispatch(
      beneficiaryActions.createNonAcmisBeneficiary({ sData, fData })
    );
  };

  return (
    <>
      <Form
        onFinish={onSubmitForm}
        initialValues={{ avaType: "Upload" }}
        form={form}
        labelCol={{
          className: "text-sm",
        }}
        disabled={hasAccessPermissions(userPermissions, [
          "CAN CREATE BENEFICIARIES",
        ])}
        labelAlign="left"
        layout="vertical"
        autoComplete="off"
        className="my-0"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
      >
        <Row>
          <Divider className="text-info text-uppercase fw-bold">
            Beneficiary Details
          </Divider>

          <Col md={1} />
          <Col md={4}>
            <Form.Item className="mb-0" name="avaType">
              <Radio.Group
                size="small"
                disabled={
                  !isEmpty(watchObj?.avatar?.fileList) ||
                  hasAccessPermissions(userPermissions, [
                    "CAN CREATE BENEFICIARIES",
                  ])
                }
              >
                <Radio.Button value="Upload">Upload</Radio.Button>
                <Radio.Button value="Camera">Camera</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={7} />

          <Col md={1} />
          <Col md={2}>
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please Attach Avatar",
                },
                {
                  validator: (_, value) => {
                    if (value && isEmpty(value.fileList))
                      return Promise.reject(new Error("Please Attach Avatar"));
                    return Promise.resolve();
                  },
                },
              ]}
            >
              {watchObj?.avaType === "Upload" && (
                <Upload
                  action={process.env.REACT_APP_API_ROOT_URL}
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length < 1 && "Upload"}
                </Upload>
              )}
              {watchObj?.avaType !== "Upload" && (
                <Avatar
                  style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    backgroundColor: "#00000005",
                    border: "1px dashed #d9d9d9",
                    color: "#000000e0",
                    fontSize: "14px",
                  }}
                  size={102}
                  onClick={() => {
                    dispatch(settingActions.showModal(true));
                  }}
                >
                  Camera
                </Avatar>
              )}
            </Form.Item>
          </Col>
          <Col md={3} className="mt-3 pt-3">
            <Form.Item
              name="surname"
              label="Surname"
              rules={[
                {
                  required: true,
                  message: "Please input your Surname",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={5} className="mt-3 pt-3">
            <Form.Item
              name="other_names"
              label="Other Names"
              rules={[
                {
                  required: true,
                  message: "Please input Other Names",
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
              name="phone"
              label="Beneficiary Contact"
              rules={[
                {
                  required: true,
                  message: "Please input Beneficiary Contact",
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
          <Col md={5}>
            <Form.Item
              name="gender_id"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
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
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="helped_by"
              label="Helped By?"
              rules={[
                {
                  required: true,
                  message: "Enter The Person Who Helped You Join Sponsorship",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={5}>
            <Form.Item
              name="reason"
              label="Reason for Joining"
              rules={[
                {
                  required: true,
                  message: "Please Enter a Reason",
                },
              ]}
            >
              <TextArea placeholder="Multiple Content Lines" autoSize />
            </Form.Item>
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={[
                {
                  required: true,
                  message: "Nationality is required",
                },
              ]}
            >
              <Select
                placeholder="Select option"
                allowClear
                showSearch
                options={countryList.map((country) => {
                  return {
                    label: toUpper(country.nationality),
                    value: toUpper(country.nationality),
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col md={5}>
            {watchObj?.nationality === "UGANDAN" && (
              <Form.Item
                name="district_of_birth"
                label="Place of Birth"
                rules={[
                  {
                    required: true,
                    message: "Please input Place of Birth",
                  },
                ]}
              >
                <Select
                  placeholder="Select option"
                  allowClear
                  showSearch
                  options={districts.map((item) => {
                    return { label: toUpper(item), value: toUpper(item) };
                  })}
                />
              </Form.Item>
            )}
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            {watchObj?.nationality === "UGANDAN" && (
              <Form.Item name="national_id" label="ID Number" rules={[]}>
                <Input />
              </Form.Item>
            )}
          </Col>
          <Col md={5}>
            {watchObj?.nationality === "UGANDAN" && (
              <Form.Item
                name="home_district"
                label="Home District"
                rules={[
                  {
                    required: true,
                    message: "Please input Home District",
                  },
                ]}
              >
                <Select
                  placeholder="Select option"
                  allowClear
                  showSearch
                  options={districts.map((item) => {
                    return { label: toUpper(item), value: toUpper(item) };
                  })}
                />
              </Form.Item>
            )}
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            <Form.Item
              name="date_of_birth"
              label="Date Of Birth"
              rules={[
                {
                  required: true,
                  message: "Date of Birth is required",
                },
                {
                  validator: (_, value) => {
                    const today = moment().startOf("day");
                    if (value?.isSame(today) || value?.isAfter(today)) {
                      return Promise.reject(
                        new Error("Please Select a Past Date")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={5}>
            {watchObj?.nationality === "UGANDAN" && (
              <Form.Item
                name="permanent_address"
                label="Place of Residence"
                rules={[
                  {
                    required: true,
                    message: "Please input Place of Residence",
                  },
                ]}
              >
                <Select
                  placeholder="Select option"
                  allowClear
                  showSearch
                  options={districts.map((item) => {
                    return { label: toUpper(item), value: toUpper(item) };
                  })}
                />
              </Form.Item>
            )}
          </Col>
          <Col md={1} />

          <Col md={1} />
          <Col md={5}>
            {[{ ...calendarForm, name: "date_of_birth" }].map((field) => (
              <AntDInputText
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                itemAttributes={field.itemAttributes}
                type={field?.type}
                inputAttributes={field.inputAttributes}
              />
            ))}
          </Col>
          <Col md={1} />

          <Divider className="text-info text-uppercase fw-bold">
            Guardian Details
          </Divider>
          <Col md={1} />
          <Col md={10}>
            <Card className="px-3 py-2">
              <Row>
                <Col md={6}>
                  <Form.Item
                    name="father_surname"
                    label="Father's Surname"
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
                <Col md={6}>
                  <Form.Item
                    name="mother_surname"
                    label="Mother's Surname"
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
                <Col md={6}>
                  <Form.Item
                    name="father_other_names"
                    label="Father's Other Names"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Other Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="mother_other_names"
                    label="Mother's Other Names"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Other Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="father_dead_or_alive"
                    label="Dead / Alive (F)"
                    rules={[
                      {
                        required: true,
                        message: "Please Select",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={deadOrAlive.map((item) => {
                        return {
                          label: toUpper(item),
                          value: toUpper(item),
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="mother_dead_or_alive"
                    label="Dead / Alive (M)"
                    rules={[
                      {
                        required: true,
                        message: "Please Select",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={deadOrAlive.map((item) => {
                        return {
                          label: toUpper(item),
                          value: toUpper(item),
                        };
                      })}
                    />
                  </Form.Item>
                </Col>

                <Col md={6}>
                  {watchObj?.father_dead_or_alive === "DECEASED" && (
                    <Form.Item
                      name="father_death_period"
                      label="If dead, Period! (F)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Number of Years",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="No. of Years" />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.mother_dead_or_alive === "DECEASED" && (
                    <Form.Item
                      name="mother_death_period"
                      label="If dead, Period! (M)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Number of Years",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="No. of Years" />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.father_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="father_occupation"
                      label="Occupation (F)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Occupation",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.mother_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="mother_occupation"
                      label="Occupation (M)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Occupation",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.father_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="father_place_of_work"
                      label="Place of Work (F)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Place of Work",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.mother_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="mother_place_of_work"
                      label="Place of Work (M)"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Place of Work",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.father_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="father_telephone_number"
                      label="Father's Contact"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Phone Number",
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
                        addonBefore={prefixSelector("f_")}
                        style={{
                          width: "100%",
                        }}
                        type="number"
                      />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {watchObj?.mother_dead_or_alive === "ALIVE" && (
                    <Form.Item
                      name="mother_telephone_number"
                      label="Mother's Contact"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Phone Number",
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
                        addonBefore={prefixSelector("m_")}
                        style={{
                          width: "100%",
                        }}
                        type="number"
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={1} />

          <Divider className="text-info text-uppercase fw-bold">
            Institution Details
          </Divider>
          <Col md={1} />
          <Col md={10}>
            <Card className="px-3 py-2">
              <Row>
                <Col md={6}>
                  <Form.Item
                    name="institution_type_id"
                    label="Institution Type"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Institution Type",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={institutionTypeOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="institution_id"
                    label="Institution"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Institution",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={stateInstitutionOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="academic_year_id"
                    label="Academic Year"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Academic Year",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={academicYearOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="class_or_year_id"
                    label="Class / Year"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Class",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={studyClassOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="directive_by_id"
                    label="Directive From"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Directive From",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select option"
                      allowClear
                      showSearch
                      options={directiveOptions}
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    label="Directive Attachment"
                    name="directive_attachment"
                    rules={[
                      {
                        required: true,
                        message: "Please Attach Directive",
                      },
                      {
                        validator: (_, value) => {
                          if (value && isEmpty(value.fileList))
                            return Promise.reject(
                              new Error("Please Attach Avatar")
                            );
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Upload
                      action={process.env.REACT_APP_API_ROOT_URL}
                      listType="picture-card"
                      fileList={directiveList}
                      onChange={onChangeDirective}
                      onPreview={onPreviewDirective}
                      beforeUpload={beforeUploadDirective}
                    >
                      {directiveList.length < 1 && "Upload"}
                    </Upload>
                  </Form.Item>
                </Col>
                <Col md={6}>
                  {hasInstPro() && (
                    <Form.Item
                      name="programme_of_study"
                      label="Programme of Study"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Programme of Study",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  {hasInstPro() && (
                    <Form.Item
                      name="programme_type_id"
                      label="Programme Type"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Type",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select option"
                        allowClear
                        showSearch
                        options={programmeType}
                      />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="sponsorship_period"
                    label="Sponsorship Period"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Number of Years",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="No. of Years" />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  {hasInstPro() && (
                    <Form.Item
                      name="institution_student_number"
                      label="Institution Student Number"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Institution Student Number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="institution_start_date"
                    label="Institution Join Date"
                    rules={[
                      {
                        required: true,
                        message: "Institution Join Date is required",
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <Form.Item
                    name="sponsorship_start_date"
                    label="Sponsorship Start Date"
                    rules={[
                      {
                        required: true,
                        message: "Sponsorship Start Date is required",
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  {[{ ...calendarForm, name: "institution_start_date" }].map(
                    (field) => (
                      <AntDInputText
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                        itemAttributes={field.itemAttributes}
                        type={field?.type}
                        inputAttributes={field.inputAttributes}
                      />
                    )
                  )}
                </Col>
                <Col md={6}>
                  {[{ ...calendarForm, name: "sponsorship_start_date" }].map(
                    (field) => (
                      <AntDInputText
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                        itemAttributes={field.itemAttributes}
                        type={field?.type}
                        inputAttributes={field.inputAttributes}
                      />
                    )
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={1} />

          <Col md={9} />
          <Col md={2}>
            <SubmitButton
              block
              className="mb-3"
              loading={creatingNonAcmisBeneficiary}
              text="Submit Form"
            />
          </Col>
          <Col md={1} />
        </Row>
      </Form>
      {showModal && <SimpleCamera />}
      {/* )} */}
      {/* {showPayForm && (
        <DetailsModal
          showModal={showPayForm}
          data={selectedData}
          closeModal={() => setShowModal(false)}
        />
      )}
      {showAllocateView && (
        <AllocateView
          data={selectedData}
          closeModal={() => setShowAllocateView(false)}
        />
      )} */}
    </>
  );
}

export default NonAcmisBeneficiaries;
