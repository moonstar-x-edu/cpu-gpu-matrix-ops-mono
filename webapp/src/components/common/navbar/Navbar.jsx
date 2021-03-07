import React, { useContext } from 'react';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import { ROUTES, NAVBAR_ITEMS, LINKS } from '../../../constants';

const Navbar = () => {
  const { active } = useContext(AppContext);

  return (
    <BSNavbar collapseOnSelect expand="lg" variant="dark">
      <BSNavbar.Brand as={Link} to={ROUTES.benchmark}>
        <img src="/img/logo.png" alt="Site logo" className="brand-logo" />
        <span className="h2 brand-name" />
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="responsive-navbar" />
      <BSNavbar.Collapse expand="lg" id="responsive-navbar">
        <Nav fill className="mr-auto">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={ROUTES.benchmark}
              active={active === NAVBAR_ITEMS.benchmark}
              eventKey={NAVBAR_ITEMS.benchmark}
            >
              Benchmark
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={ROUTES.results}
              active={active === NAVBAR_ITEMS.results}
              eventKey={NAVBAR_ITEMS.results}
            >
              Resultados
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={LINKS.github}>
              GitHub
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
