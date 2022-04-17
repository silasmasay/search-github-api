import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Card, Nav } from 'react-bootstrap';

function Navigation() {
  const [selectKey, setSelectKey] = useState('1');
  const [search, setSearch] = useState(null);
  const location = useLocation();

  const handleSelectKey = (key) => {
    setSelectKey(key);
  }

  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.clear();
    } else {
      const getSearch = localStorage.getItem('search');

      setSearch(getSearch);
    }
  }, [location.pathname]);

  return (
    <Card>
      <Card.Header>
        <Nav
          variant="pills"
          activeKey={selectKey}
          onSelect={handleSelectKey}
        >
          <Nav.Item>
            <Nav.Link as={Link} to={search ?? "/"} eventKey="1">
              User
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={search ? `${search}/starred` : "/"} eventKey="2">
              Starred
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={search ? `${search}/repos` : "/"} eventKey="3">
              Repos
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
    </Card>
  );
}

export default Navigation;