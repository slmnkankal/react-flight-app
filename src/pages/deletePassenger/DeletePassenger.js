import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HttpRequestService from "../../utils/HttpRequestService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../../components/navbarComp/NavbarComp";

const DeletePassenger = () => {
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

  const [firstName, setFirstName] = useState(choosenPassenger?.first_name);
  const [lastName, setLastName] = useState(choosenPassenger?.last_name);
  const [resvEmail, setResvEmail] = useState(choosenPassenger?.email);
  const [phone, setPhone] = useState(choosenPassenger?.phone_number);

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

  const reservationUpdateBody = {
    id: choosenReservation?.id,
    flight: choosenReservation?.flight,
    flight_id: choosenReservation?.flight_id,
    user: choosenReservation?.user,
    passenger: unchangedPassengerList,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpRequestService.addAndDeletePassengerRequest(
        token,
        reservationUpdateBody,
        reservationId
      );
      manageAlertOptions(
        "success",
        true,
        "The passenger is deleted successfully!"
      );
      navigate("/reservations");
    } catch (error) {
      manageAlertOptions(
        "danger",
        true,
        "The passenger couldn't deleted!"
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
          <h1 className="form-title display-3">The Passenger</h1>
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
              value="Delete Passenger"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default DeletePassenger;