import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { UserContext } from "../../App";
import HttpRequestService from "../../utils/HttpRequestService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });
  const [email, setEmail] = useState("victor@hugo.com");
  const [password, setPassword] = useState("test.1989");

  const user = useContext(UserContext);
  let navigate = useNavigate();

  const registerBody = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResult = await HttpRequestService.login(registerBody);
      user.setToken(loginResult.key);
      user.setUserDetails(loginResult.user);
      manageAlertOptions("success", true, "You have successfully logged in!");
      navigate("/");
    } catch (error) {
      manageAlertOptions("danger", true, "Something went wrong!");
      navigate("/");
    }
    // setEmail("");
    // setPassword("");
    setTimeout(() => {
      manageAlertOptions("", false, "");
    }, 3000);
  };

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  useEffect(() => {
    if (user.userEmail) {
      setEmail(user.userEmail);
    }
  }, [user.userEmail]);

  return (
    <>
      <Alert
        key={alertOptions.variant}
        variant={alertOptions.variant}
        show={alertOptions.show}
      >
        {alertOptions.message}
      </Alert>
      <div className="d-flex justify-content-center mt-5">
        <div className="form-image me-5">
          <img src="https://picsum.photos/400/400" alt="sample-post" />
        </div>
        <div className="register-form">
          <h1 className="form-title display-3">Login</h1>
          <form id="register" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address.."
                value={email} // value={user.Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Login"
            />
          </form>
          <div className="mt-3">
            <p>If you don't have an account please register!</p>
            <button
              className="btn btn-primary form-control"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
