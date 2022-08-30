import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function Register() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = () => {
    console.log(userName, name, surName, email, password, password2);
    const baseUrl = "http://127.0.0.1:8000/";
    const registerPath = "users/register/";
    const registerBody = {
      username: userName,
      email: email,
      first_name: name,
      last_name: surName,
      password: password,
      password2: password2,
    };
    axios
      .post(baseUrl + registerPath, registerBody)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setUserName("");
    setName("");
    setSurName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <div className="d-flex  flex-column align-items-center mb-4 ">
                <p className="text-start">Username</p>
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form1"
                  type="text"
                  className="w-100"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                />
              </div>
              <div className="d-flex flex-row flex-column align-items-center mb-4 ">
                <p>Your Name</p>
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form1"
                  type="text"
                  className="w-100"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="d-flex flex-row flex-column align-items-center mb-4 ">
                <p>Your Surname</p>
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form1"
                  type="text"
                  className="w-100"
                  onChange={(e) => setSurName(e.target.value)}
                  value={surName}
                  required
                />
              </div>

              <div className="d-flex flex-row flex-column align-items-center mb-4">
                <p>Your Email</p>
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form2"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="d-flex flex-row flex-column align-items-center mb-4">
                <p>Password</p>
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form3"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="d-flex flex-row flex-column align-items-center mb-4">
                <p>Repeat Your Password</p>
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  label=""
                  id="form4"
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                  value={password2}
                  required
                />
              </div>

              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                Register
              </button>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
