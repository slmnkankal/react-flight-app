import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/";
const loginPath = "users/auth/login/";
const logoutPath = "users/auth/logout/";
const fligthsPath = "flight/flights/";
const registerPath = "users/register/";
const allReservationsPath = "flight/resv/";

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

const register = (data) => {
  return axios
    .post(baseUrl + registerPath, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const flights = () => {
  return axios
    .get(baseUrl + fligthsPath)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const addReservation = (data) => {
  return axios
    .post(baseUrl + allReservationsPath, data.reservationBody, {
      headers: {
        Authorization: `Token ${data.token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const allReservations = (token) => {
  console.log("token: ",token)
  return axios
    .get(baseUrl + allReservationsPath, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
const updateReservation = (token, reservationUpdateBody, reservationId) => {
  console.log("token: ",token)
  console.log("reservationId, reservationUpdateBody: ", reservationId, reservationUpdateBody)
  return axios
    .put(baseUrl + allReservationsPath + reservationId + "/", reservationUpdateBody, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const HttpRequestService = {
  login,
  register,
  flights,
  logout,
  addReservation,
  allReservations,
  updateReservation,
};

export default HttpRequestService;
