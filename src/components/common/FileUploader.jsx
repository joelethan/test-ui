import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import PropTypes, { array } from "prop-types";
import React from "react";
import { Col, Form } from "react-bootstrap";
import { FaFileCsv } from "react-icons/fa";
import { useSelector } from "react-redux";
import SubmitButton from "./SubmitButton";

function FileUploader({
  disabled,
  loading,
  uploadText,
  downloadTemplate,
  uploadTemplate,
  downloadText,
}) {
  const { Dragger } = Upload;
  const { currentRole } = useSelector((state) => state.auth);

  const props = {
    name: "file",
    multiple: false,
    customRequest: ({ file }) => {
      const formData = new FormData();
      formData.append("file", file);
      uploadTemplate(formData, currentRole.id);
    },
    disabled,
  };

  return (
    <>
      <Col />
      <Col md={11}>
        <Form>
          <Dragger {...props} className="mt-3">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or Drag file to this area to upload
            </p>
            <p className="ant-upload-hint">{uploadText}</p>
          </Dragger>
          <SubmitButton
            onClick={downloadTemplate}
            loading={loading}
            variant="link"
            className="mt-3 mb-2 d-flex mx-auto font500 text-uppercase"
            iconBefore={<FaFileCsv className="me-1 mt-2" />}
            text={downloadText}
            loadingText="Downloading..."
          />
        </Form>
      </Col>
      <Col />
    </>
  );
}

FileUploader.defaultProps = {
  loading: false,
  disabled: false,
  fields: [],
  uploadText: "",
  downloadText: "Download Template",
  downloadTemplate: () => {},
  uploadTemplate: () => {},
};

FileUploader.propTypes = {
  fields: PropTypes.oneOfType([array]),
  uploadText: PropTypes.string,
  downloadText: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  downloadTemplate: PropTypes.func,
  uploadTemplate: PropTypes.func,
};

export default FileUploader;
