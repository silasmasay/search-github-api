import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import api from './../services/api';

function Repos() {
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    (async () => {
      const search = localStorage.getItem("search");

      if (!search) return;

      const { data } = await api.get(`${search}/repos`);

      if (data) setRepos(data);
    })();
  }, []);

  return (
    <Row xs={1} md={2} lg={3}>
      {repos.map((repo) => (
        <Card as={Col} key={repo.id} className="card-custom card-custom__item">
          <Card.Body className="card-custom__body">
            <Card.Title>{repo.name}</Card.Title>

            <Card.Text>{repo.description ?? 'Content not informed'}</Card.Text>

            <Card.Link
              href={repo.html_url}
              target="_blank"
              className="card-custom__links"
            >
              repo
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}

export default Repos;