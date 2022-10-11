import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HttpRequestService from "../../utils/HttpRequestService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../../components/navbarComp/NavbarComp";

const AddPassenger = () => {
  const location = useLocation();
  const choosenReservation = location?.state?.choosenReservation;
  const choosenPassenger = location?.state?.choosenPassenger;
  const user = useContext(UserContext);

  const token = user.token;
  const reservationId = choosenReservation.id;

  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resvEmail, setResvEmail] = useState("");
  const [phone, setPhone] = useState("");

  let navigate = useNavigate();

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  const unchangedPassengerFunction = (unchangedPassengerItem) => {
    return unchangedPassengerItem.id !== choosenPassenger?.id;
  };
  const unchangedPassengerList = choosenReservation?.passenger.filter(
    unchangedPassengerFunction
  );
  const addPassengerItem = {
    first_name: firstName,
    last_name: lastName,
    email: resvEmail,
    phone_number: phone,
  };
  const passengerList = [...unchangedPassengerList, addPassengerItem];

  const reservationUpdateBody = {
    id: choosenReservation?.id,
    flight: choosenReservation?.flight,
    flight_id: choosenReservation?.flight_id,
    user: choosenReservation?.user,
    passenger: passengerList,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpRequestService.addPassengerRequest(
        token,
        reservationUpdateBody,
        reservationId
      );
      manageAlertOptions(
        "success",
        true,
        "The passenger added to the reservation successfully!"
      );
      navigate("/reservations");
    } catch (error) {
      manageAlertOptions(
        "danger",
        true,
        "The passenger couldn't added to the reservation!"
      );
    }
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
          <h1 className="form-title display-3">New Passenger</h1>
          <form id="reservation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter passenger's first name.."
                value={firstName}
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
                value={lastName}
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
              value="Add Passenger"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPassenger;
