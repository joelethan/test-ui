/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Image, Upload } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import { Col, Row } from "react-bootstrap";
import { SubmitButton } from "../../../components/common";
import { beneficiaryActions } from "../../../config/actions";
import { formatSHNumber } from "../../../helpers/dataFormatter";
import TestingCustom from "./TestingCustom";
import EditableCellApp from "./EditableCell";
import EditableRowApp from "./EditableRow";
// import { Camera, CameraResultType } from '@capacitor/camera';
// import PdfComp from "../PdfComp";

function TestUploads() {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [fileListDir, setFileListDir] = useState([]);

  const { updatingBeneficiaryAttachments } = useSelector(
    (state) => state.beneficiary
  );

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
    console.log("image ** !", image);
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChangeDir = ({ fileList: newFileList }) => {
    setFileListDir(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const onFinish = (values) => {
    const data = new FormData();
    data.append("avatar", values.avatar.file.originFileObj);
    data.append("directive", values.directive.file.originFileObj);
    const SHNo = formatSHNumber(300);

    dispatch(beneficiaryActions.updateBeneficiaryAttachments(data, SHNo));
  };
  const [imgUrl, setImgUrl] = useState(null);

  const uploadRef = useRef(null);

  // Custom function to handle file upload
  const handleFileUpload = (file) => {
    // Perform file upload logic here if needed
    console.log("File uploaded:", file);
  };

  // Custom function to handle before upload
  const handleBeforeUpload = (file) => {
    // You can perform any checks or validations here
    console.log("Before upload:", file);
    return false; // Return false to prevent default behavior
  };

  // Custom function to handle upload request
  const handleCustomRequest = ({ file, onSuccess, onError }) => {
    // Perform your custom upload logic here
    console.log("Custom upload request:", file);

    // Example: Simulating a successful upload after 2 seconds
    setTimeout(() => {
      onSuccess(null, file);
    }, 2000);
  };

  // Function to trigger file selection dialog
  const openFileDialog = () => {
    uploadRef?.current?.click();
    // console.log('Upload uploadRef', uploadRef.current);
  };

  return (
    <Form onFinish={onFinish}>
      <Row>
        {/* <Col>
          <EditableCellApp />
        </Col>
        <Col> */}
        <EditableRowApp />
        {/* </Col> */}
      </Row>

      {false && (
        <>
          <Webcam
            width={250}
            height={250}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          >
            {({ getScreenshot }) => (
              <SubmitButton
                text="Capture"
                onClick={() => {
                  setImgUrl(getScreenshot());
                }}
              />
            )}
          </Webcam>
          {imgUrl ? <img src={imgUrl} alt="webcam" /> : null}
          {/* <button onClick={capture}>Capture photo</button> */}

          <Form.Item name="avatar" label="Upload Ava">
            <Upload
              action={process.env.REACT_APP_API_ROOT_URL}
              listType="picture-circle"
              fileList={fileList}
              // onChange={onChange}
              // onPreview={onPreview}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="directive" label="Upload Dir">
            <Upload
              action={process.env.REACT_APP_API_ROOT_URL}
              listType="picture-card"
              fileList={fileListDir}
              onChange={onChangeDir}
              onPreview={onPreview}
            >
              {fileListDir.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <SubmitButton loading={updatingBeneficiaryAttachments} />
        </>
      )}
      {/* <PdfComp /> */}
      <div className="p-3">
        <input
          type="file"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        <SubmitButton onClick={openFileDialog} text="Custom Upload" />
        <Upload
          className="p-3"
          ref={uploadRef}
          listType="picture-card"
          beforeUpload={handleBeforeUpload}
          customRequest={handleCustomRequest}
          // showUploadList={false} // Optionally, hide the upload list
        >
          {/* Hidden input for file selection */}
          <input type="file" style={{ display: "none" }} />
          Upload
        </Upload>
        <TestingCustom />
        <Upload
          action={process.env.REACT_APP_API_ROOT_URL}
          listType="picture-circle"
          fileList={fileList}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Upload
          action={process.env.REACT_APP_API_ROOT_URL}
          listType="picture-circle"
          fileList={fileList}
        >
          Upload
        </Upload>
      </div>
    </Form>
  );
}

export default TestUploads;
