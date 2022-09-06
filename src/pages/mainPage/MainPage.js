import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import HttpRequestService from "../../httpRequestService/HttpRequestService";
import axios from "axios";
import { UserContext } from "../../App";


function MainPage() {
  const [flightsData, setFlightsData] = useState({ flightsBody: [] });

  const user = useContext(UserContext);
  console.log(user)

  useEffect(() => {
    const fetchFlightsData = async () => {
      const { data } = await axios("http://127.0.0.1:8000/flight/flights/");

      setFlightsData({ flightsBody: data });
      console.log(data);
    };
    fetchFlightsData();
  }, [setFlightsData]);

  return (
    <>
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
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="fluid">
        <Table className="mt-5" striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Flight Number</th>
              <th>Operation Airlines</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Date of Departure</th>
              <th>Hour of Departure</th>
            </tr>
          </thead>
          <tbody>
            {flightsData.flightsBody &&
              flightsData.flightsBody.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.flight_number}</td>
                  <td>{item.operation_airlines}</td>
                  <td>{item.departure_city}</td>
                  <td>{item.arrival_city}</td>
                  <td>{item.date_of_departure}</td>
                  <td>{item.etd}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default MainPage;
