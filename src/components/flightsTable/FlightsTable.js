import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const FlightsTable = () => {
    const [flightsData, setFlightsData] = useState({ flightsBody: [] });

  useEffect(() => {
    const fetchFlightsData = async () => {
      const { data } = await axios("http://127.0.0.1:8000/flight/flights/");

      setFlightsData({ flightsBody: data });
      console.log(data);
    };
    fetchFlightsData();
  }, [setFlightsData]);
  return (
    <div><Container className="fluid">
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
  </Container></div>
  )
}

export default FlightsTable