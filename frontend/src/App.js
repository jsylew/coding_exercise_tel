import "./App.css";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SubscriberForm from "./SubscriberForm";

const blankForm = {
  phone_num: "",
  username: "",
  password: "",
  domain: "",
  status: "",
  features: "",
};

function App() {
  const [phoneNum, setPhoneNum] = useState("");
  const [message, setMessage] = useState("");
  const [subscriberData, setSubscriberData] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setSubscriberData("");
    try {
      let res = await fetch(
        `http://127.0.0.1:5000/ims/subscriber/${phoneNum}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let resultJson = await res.json();
      if (res.status === 200) {
        setPhoneNum("");
        setSubscriberData(resultJson);
      } else {
        setMessage("Subscriber not found.");
      }
    } catch (err) {
      setMessage("Subscriber not found.");
    }
  };

  const handleAddBtn = () => {
    setShowForm(true);
    setSubscriberData("");
  };

  return (
    <div className="App">
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Search for Subscriber by Phone Number</Form.Label>
          <Form.Control
            required
            type="tel"
            pattern="[0-9]{11}"
            placeholder="Enter subscriber phone number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          <Form.Text className="text-muted">
            Phone numbers must be 11 digits long.
          </Form.Text>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit" disabled={showForm}>
            Search
          </Button>
          <Button
            variant="outline-primary"
            onClick={handleAddBtn}
            disabled={subscriberData}
          >
            Add/Update Subscriber
          </Button>
        </div>
      </Form>

      {message && (
        <Alert
          className="AlertMargin"
          variant="danger"
          dismissible
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      <div>
        {subscriberData && (
          <SubscriberForm
            subData={subscriberData}
            newForm={false}
            setShowForm={setShowForm}
            setSubscriberData={setSubscriberData}
            setParentMessage={setMessage}
          />
        )}
      </div>
      <div>
        {showForm && (
          <SubscriberForm
            subData={blankForm}
            newForm={true}
            setShowForm={setShowForm}
            setSubscriberData={setSubscriberData}
            setParentMessage={setMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
