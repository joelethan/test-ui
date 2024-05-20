import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TabMenu from "../../components/common/TabMenu";
import { settingActions } from "../../config/actions";
import AcmisBeneficiaries from "./AcmisBeneficiaries";
import NonAcmisBeneficiaries from "./NonAcmisBeneficiaries";
import BeneficiaryApprovals from "./BeneficiaryApprovals";
import UploadBeneficiaries from "./UploadBeneficiaries";
import SearchNonAcmisBeneficiaries from "./SearchNonAcmisBeneficiaries";
import InstitutionBeneficiaries from "./InstitutionBeneficiaries";
import TestUploads from "./test/TestUploads";
import { hasAccessPermissions } from "../../components/shared/helperFunctions";

function StateBeneficiaries() {
  const dispatch = useDispatch();
  const { acmisBeneficiaryTabView } = useSelector((state) => state.setting);
  const {
    authUser: { permissions: userPermissions },
  } = useSelector((state) => state.auth);

  const setCurrentTab = (tabView) =>
    dispatch(settingActions.setAcmisBeneficiaryTabView(tabView));

  return (
    <Card>
      <TabMenu
        currentMenu={acmisBeneficiaryTabView}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "MIGRATE ACMIS BENEFICIARIES",
            action: "migrate-acmis",
            hidden: true,
          },
          {
            title: "ACMIS BENEFICIARIES",
            action: "acmis",
            hidden: true,
          },
          {
            title: "TEST UPLOADS",
            action: "test-upload",
            hidden: true,
          },
          {
            title: "ADD A BENEFICIARY",
            action: "add-beneficiary",
            hidden: hasAccessPermissions(userPermissions, [
              "CAN CREATE BENEFICIARIES",
            ]),
          },
          {
            title: "INSTITUTION BENEFICIARIES",
            action: "institution-beneficiaries",
          },
          {
            title: "BENEFICIARY SEARCH",
            action: "non-acmis-search",
          },
          {
            title: "NON-ACMIS BENEFICIARIES",
            action: "upload-non-acmis",
            hidden: true,
          },
          {
            title: "BENEFICIARY UPLOADS",
            action: "non-acmis-uploads",
            hidden: true,
          },
          {
            title: "BENEFICIARY RESULTS",
            action: "results-uploads",
            hidden: true,
          },
          // {
          //   title: "PENDING APPROVALS",
          //   action: "pending-approvals",
          // },
        ]}
      />
      {acmisBeneficiaryTabView === "test-upload" && <TestUploads />}
      {acmisBeneficiaryTabView === "acmis" && <AcmisBeneficiaries />}
      {acmisBeneficiaryTabView === "add-beneficiary" && (
        <NonAcmisBeneficiaries />
      )}
      {acmisBeneficiaryTabView === "non-acmis-search" && (
        <SearchNonAcmisBeneficiaries />
      )}
      {acmisBeneficiaryTabView === "institution-beneficiaries" && (
        <InstitutionBeneficiaries />
      )}
      {acmisBeneficiaryTabView === "non-acmis-uploads" && (
        <UploadBeneficiaries />
      )}
      {acmisBeneficiaryTabView === "results-uploads" && (
        <UploadBeneficiaries results />
      )}
      {acmisBeneficiaryTabView === "pending-approvals" && (
        <BeneficiaryApprovals />
      )}
    </Card>
  );
}

export default StateBeneficiaries;
