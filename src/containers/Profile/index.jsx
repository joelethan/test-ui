import { Form } from "antd";
import moment from "moment";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AntDInputText, ReloadButton } from "../../components/common";
import { authActions } from "../../config/actions";
import { applicantProfileForm } from "../../Forms/beneficiary";
import ChangeOldPassword from "./ChangePassword/ChangeOldPassword";

function Profile() {
  const dispatch = useDispatch();
  const { authUser, gettingAuthUser } = useSelector((state) => state.auth);

  return (
    <Card key={authUser?.id}>
      <Card.Header className="bg-white text-sm text-primary fw-bold py-2">
        <FaUserGraduate className="me-1" /> MY PROFILE DETAILS
        <div className="card-options">
          <ReloadButton
            size="sm"
            loading={gettingAuthUser}
            onClick={() => dispatch(authActions.getAuthUser())}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Card.Title className="text-center">PROFILE INFORMATION</Card.Title>
            <Form
              disabled
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                surname: authUser.surname,
                other_names: authUser.other_names,
                last_login: moment(authUser.last_login).toString(),
                gender: authUser.gender,
                email: authUser.email,
                phone: authUser.phone,
              }}
            >
              {applicantProfileForm.map((field) => (
                <AntDInputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  itemAttributes={field.itemAttributes}
                  type={field?.type}
                  options={field?.options}
                  inputAttributes={field.inputAttributes}
                />
              ))}
            </Form>
          </Col>
          <Col md={6}>
            <ChangeOldPassword />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Profile;
