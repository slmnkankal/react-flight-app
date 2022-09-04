import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/loginPage/LoginPage";
import MainPage from "../../pages/mainPage/MainPage";
import Register from "../../pages/register/Register";
import { useContext } from "react";
import { UserContext } from "../../App";

function AppRouter() {
  const user = useContext(UserContext);
  console.log(user.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.token ? <MainPage /> : <LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
