import "./App.css";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SubscriberForm from "./SubscriberForm";

function App() {
  const [phoneNum, setPhoneNum] = useState("");
  const [message, setMessage] = useState("");
  const [subscriberData, setSubscriberData] = useState("");
  const [showData, setShowData] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowData(false);
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
        setShowData(true);
        // console.log(resultJson);
      } else {
        setMessage("Subscriber not found.");
      }
    } catch (err) {
      setMessage("Subscriber not found.");
    }
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

        <Button variant="primary" type="submit">
          Search
        </Button>
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

      <div>{showData && <SubscriberForm subData={subscriberData} />}</div>
    </div>
  );
}

export default App;
