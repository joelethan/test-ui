import React, { useState } from "react";
import { Card } from "react-bootstrap";
import TabMenu from "../../components/common/TabMenu";
import MetaDataView from "./MetaData/MetaDataView";
import SupportItemsView from "./SupportItems/SupportItemsView";

function SystemSettings() {
  const [currentTab, setCurrentTab] = useState("metadata");

  return (
    <Card>
      <TabMenu
        currentMenu={currentTab}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "SYSTEM METADATA",
            action: "metadata",
          },
          {
            title: "ALLOCATIONS OPTIONS",
            action: "payment-options",
          },
        ]}
      />
      {currentTab === "metadata" && <MetaDataView />}
      {currentTab === "payment-options" && <SupportItemsView />}
    </Card>
  );
}

export default SystemSettings;
