import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import { UserContext } from "../../App";

const NavbarComp = () => {
  const [flightsData, setFlightsData] = useState({ flightsBody: [] });

  const user = useContext(UserContext);
  console.log(user.userDetails);

  useEffect(() => {
    const fetchFlightsData = async () => {
      const { data } = await axios("http://127.0.0.1:8000/flight/flights/");

      setFlightsData({ flightsBody: data });
      console.log(data);
    };
    fetchFlightsData();
  }, [setFlightsData]);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{user.userDetails.username}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
