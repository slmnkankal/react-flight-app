import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/";
const loginPath = "users/auth/login/";

const login = (data) => {
  return axios
    .post(baseUrl + loginPath, data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const registerPath = "users/register/";

const register = (data) => {
  return axios
    .post(baseUrl + registerPath + data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const HttpRequestService = {
  login,
  register,
};

export default HttpRequestService;
