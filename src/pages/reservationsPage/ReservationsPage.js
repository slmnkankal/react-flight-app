import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import HttpRequestService from "../../utils/HttpRequestService";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../../components/navbarComp/NavbarComp";

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
  const token = user.token;
  let navigate = useNavigate();

  const navigateToReservation = (choosenReservation, choosenPassenger) => {
    navigate("/updatereservation", {
      state: {
        choosenReservation,
        choosenPassenger,
        allReservations: reservationsData,
      },
    });
  };

  const navigateToAddPassenger = (choosenReservation) => {
    navigate("/addpassenger", {
      state: {
        choosenReservation,
      },
    });
  };

  const deleteReservationsData = async (singleReservation) => {
    const reservationId = singleReservation.id;
    try {
      await HttpRequestService.deleteReservation(token, reservationId);
      fetchReservationsData();
      manageAlertOptions(
        "success",
        true,
        "The reservation is deleted successfully!"
      );
    } catch (error) {
      manageAlertOptions(
        "danger",
        true,
        "You couldn't delete the reservation!"
      );
    }
    setTimeout(() => {
      manageAlertOptions("", true, "");
    }, 3000);
  };

  const fetchReservationsData = async () => {
    try {
      const data = await HttpRequestService.allReservations(token);
      setReservationsData(data);
    } catch (error) {
      manageAlertOptions("danger", true, "You couldn't get reservations data!");
    }
    setTimeout(() => {
      manageAlertOptions("", false, "");
    }, 5000);
  };

  useEffect(() => {
    fetchReservationsData();
  }, []);

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
      <Container className="fluid">
        <h5 className="d-flex justify-content-start mt-5 fw-bold">
          Reservations
        </h5>
        <Table className="mt-1" striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Flight</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Update Reservation</th>
              <th>Add Passenger</th>
              <th>Delete Reservation</th>
            </tr>
          </thead>
          <tbody>
            {reservationsData?.map((singleReservation) =>
              singleReservation?.passenger?.map((singlePassenger, index) => (
                <tr key={index}>
                  <td>{singleReservation.id}</td>
                  <td>{singleReservation.flight}</td>
                  <td>{singlePassenger.first_name}</td>
                  <td>{singlePassenger.last_name}</td>
                  <td>{singlePassenger.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigateToReservation(
                          singleReservation,
                          singlePassenger
                        )
                      }
                      type="button"
                      className="btn btn-light"
                    >
                      Update Reservation
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigateToAddPassenger(singleReservation)}
                      type="button"
                      className="btn btn-light"
                    >
                      Add Passenger
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteReservationsData(singleReservation)}
                      type="button"
                      className="btn btn-light"
                    >
                      Delete Reservation
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReservationsPage;
