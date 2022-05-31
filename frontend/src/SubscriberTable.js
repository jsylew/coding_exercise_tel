import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function SubscriberTable({ subData }) {
  const [noEdit, setNoEdit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneNum, setPhoneNum] = useState(subData.phone_num);
  const [username, setUsername] = useState(subData.username);
  const [password, setPassword] = useState(subData.password);
  const [domain, setDomain] = useState(subData.domain);
  const [status, setStatus] = useState(subData.status);
  const [features, setFeatures] = useState(subData.features);

  const resetValues = () => {
    setNoEdit(true);
    setPhoneNum(subData.phone_num);
    setUsername(subData.username);
    setPassword(subData.password);
    setDomain(subData.domain);
    setStatus(subData.status);
    setFeatures(subData.features);
  };

  const handleFormChanges = (func, value) => func(value);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/ims/subscriber/${subData.phone_num}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNum,
            username: username,
            password: password,
            domain: domain,
            status: status,
            features: features,
          }),
        }
      );

      let resultJson = await res.json();
      if (res.status === 200) {
        setNoEdit(true);
        setMessage("Subscriber information updated.");
      } else {
        setMessage("Update failed.");
      }
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  return (
    <Container className="SubDataContainer">
      <Form>
        <Form.Group className="mb-3">
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Phone Number</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="tel"
                pattern="[0-9]{11}"
                value={phoneNum}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setPassword, e.target.value)}
              />
            </Col>
          </Row>
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Username</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                value={username}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setUsername, e.target.value)}
              />
            </Col>
          </Row>
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Password</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setPassword, e.target.value)}
              />
              <Form.Check
                type={"checkbox"}
                id={"showPassword"}
                label={"Show Password"}
                onChange={handleShowPassword}
              />
            </Col>
          </Row>
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Domain</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                value={domain}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setDomain, e.target.value)}
              />
            </Col>
          </Row>
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Status</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                value={status}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setStatus, e.target.value)}
              />
            </Col>
          </Row>
          <Row className="FormRow">
            <Col xs={4}>
              <Form.Label className="FormLabelHorz">Features</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                as="textarea"
                rows={5}
                value={features}
                readOnly={noEdit}
                disabled={noEdit}
                onChange={(e) => handleFormChanges(setFeatures, e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        {noEdit ? (
          <Row>
            <Col className="Message">
              <p>
                <em>{message}</em>
              </p>
            </Col>
            <Col className="ContainerAlignRight">
              <Button
                className="ButtonMargin"
                variant="primary"
                onClick={() => {
                  setNoEdit(false);
                }}
              >
                Edit
              </Button>
              <Button className="ButtonMargin" variant="danger">
                Delete
              </Button>
            </Col>
          </Row>
        ) : (
          <div className="ContainerAlignRight">
            <Button
              className="ButtonMargin"
              variant="secondary"
              onClick={resetValues}
            >
              Cancel
            </Button>
            <Button
              className="ButtonMargin"
              variant="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </Form>
    </Container>
  );
}

export default SubscriberTable;
