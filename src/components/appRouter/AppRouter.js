import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../../App";
import FlightAdd from "../../pages/flightAdd/FlightAdd";
import AddPassenger from "../../pages/addPassenger/AddPassenger";
import LoginPage from "../../pages/loginPage/LoginPage";
import MainPage from "../../pages/mainPage/MainPage";
import Register from "../../pages/register/Register";
import ReservationAdd from "../../pages/reservationAdd/ReservationAdd";
import ReservationsPage from "../../pages/reservationsPage/ReservationsPage";
import ReservationUpdate from "../../pages/reservationUpdate/ReservationUpdate";
import FlightUpdate from "../../pages/flightUpdate/FlightUpdate";
import DeletePassenger from "../../pages/deletePassenger/DeletePassenger";

function AppRouter() {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.token ? <MainPage /> : <LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/addreservation"
          element={user.token ? <ReservationAdd /> : <LoginPage />}
        />
        <Route
          path="/reservations"
          element={user.token ? <ReservationsPage /> : <LoginPage />}
        />
        <Route
          path="/updatereservation"
          element={user.token ? <ReservationUpdate /> : <LoginPage />}
        />
        <Route
          path="/addpassenger"
          element={user.token ? <AddPassenger /> : <LoginPage />}
        />
        <Route
          path="/deletepassenger"
          element={user.token ? <DeletePassenger /> : <LoginPage />}
        />
        <Route
          path="/addflight"
          element={user.token ? <FlightAdd /> : <LoginPage />}
        />
        <Route
          path="/updateflight"
          element={user.token ? <FlightUpdate /> : <LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
