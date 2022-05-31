import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function SubscriberForm({ subData, newForm, setShowForm }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [phoneNum, setPhoneNum] = useState(subData.phone_num);
  const [username, setUsername] = useState(subData.username);
  const [password, setPassword] = useState(subData.password);
  const [domain, setDomain] = useState(subData.domain);
  const [status, setStatus] = useState(subData.status);
  const [features, setFeatures] = useState(subData.features);
  const [showNewForm, setShowNewForm] = useState(newForm);

  const resetValues = () => {
    setShowEdit(false);
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
        setShowEdit(false);
        setUpdateSuccess(true);
        setMessage("Subscriber information updated.");
      } else {
        setUpdateSuccess(false);
        setMessage(`Update failed. ${resultJson.message}`);
      }
    } catch (err) {
      setUpdateSuccess(false);
      setMessage(`Update failed.`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/ims/subscriber/${subData.phone_num}`,
        {
          method: "DELETE",
        }
      );

      let resultJson = await res.json();
      if (res.status === 200) {
        setConfirmDelete(false);
        setUpdateSuccess(true);
        setDeleteSuccess(true);
        setMessage(`Success. ${resultJson.success}`);
      } else {
        setUpdateSuccess(false);
        setMessage(`Update failed.`);
      }
    } catch (err) {
      setDeleteSuccess(false);
      setMessage("Something went wrong.");
    }
  };

  return (
    <Container className="SubDataContainer">
      {message && (
        <Alert
          className="AlertMargin"
          variant={updateSuccess ? "success" : "danger"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}
      {confirmDelete && (
        <Alert className="AlertMargin" variant="danger">
          <Alert.Heading>
            Are you sure you want to delete this subscriber?
          </Alert.Heading>
          <p>This cannot be undone.</p>
          <div className="d-flex justify-content-end">
            <Button
              className="ButtonMargin"
              variant="danger"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              className="ButtonMargin"
              variant="outline-danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Alert>
      )}
      {!deleteSuccess && (
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
                  onChange={(e) =>
                    handleFormChanges(setPhoneNum, e.target.value)
                  }
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
                  onChange={(e) =>
                    handleFormChanges(setUsername, e.target.value)
                  }
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
                  onChange={(e) =>
                    handleFormChanges(setPassword, e.target.value)
                  }
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
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
                  readOnly={showEdit || showNewForm ? false : true}
                  disabled={showEdit || showNewForm ? false : true}
                  onChange={(e) =>
                    handleFormChanges(setFeatures, e.target.value)
                  }
                />
              </Col>
            </Row>
          </Form.Group>

          {!showEdit && !showNewForm ? (
            <div className="d-flex justify-content-end">
              <Button
                className="ButtonMargin"
                variant="primary"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
                className="ButtonMargin"
                variant="danger"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end">
              <Button
                className="ButtonMargin"
                variant="secondary"
                onClick={
                  showNewForm
                    ? () => {
                        setShowForm(false);
                      }
                    : resetValues
                }
              >
                Cancel
              </Button>
              <Button
                className="ButtonMargin"
                variant="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          )}
        </Form>
      )}
    </Container>
  );
}

export default SubscriberForm;
