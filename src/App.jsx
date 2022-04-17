import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import './styles/App.scss';

import User from './pages/User';
import Starred from './pages/Starred';
import Repos from './pages/Repos';

import Search from './components/Search';
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Container>
        <Search />

        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/:user" element={<User />} />
          <Route path="/:user/starred" element={<Starred />} />
          <Route path="/:user/repos" element={<Repos />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
