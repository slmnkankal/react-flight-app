import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import HttpRequestService from "../../utils/HttpRequestService";
import { UserContext } from "../../App";

const FlightsTable = () => {
  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const [flightsData, setFlightsData] = useState();
  const user = useContext(UserContext);
  const isUserAdmin = user.userDetails.is_staff
  const token = user.token;

  let navigate = useNavigate();

  const navigateToReservation = (choosenFlight) => {
    navigate("/addreservation", {
      state: { choosenFlight: choosenFlight, allFlights: flightsData },
    });
  };
  const navigateToAddFlight = () => {
    navigate("/addflight");
  };
  const navigateToUpdateFlight = (singleFlight) => {
    navigate("/updateflight", {
      state: {
        singleFlight,
      },
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
    return moment(time).format("ll");
  };

  const deleteFlight = async (singleFlight) => {
    const flightId = singleFlight.id;
    try {
      await HttpRequestService.deleteFlight(token, flightId);
      fetchFlightsData();
      manageAlertOptions(
        "success",
        true,
        "The flight is deleted successfully!"
      );
    } catch (error) {
      manageAlertOptions(
        "danger",
        true,
        `${error.response.data.detail}`
      );
    }
    setTimeout(() => {
      manageAlertOptions("", true, "");
    }, 3000);
  };

  const fetchFlightsData = async () => {
    try {
      const data = await HttpRequestService.flights(token);
      setFlightsData(data);
    } catch (error) {
      manageAlertOptions("danger", true, "You couldn't get flights data!");
    }
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

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
        <div className="d-flex justify-content-between  mt-5">
          <h5 className="d-flex justify-content-start fw-bold">Flights</h5>
          {isUserAdmin && <button
            type="button"
            className="btn btn-secondary py-1 px-4"
            onClick={() => navigateToAddFlight()}
          >
            Add Flight
          </button>}
        </div>
        <Table className="mt-1" striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Flight Number</th>
              <th>Operation Airlines</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              <th>Date of Departure</th>
              <th>Hour of Departure</th>
              <th>Add Reservation</th>
              {isUserAdmin && <th>Update Flight</th>}
              {isUserAdmin && <th>Delete Flight</th>}
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
                <td>{formatTime(singleFlight.date_of_departure)}</td>
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
                {isUserAdmin && <td>
                  <button
                    onClick={() => navigateToUpdateFlight(singleFlight)}
                    type="button"
                    className="btn btn-light"
                  >
                    Update Flight
                  </button>
                </td>}
                {isUserAdmin && <td>
                  <button
                    onClick={() => deleteFlight(singleFlight)}
                    type="button"
                    className="btn btn-light"
                  >
                    Delete Flight
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default FlightsTable;
