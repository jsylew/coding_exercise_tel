import { Container, Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function SubscriberForm({
  subData,
  newForm,
  setSubscriberData,
  setShowForm,
  setParentMessage,
}) {
  // booleans to trigger changes in view
  const [showEdit, setShowEdit] = useState(newForm);
  const [showPassword, setShowPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  // form fields
  const [phoneNum, setPhoneNum] = useState(subData.phone_num);
  const [username, setUsername] = useState(subData.username);
  const [password, setPassword] = useState(subData.password);
  const [domain, setDomain] = useState(subData.domain);
  const [status, setStatus] = useState(subData.status);
  const [features, setFeatures] = useState(subData.features);

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

  const handleSubmit = async (e, method) => {
    e.preventDefault();
    let uri_phone = method === "EDIT" ? subData.phone_num : phoneNum;
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/ims/subscriber/${uri_phone}`,
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
        `http://127.0.0.1:5000/ims/subscriber/${phoneNum}`,
        {
          method: "DELETE",
        }
      );

      let resultJson = await res.json();
      if (res.status === 200) {
        setConfirmDelete(false);
        setUpdateSuccess(true);
        setDeleteSuccess(true);
        setSubscriberData("");
        setShowForm(false);
        setParentMessage(`Success. ${resultJson.success}`);
      } else {
        setUpdateSuccess(false);
        setMessage(`Update failed.`);
      }
    } catch (err) {
      console.log(err);
      setDeleteSuccess(false);
      setUpdateSuccess(false);
      setMessage("Something went wrong.");
    }
  };

  return (
    <Container className="SubDataContainer">
      {/* alert message for update success or failure */}
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
      {/* alert message to confirm or cancel delete action */}
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
      {/* hide form if user is successfully deleted */}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
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
                  readOnly={!showEdit}
                  disabled={!showEdit}
                  onChange={(e) =>
                    handleFormChanges(setFeatures, e.target.value)
                  }
                />
              </Col>
            </Row>
          </Form.Group>

          {/* if form is not in edit or new form view, show edit and delete buttons.
          else, show cancel and update buttons */}
          {!showEdit ? (
            <div className="d-flex justify-content-end">
              <Button
                className="ButtonMargin"
                variant="outline-primary"
                onClick={
                  newForm
                    ? () => {
                        setShowForm(false);
                      }
                    : () => {
                        setSubscriberData("");
                      }
                }
              >
                Close
              </Button>
              <Button
                className="ButtonMargin"
                variant="warning"
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
                  newForm
                    ? () => {
                        setShowForm(false);
                      }
                    : resetValues
                } // if it's in new form view, cancel button reset and hides form from view. if it's in edit mode, reset values
              >
                Cancel
              </Button>
              <Button
                className="ButtonMargin"
                variant="primary"
                onClick={
                  newForm
                    ? (e) => {
                        handleSubmit(e, "ADD");
                      }
                    : (e) => {
                        handleSubmit(e, "EDIT");
                      }
                }
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
