import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import HttpRequestService from "../../utils/HttpRequestService";
import { UserContext } from "../../App";

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
  console.log("user: ", user);

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
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReservationsPage;
