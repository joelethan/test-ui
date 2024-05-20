import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TabMenu from "../../components/common/TabMenu";
import { settingActions } from "../../config/actions";
import AllocationsApprovals from "../StateBeneficiaries/AllocationsApprovals";
import BeneficiaryApprovals from "../StateBeneficiaries/BeneficiaryApprovals";
import PaymentsApprovals from "../StateBeneficiaries/PaymentsApprovals";

function SystemApprovals() {
  const dispatch = useDispatch();
  const { approvalsTabView, selectedMenu } = useSelector(
    (state) => state.setting
  );

  const setCurrentTab = (tabView) =>
    dispatch(settingActions.setApprovalsTabView(tabView));

  return (
    <Card>
      <TabMenu
        currentMenu={approvalsTabView}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "BENEFICIARY APPROVALS",
            action: "beneficiary-approvals",
          },
          {
            title: "ALLOCATIONS APPROVALS",
            action: "allocations-approvals",
            hidden: selectedMenu.includes("final"),
          },
          {
            title: "PAYMENTS APPROVALS",
            action: "payments-approvals",
            hidden: selectedMenu.includes("final"),
          },
        ]}
      />
      {approvalsTabView === "beneficiary-approvals" && <BeneficiaryApprovals />}
      {approvalsTabView === "allocations-approvals" &&
        selectedMenu.includes("initial") && <AllocationsApprovals />}
      {approvalsTabView === "payments-approvals" &&
        selectedMenu.includes("initial") && <PaymentsApprovals />}
    </Card>
  );
}

SystemApprovals.defaultProps = {};

SystemApprovals.propTypes = {};

export default SystemApprovals;
