import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../../App";
import LoginPage from "../../pages/loginPage/LoginPage";
import MainPage from "../../pages/mainPage/MainPage";
import Register from "../../pages/register/Register";
import ReservationAdd from "../../pages/reservationAdd/ReservationAdd";
import ReservationsPage from "../../pages/reservationsPage/ReservationsPage";
import ReservationUpdate from "../../pages/reservationUpdate/ReservationUpdate";

function AppRouter() {
  const user = useContext(UserContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.token ? <MainPage /> : <LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addreservation" element={<ReservationAdd />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/updatereservation" element={<ReservationUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
