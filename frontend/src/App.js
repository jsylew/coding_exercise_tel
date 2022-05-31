import "./App.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SubscriberTable from "./SubscriberTable";

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
      let result = await fetch(
        `http://127.0.0.1:5000/ims/subscriber/${phoneNum}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let resultJson = await result.json();
      if (result.status === 200) {
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search for Subscriber by Phone Number</Form.Label>
          <Form.Control
            required
            type="tel"
            pattern="[0-9]{11}"
            placeholder="Enter subscriber phone number"
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
      <div className="NotFoundMessage">
        {message ? (
          <p>
            <em>{message}</em>
          </p>
        ) : null}
      </div>
      <div>
        {showData ? <SubscriberTable subData={subscriberData} /> : null}
      </div>
    </div>
  );
}

export default App;
