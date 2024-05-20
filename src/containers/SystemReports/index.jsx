import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TabMenu from "../../components/common/TabMenu";
import { settingActions } from "../../config/actions";
import AllocatedFundsReport from "./AllocatedFundsReport";

function SystemReports() {
  const dispatch = useDispatch();
  const { reportsTabView } = useSelector((state) => state.setting);

  const setCurrentTab = (tabView) =>
    dispatch(settingActions.setReportsTabView(tabView));

  return (
    <Card>
      <TabMenu
        currentMenu={reportsTabView}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "FUNDS ALLOCATED REPORTS",
            action: "allocated-funds",
          },
          // {
          //   title: "FUNDS SPENT REPORTS",
          //   action: "spent-funds",
          // },
        ]}
      />
      {reportsTabView === "allocated-funds" && <AllocatedFundsReport />}
    </Card>
  );
}

export default SystemReports;
