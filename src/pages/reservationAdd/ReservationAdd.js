import React, { useState } from "react";
import HttpRequestService from "../../utils/HttpRequestService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../../components/navbarComp/NavbarComp";

const ReservationAdd = () => {
  const user = useContext(UserContext);
  const location = useLocation();
  const choosenFlight = location?.state?.choosenFlight;
  const allFlights = location?.state?.allFlights;

  // state: { choosenFlight: choosenFlight, allFlights: flightsData },

  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resvEmail, setResvEmail] = useState("");
  const [phone, setPhone] = useState("");

  const reservationBody = {
    flight_id: choosenFlight?.id,
    user_id: user.userDetails.id,
    passenger: [
      {
        first_name: firstName,
        last_name: lastName,
        email: resvEmail,
        phone_number: phone,
      },
    ],
  };

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpRequestService.addReservation({
        reservationBody: reservationBody,
        token: user.token,
      });
      manageAlertOptions(
        "success",
        true,
        "Your reservation is successfully saved!"
      );
      navigate("/reservations");
    } catch (error) {
      manageAlertOptions("danger", true, "Your reservation is failed!");
    }
    setFirstName("");
    setLastName("");
    setResvEmail("");
    setPhone("");
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
        <div className="reservation-form">
          <h1 className="form-title display-3">Passenger Info</h1>
          <form id="reservation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dropdown" className="form-label">
                Flight Number
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="dropdown"
                defaultValue={choosenFlight?.id}
              >
                <option>Select Flight Number</option>
                <option value={choosenFlight?.id}>
                  {choosenFlight?.flight_number}
                </option>
                {allFlights?.map((singleFlight) => (
                  <option
                    id={singleFlight.id}
                    key={singleFlight.id}
                    value={singleFlight.id}
                  >
                    {singleFlight.flight_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter passenger's first name.."
                value={firstName} // value={user.Email}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Enter passenger's last name.."
                value={lastName} // value={user.Email}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resvemail" className="form-label">
                Email
              </label>
              <input
                type="resvemail"
                className="form-control"
                id="resvemail"
                placeholder="Enter passenger's email address.."
                value={resvEmail}
                onChange={(e) => setResvEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                placeholder="Enter passenger's phone number.."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Submit Reservation"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationAdd;
