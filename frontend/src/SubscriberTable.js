import { Container, Col, Row } from "react-bootstrap";

function SubscriberTable({ subData }) {
  return (
    <Container className="SubDataContainer">
      <Row>
        <h3>Result</h3>
      </Row>
      <Row className="SubDataBlueRow">
        <Col xs={4}>
          <p>Phone Number</p>
        </Col>
        <Col>
          <p>{subData.phone_num}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <p>User Name</p>
        </Col>
        <Col>
          <p>{subData.username}</p>
        </Col>
      </Row>
      <Row className="SubDataBlueRow">
        <Col xs={4}>
          <p>Password</p>
        </Col>
        <Col>
          <p>{subData.password}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <p>Domain</p>
        </Col>
        <Col>
          <p>{subData.domain}</p>
        </Col>
      </Row>
      <Row className="SubDataBlueRow">
        <Col xs={4}>
          <p>Status</p>
        </Col>
        <Col>
          <p>{subData.status}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <p>Features</p>
        </Col>
        <Col>
          <p>{subData.features}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default SubscriberTable;
