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
    .then((response) => {
      console.log(response)
      return response.data
    })
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
    .then((response) => {
      console.log(response)
      return response.data
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const flights = (token) => {
  return axios
    .get(baseUrl + fligthsPath, {
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

const addFlight = (data) => {
  return axios
    .post(baseUrl + fligthsPath, data.flightBody, {
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

const updateFlight = (token, flightUpdateBody, flightId) => {
  return axios
    .put(baseUrl + fligthsPath + flightId + "/", flightUpdateBody, {
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

const deleteFlight = (token, flightId) => {
  return axios
    .delete(baseUrl + fligthsPath + flightId + "/", {
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

const deleteReservation = (token, reservationId) => {
  return axios
    .delete(baseUrl + allReservationsPath + reservationId + "/", {
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

const addAndDeletePassengerRequest = (token, reservationUpdateBody, reservationId) => {
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
  logout,
  register,
  flights,
  addFlight,
  updateFlight,
  deleteFlight,
  addReservation,
  allReservations,
  updateReservation,
  deleteReservation,
  addAndDeletePassengerRequest,
};

export default HttpRequestService;
