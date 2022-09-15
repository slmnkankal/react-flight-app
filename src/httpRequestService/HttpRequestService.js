import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/";
const loginPath = "users/auth/login/";
const fligthsPath = "flight/flights/"
const logoutPath = "users/auth/logout/";

const login = (data) => {
  return axios
    .post(baseUrl + loginPath, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
const logout = (data) => {
  return axios
    .post(baseUrl + logoutPath, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const registerPath = "users/register/";

const register = (data) => {
  return axios
    .post(baseUrl + registerPath, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


const flights = (data) => {
  return axios
  .post(baseUrl + fligthsPath, data)
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
    throw error;
  })
}

const addReservationPath = "flight/resv/";

const addReservation = (data) => {
  return axios
  .post(baseUrl + addReservationPath, data)
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
    throw error;
  })
}

const HttpRequestService = {
  login,
  register,
  flights,
  logout,
  addReservation,
};

export default HttpRequestService;
