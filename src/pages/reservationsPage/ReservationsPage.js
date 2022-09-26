import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import HttpRequestService from "../../utils/HttpRequestService";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  const [reservationsData, setReservationsData] = useState();
  const user = useContext(UserContext);

  let navigate = useNavigate();

  const navigateToReservation = (choosenReservation) => {
    navigate("/updatereservation", {
      state: { choosenReservation: choosenReservation, allReservations: reservationsData },
    });
  };

  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const data = await HttpRequestService.allReservations(user.token);
        console.log("data: ", data);
        setReservationsData(data);
      } catch (error) {
        manageAlertOptions(
          "danger",
          true,
          "You couldn't get reservations data!"
        );
      }
      setTimeout(() => {
        manageAlertOptions("", false, "");
      }, 5000);
    };
    fetchReservationsData();
  }, [user.token]);
  return (
    <>
      <Alert
        key={alertOptions.variant}
        variant={alertOptions.variant}
        show={alertOptions.show}
      >
        {alertOptions.message}
      </Alert>
      <Container className="fluid">
        <p>This is reservations page!</p>
        <Table className="mt-5" striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Flight</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Update Reservation</th>
            </tr>
          </thead>
          <tbody>
            {reservationsData?.map((singleReservation) => (
              <tr key={singleReservation.id}>
                <td>{singleReservation.id}</td>
                <td>{singleReservation.flight}</td>
                <td>
                  <ul className="list-unstyled">
                  {singleReservation.passenger?.map(
                    (singlePassenger) => <li>{singlePassenger.first_name}</li> 
                  )}
                  </ul>
                </td>
                <td>
                  <ul className="list-unstyled">
                  {singleReservation.passenger?.map(
                    (singlePassenger) => <li>{singlePassenger.last_name}</li>
                  )}
                  </ul>
                </td>
                <td>
                  <ul className="list-unstyled">
                  {singleReservation.passenger?.map(
                    (singlePassenger) => <li>{singlePassenger.email}</li>
                  )}
                  </ul>
                </td>
                {/* <td>
                    {formatTime(singleFlight.date_of_departure)}
                </td>
                <td>{singleFlight.etd}</td> */}
                <td>
                  <button
                    onClick={() => navigateToReservation(singleReservation)}
                    type="button"
                    className="btn btn-light"
                  >
                    Update Reservation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReservationsPage;
