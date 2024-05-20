import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, message } from "antd";
import { isEmpty, toUpper } from "lodash";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthLayout, MainLayout } from "../../components/shared";
import {
  authActions,
  institutionActions,
  metadataActions,
} from "../../config/actions";
import usePrevious from "../Hooks/usePrevious";
import Institutions from "../Institutions";
import ComingSoon from "../Pages/ComingSoon";
import Profile from "../Profile";
import ChangeDefaultPassword from "../Profile/ChangePassword/ChangeDefaultPassword";
import ReportDashboard from "../ReportDashboard";
import StateBeneficiaries from "../StateBeneficiaries";
import SystemApprovals from "../SystemApprovals";
import SystemSettings from "../SystemSettings";
import UsersView from "../UsersView";
import AuthUserLoader from "./AuthUserLoader";
import SystemReports from "../SystemReports";
import InstitutionBeneficiaries from "../StateBeneficiaries/InstitutionBeneficiaries";

function Dashboard() {
  const dispatch = useDispatch();
  const { selectedMenu } = useSelector((state) => state.setting);
  const {
    authUser,
    isAuthenticated,
    userRoles,
    currentRole,
  } = useSelector((state) => state.auth);
  const [cookies] = useCookies();
  const accessToken = cookies.auth_access?.token;
  const { success: serverSuccess, serverError } = useSelector(
    (state) => state.server
  );
  const { metadata } = useSelector((state) => state.metadata);
  const { stateInstitutions } = useSelector((state) => state.institution);
  const prevState = usePrevious({ serverSuccess, serverError });

  useEffect(() => {
    if (!isEmpty(accessToken)) dispatch(authActions.setIsAuthenticated(true));
  }, []);
  
  useEffect(() => {
    if (!isEmpty(prevState)) {
      message.config({
        duration: 5,
      });

      if (!isEmpty(serverError) && prevState.serverError !== serverError) {
        message.error(
          serverError?.error?.message ||
            serverError?.error ||
            serverError?.server?.message
        );
      }
      if (
        !isEmpty(serverSuccess) &&
        prevState.serverSuccess !== serverSuccess
      ) {
        message.success(serverSuccess?.server?.message);
      }
    }
  }, [serverError, serverSuccess]);

  const getInstitutions = () =>
    dispatch(institutionActions.fetchInstitutions());

  useEffect(() => {
    if (isEmpty(stateInstitutions)) getInstitutions();
    if (isEmpty(metadata)) dispatch(metadataActions.getMetadata());
  }, []);

  const renderSwitchStatement = () => {
    switch (selectedMenu) {
      case "my-profile":
        return <Profile />;

      case "change-default-password":
        return <ChangeDefaultPassword />;

      case "dashboard":
        return <ReportDashboard />;

      case "state-users":
        return <UsersView />;

      case "my-settings":
        return <SystemSettings />;

      case "initial-approvals":
        return <SystemApprovals />;

      case "final-approvals":
        return <SystemApprovals />;

      case "system-reports":
        return <SystemReports />;

        case "payments":
          return <InstitutionBeneficiaries />;

      case "beneficiaries":
        return <StateBeneficiaries />;

      case "institutions":
        return <Institutions />;

      default:
        return <ComingSoon />;
    }
  };
  useEffect(() => {
    if (userRoles.length === 1) {
      dispatch(authActions.setCurrentRole(userRoles[0]));
    }
  }, [userRoles]);

  const onSelectRole = (option) => {
    const { key } = option;
    const findRole = userRoles.find(
      (role) => parseInt(role.id, 10) === parseInt(key, 10)
    );
    dispatch(authActions.setCurrentRole(findRole));

    toast.info(
      toUpper(
        `Your active Role has been set to ${findRole.role.metadata_value}`
      )
    );
  };

  // eslint-disable-next-line no-unused-vars
  const rolesMenu = (
    <Menu onClick={onSelectRole}>
      {userRoles.map((role) => {
        return (
          <Menu.Item
            key={role.id}
            icon={
              currentRole.id === role.id ? (
                <CheckCircleOutlined />
              ) : (
                <UserOutlined />
              )
            }
            className={`text-sm m-1 rounded fw-bold ${
              currentRole.id === role.id ? "bg-primary text-white" : ""
            }`}
          >
            {toUpper(role.role.metadata_value)}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      {isAuthenticated === true ? (
        <>
          {isEmpty(authUser) ? (
            <AuthUserLoader />
          ) : (
            <MainLayout>
              <div className="pt-2">{renderSwitchStatement()}</div>
            </MainLayout>
          )}
        </>
      ) : (
        <AuthLayout />
      )}
    </>
  );
}

export default Dashboard;
