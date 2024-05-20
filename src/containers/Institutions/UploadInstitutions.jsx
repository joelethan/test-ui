import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUploaderContainer from "../../components/common/FileUploaderContainer";
import HasAccess from "../../components/common/HasAccess";
import { institutionActions } from "../../config/actions";

function UploadInstitutions() {
  const dispatch = useDispatch();
  const { downloadingInstitutionsTemplate } = useSelector(
    (state) => state.institution
  );

  const downloadTemplate = (e) => {
    e.preventDefault();
    dispatch(institutionActions.downloadInstitutionsTemplate());
  };
  const uploadTemplate = (formData, roleId) => {
    dispatch(institutionActions.uploadInstitutionsTemplate(formData, roleId));
    // to do
    // create an object for non-acmis institutions and filter once the institution changes
    // Ifrah confirm if you are Jama or Jabeen,
    // Who is Debbie Akinbami, Lish Lawrence,
    // Lucy Copson, Stuck with Vitoria, Huang Xinyu, FG
    // FG => Fatehea Mohamed
  };

  return (
    <HasAccess allowedPermissions={["CAN CREATE INSTITUTIONS"]}>
      <FileUploaderContainer
        uploadText="Support for a single file upload. Strictly for upload of Non-ACMIS Institutions"
        downloadTemplate={downloadTemplate}
        uploadTemplate={uploadTemplate}
        loading={downloadingInstitutionsTemplate}
      />
    </HasAccess>
  );
}

export default UploadInstitutions;
