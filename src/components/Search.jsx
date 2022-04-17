import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Search() {
  const [validated, setValidated] = useState(false);
  const inputRef = useRef(null);
  let navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const value = inputRef.current.value;

    if (!value) {
      setValidated(true);
    } else {
      setValidated(false);
    }
    
    navigate(`/${value}`);
    
    localStorage.setItem("search", value);
  }

  return (
    <Row>
      {validated && (
        <Alert className="mt-3" variant="warning" onClose={() => setValidated(false)} dismissible>
          <Alert.Heading>The field cannot be empty!</Alert.Heading>
        </Alert>
      )}

      <Card className="card-custom my-3">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} xs controlId="search">
                <Form.Control
                  required
                  ref={inputRef}
                  type="text"
                  placeholder="Search for Users!"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>

              <Col xs="auto">
                <Button
                  variant="secondary"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default Search;