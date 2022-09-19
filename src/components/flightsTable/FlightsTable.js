import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import HttpRequestService from "../../httpRequestService/HttpRequestService";

const FlightsTable = () => {
  const [flightsData, setFlightsData] = useState();

  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const data = await HttpRequestService.flights();
        console.log(data);
        setFlightsData(data);
      } catch (error) {
        // TODO alert
      }
    };
    fetchFlightsData();
  }, [setFlightsData]);

  let navigate = useNavigate();

  const navigateToReservation = (choosenFlight) => {
    navigate("/addreservation", {
      state: { choosenFlight: choosenFlight, allFlights: flightsData },
    });
  };
  return (
    <div>
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
            {flightsData?.map((singleFlight) => (
              <tr key={singleFlight.id}>
                <td>{singleFlight.id}</td>
                <td>{singleFlight.flight_number}</td>
                <td>{singleFlight.operation_airlines}</td>
                <td>{singleFlight.departure_city}</td>
                <td>{singleFlight.arrival_city}</td>
                <td>
                  <Moment format="D MMM YYYY" withTitle>
                    {singleFlight.date_of_departure}
                  </Moment>
                </td>
                <td>{singleFlight.etd}</td>
                <td>
                  <button
                    onClick={() => navigateToReservation(singleFlight)}
                    type="button"
                    class="btn btn-light"
                  >
                    Add Reservation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default FlightsTable;
