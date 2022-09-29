import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ReservationUpdate = () => {
  const location = useLocation();
  console.log("location", location);
  const choosenReservation = location?.state?.choosenReservation;
  const allReservations = location?.state?.allReservations;

  const [firstName, setFirstName] = useState(choosenReservation?.passenger[0].first_name);
  console.log("first_name: ", firstName)
  const [lastName, setLastName] = useState(choosenReservation?.passenger[0].last_name);
  const [resvEmail, setResvEmail] = useState(choosenReservation?.passenger[0].email);
  const [phone, setPhone] = useState(choosenReservation?.passenger[0].phone_number);

  return (
    <>
      {/* <Alert
            key={alertOptions.variant}
            variant={alertOptions.variant}
            show={alertOptions.show}
          >
            {alertOptions.message}
          </Alert> */}
      <div className="d-flex justify-content-center mt-5">
        <div className="form-image me-5">
          <img src="https://picsum.photos/400/400" alt="sample-post" />
        </div>
        <div className="reservation-form">
          <h1 className="form-title display-3">Updating Form</h1>
          <form
            id="reservation"
            //    onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="dropdown" className="form-label">
                Flight Number
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="dropdown"
                defaultValue={choosenReservation?.id}
              >
                {/* <option>Select Flight Number</option> */}
                <option value={choosenReservation?.id}>
                  {choosenReservation?.flight}
                </option>
                {/* {allReservations?.map((singleReservation) => (
                      <option
                        id={singleReservation.id}
                        key={singleReservation.id}
                        value={singleReservation.id}
                      >
                        {singleReservation.flight_number}
                      </option>
                    ))} */}
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
              value="Update Reservation"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationUpdate;
