import moment from "moment";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import HttpRequestService from "../../utils/HttpRequestService";

const FlightsTable = () => {
  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const [flightsData, setFlightsData] = useState();

  let navigate = useNavigate();

  const navigateToReservation = (choosenFlight) => {
    navigate("/addreservation", {
      state: { choosenFlight: choosenFlight, allFlights: flightsData },
    });
  };

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  const formatTime = (time) => {
    return moment(time).format('ll')
  }
 
  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const data = await HttpRequestService.flights();
        setFlightsData(data);
      } catch (error) {
      manageAlertOptions("danger", true, "You couldn't get flights data!");
      }
    };
    fetchFlightsData();
  }, [setFlightsData]);

  return (
    <div>
      <Alert
        key={alertOptions.variant}
        variant={alertOptions.variant}
        show={alertOptions.show}
      >
        {alertOptions.message}
      </Alert>
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
                    {formatTime(singleFlight.date_of_departure)}
                </td>
                <td>{singleFlight.etd}</td>
                <td>
                  <button
                    onClick={() => navigateToReservation(singleFlight)}
                    type="button"
                    className="btn btn-light"
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
