import { useEffect, useState } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';

import api from './../services/api';

function Starred() {
  const [starred, setStarred] = useState([]);
  
  useEffect(() => {
    (async () => {
      const search = localStorage.getItem("search");

      if (!search) return;

      const { data } = await api.get(`${search}/starred`);

      if (data) setStarred(data);
    })();
  }, []);

  return (
    <Row xs={1} md={2} lg={3}>
      {starred.map(({ id, description, owner }) => (
        <Card key={id} as={Col} className="card-custom card-custom__item">
          <Card.Body className="card-custom__body">
            <Image src={owner.avatar_url} roundedCircle={true} />

            <Card.Title className="card-custom__title">{owner.login}</Card.Title>
            
            <Card.Subtitle className="card-custom__subtitle">{owner.location}</Card.Subtitle>
            
            <Card.Text className="card-custom__description">
              {description}
            </Card.Text>

            <Card.Link
              href={owner.html_url}
              target="_blank"
              className="card-custom__links"
            >
              profile
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}

export default Starred;