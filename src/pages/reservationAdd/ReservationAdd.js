import React, { useState } from "react";
import HttpRequestService from "../../httpRequestService/HttpRequestService";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";

const ReservationAdd = () => {
  const user = useContext(UserContext);

  const location = useLocation();
  console.log("location_state: ",location.state);
  console.log("user", user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resvEmail, setResvEmail] = useState("");
  const [phone, setPhone] = useState("");

  const reservationBody = {
    flight_id: location?.state?.item?.id,
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
  

  console.log(reservationBody);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservationResult = await HttpRequestService.addReservation(
        reservationBody
      );
      console.log("reservation result: ", reservationResult.data);
    } catch (error) {
      console.log("error: ", error.response);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="form-image me-5">
          <img src="https://picsum.photos/400/400" alt="sample-post" />
        </div>
        <div className="reservation-form">
          <h1 className="form-title display-3">Passenger Info</h1>
          <form id="reservation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dropdown" className="form-label">Flight Number</label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="dropdown"
              >
                <option selected>Select Flight Number</option>
                <option selected value={location?.state?.item?.id}>{location?.state?.item?.flight_number}</option>
                {/* {
                    location.state.item.map((i) => (
                      <option value="1">{i.id}</option>
                    ))
                } */}
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            {/* <p>
              {location?.state?.item?.id} {user.userDetails.id}
            </p> */}
            <div className="mb-3">
              <label htmlFor="user-id" className="form-label">
                User Id ({user.userDetails.username})
              </label>
              <input
                type="number"
                className="form-control"
                id="user-id"
                placeholder={user.userDetails.id}
                value={user.userDetails.id} // value={user.Email}
                required
              />
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
