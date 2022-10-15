import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HttpRequestService from "../../utils/HttpRequestService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../../components/navbarComp/NavbarComp";

const FlightUpdate = () => {
  const location = useLocation();
  const singleFlight = location?.state?.singleFlight;
  const user = useContext(UserContext);

  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const [flightNumber, setFlightNumber] = useState(singleFlight.flight_number);
  const [operationAirlines, setOperationAirlines] = useState(singleFlight.operation_airlines);
  const [departureCity, setDepartureCity] = useState(singleFlight.departure_city);
  const [arrivalCity, setArrivalCity] = useState(singleFlight.arrival_city);
  const [dateOfDeparture, setDateOfDeparture] = useState(singleFlight.date_of_departure);
  const [hourOfDeparture, setHourOfDeparture] = useState(singleFlight.etd);

  let navigate = useNavigate();

  const flightUpdateBody = {
    flight_number: flightNumber,
    operation_airlines: operationAirlines,
    departure_city: departureCity,
    arrival_city: arrivalCity,
    date_of_departure: dateOfDeparture,
    etd: hourOfDeparture,
  };

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  const token = user.token;
  const flightId = singleFlight.id;
  console.log(flightId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpRequestService.updateFlight(token, flightUpdateBody, flightId);
      manageAlertOptions(
        "success",
        true,
        "The flight is successfully updated!"
      );
      navigate("/");
    } catch (error) {
      manageAlertOptions("danger", true, `${error.response.data.detail}`);
    }
    setTimeout(() => {
        manageAlertOptions("", true, "");
      }, 3000);
  };

  return (
    <>
      <NavbarComp />
      <Alert
        key={alertOptions.variant}
        variant={alertOptions.variant}
        show={alertOptions.show}
      >
        {alertOptions.message}
      </Alert>
      <div className="d-flex justify-content-center mt-5">
        <div className="form-image me-5">
          <img src="https://picsum.photos/400/400" alt="sample-post" />
        </div>
        <div className="flight-form">
          <h1 className="form-title display-3">Flight Info</h1>
          <form id="flight" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="flight-number" className="form-label">
                Flight Number
              </label>
              <input
                type="text"
                className="form-control"
                id="flight-number"
                placeholder="Enter flight number.."
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="operation-airlines" className="form-label">
                Operation Airlines
              </label>
              <input
                type="text"
                className="form-control"
                id="operation-airlines"
                placeholder="Enter name of operation airlines.."
                value={operationAirlines}
                onChange={(e) => setOperationAirlines(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="departure-city" className="form-label">
                Departure City
              </label>
              <input
                type="text"
                className="form-control"
                id="departure-city"
                placeholder="Enter your departure city.."
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arrival-city" className="form-label">
                Arrival City
              </label>
              <input
                type="text"
                className="form-control"
                id="arrival-city"
                placeholder="Enter your arrival city.."
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date-of-departure" className="form-label">
                Date of Departure
              </label>
              <input
                type="date"
                className="form-control"
                id="date-of-departure"
                placeholder="Enter your date of departure.."
                value={dateOfDeparture}
                onChange={(e) => setDateOfDeparture(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hour-of-departure" className="form-label">
                Hour of Departure
              </label>
              <input
                type="time"
                step="2"
                className="form-control"
                id="hour-of-departure"
                placeholder="Enter passenger's phone number.."
                value={hourOfDeparture}
                onChange={(e) => setHourOfDeparture(e.target.value)}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Update Flight"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default FlightUpdate;
