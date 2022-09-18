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
const headers = {
  'Authorization': 'Token 5233b2ea3a2587556b6b2648f0cbd405890b5e92'
}

const addReservation = (data) => {
  return axios
  .post(baseUrl + addReservationPath, data, {
    headers: headers
  })
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
    throw error;
  })
}

// const addReservation = (data, token) => {
//   console.log(token)
//   return axios
//   .post(baseUrl + addReservationPath, {data}, {
//     headers: {
//       'Authorization': `Token ${token}`
//     }
//   })
//   .then((response) => response.data)
//   .catch((error) => {
//     console.log(error);
//     throw error;
//   })
// }

// const token = '..your token..'

// axios.post(url, {
//   //...data
// }, {
//   headers: {
//     'Authorization': `Basic ${token}` 
//   }
// })

const HttpRequestService = {
  login,
  register,
  flights,
  logout,
  addReservation,
};

export default HttpRequestService;
