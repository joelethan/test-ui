import React from "react";
import PropTypes, { any } from "prop-types";
import { FaReplyAll } from "react-icons/fa";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import ErrorImage from "../../assets/img/undraw_warning_cyit.svg";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Container fluid className="bg-light min-vh-100 d-flex">
          <Row className="w-100 my-auto g-0">
            <Col md={{ span: 6, offset: 3 }}>
              <Card body className="my-4 rounded py-3 bg-white border">
                <div className="text-center text-muted font600 text-uppercase">
                  <Image
                    src={ErrorImage}
                    alt="Error Image"
                    className="mx-auto mb-4"
                    width="240px"
                  />
                  <h6 className="mb-4 font600 text-muted">
                    Oops.... Something Went Wrong.
                  </h6>
                  <div className="text-sm text-danger">
                    This is not your Problem.... The Support Team has been
                    Notified.
                  </div>

                  <Button
                    onClick={() => window.location.reload()}
                    variant="danger"
                    className="font600 text-sm mt-3"
                  >
                    <FaReplyAll className="text-sm me-2" />
                    LET&apos;S TRY AGAIN
                  </Button>
                </div>

                {/* <code>{error && error.toString()}</code> */}
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([any]).isRequired,
};

export default ErrorBoundary;
