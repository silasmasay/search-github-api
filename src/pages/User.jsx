import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Row, Card, Image, Alert } from 'react-bootstrap';

import api from './../services/api';

function User() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  let params = useParams();
  
  useEffect(() => {
    (async () => {
      if (!params.user) return;

      localStorage.setItem('search', params.user);

      try {
        const { data } = await api.get(params.user);

        if (data) setUser(data);
      } catch {
        setUser({});
        setValidated(true);
      }
    })();
  }, [params.user]);

  return Object.values(user).length === 0 ? (
    <Row>
      {validated && (
        <Alert className="mt-3" variant="danger" onClose={() => setValidated(false)} dismissible>
          <Alert.Heading>User not found!</Alert.Heading>
        </Alert>
      )}

      <Card className="card-custom card-custom__item">
        <Card.Body className="card-custom__body">
          <Card.Text className="card-custom__description">
            Search for a user valid and see the data
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  ) : (
    <Row>
      <Card className="card-custom card-custom__item">
        <Card.Body className="card-custom__body">
          <Image src={user.avatar_url} roundedCircle={true} />
          
          <Card.Title className="card-custom__title">{user.name}</Card.Title>
          
          <Card.Subtitle className="card-custom__subtitle">{user.location}</Card.Subtitle>
          
          <Card.Text className="card-custom__description">
            {user.bio}  
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default User;