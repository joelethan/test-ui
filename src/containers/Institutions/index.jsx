import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TabMenu from "../../components/common/TabMenu";
import { settingActions } from "../../config/actions";
import CreateInstitution from "./CreateInstitution";
import UploadInstitutions from "./UploadInstitutions";
import ViewInstitutions from "./ViewInstitutions";

function Institutions() {
  const dispatch = useDispatch();
  const { institutionsTabView } = useSelector((state) => state.setting);

  const setCurrentTab = (tabView) =>
    dispatch(settingActions.setInstitutionsTabView(tabView));

  return (
    <Card>
      <TabMenu
        currentMenu={institutionsTabView}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "VIEW INSTITUTIONS",
            action: "view-institutions",
          },
          {
            title: "CREATE INSTITUTION",
            action: "create-institution",
          },
          {
            title: "UPLOAD INSTITUTION",
            action: "upload-institution",
          },
        ]}
      />
      {["create-institution", "update-institution"].includes(institutionsTabView) && <CreateInstitution />}
      {institutionsTabView === "view-institutions" && <ViewInstitutions />}
      {institutionsTabView === "upload-institution" && <UploadInstitutions />}
    </Card>
  );
}

export default Institutions;
