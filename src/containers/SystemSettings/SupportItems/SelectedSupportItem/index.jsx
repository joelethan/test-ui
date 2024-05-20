import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaAngleDoubleLeft, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ReloadButton } from "../../../../components/common";
import TabMenu from "../../../../components/common/TabMenu";
import {
  institutionActions,
  metadataActions,
} from "../../../../config/actions";
import SupportOptions from "./SupportOptions";

function SelectedSupportItem() {
  const dispatch = useDispatch();
  const { metadataValueView: itemsView } = useSelector(
    (state) => state.metadata
  );
  const {
    supportInstitution,
    gettingSupportItems,
    gettingPaymentCycles,
    gettingStudyClasses
  } = useSelector(
    (state) => state.institution
  );
  const [currentTab, setCurrentTab] = useState("support");

  const onChangeState = (value) =>
    dispatch(metadataActions.setMetadataValueView(value));

  const getSupportItems = () => {
    dispatch(institutionActions.getSupportItems());
    dispatch(institutionActions.getPaymentCycles());
    dispatch(institutionActions.getStudyClasses());
  };

  return (
    <Card>
      <TabMenu
        currentMenu={currentTab}
        setCurrentMenu={setCurrentTab}
        menus={[
          {
            title: "SUPPORT ITEMS",
            action: "support",
          },
          {
            title: "PAYMENT CYCLES",
            action: "payment-cycles",
          },
          {
            title: "STUDY CLASSES",
            action: "study-classes",
          },
        ]}
      >
        <div className="card-options">
          <ReloadButton
            onClick={getSupportItems}
            loading={gettingSupportItems || gettingStudyClasses || gettingPaymentCycles}
          />
          <Button
            size="sm"
            variant={itemsView === "add-value" ? "warning" : "primary"}
            className="font500 text-uppercase text-sm ms-2"
            type="button"
            onClick={() =>
              onChangeState(
                itemsView === "add-value" ? "view-values" : "add-value"
              )
            }
            disabled={isEmpty(supportInstitution)}
          >
            {itemsView === "add-value" ? (
              <FaAngleDoubleLeft className="me-1" />
            ) : (
              <FaPlusCircle className="me-1" />
            )}
            {itemsView === "view-values" ? "Add Item" : "View Items"}
          </Button>
        </div>
      </TabMenu>
      <SupportOptions currentTab={currentTab} />
    </Card>
  );
}

export default SelectedSupportItem;
