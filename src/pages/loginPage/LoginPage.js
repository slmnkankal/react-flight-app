import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="form-image me-5">
        <img src="https://picsum.photos/400/400" alt="sample-movie" />
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
              value={email}
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
          <p>If you don't have an acoount please register</p>
          <button
            className="btn btn-primary form-control" //onClick={handleProviderLogin}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
