import {
  MDBCard,
  MDBCardBody,
  MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow
} from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import HttpRequestService from "../../httpRequestService/HttpRequestService";


function Register() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const user = useContext(UserContext);


  const [alertOptions, setAlertOptions] = useState({
    variant: null,
    show: false,
    message: "",
  });

  let navigate = useNavigate();

  const registerBody = {
    username: userName,
    email: email,
    first_name: name,
    last_name: surName,
    password: password,
    password2: password2,
  };

  const handleSubmit = async (e) => {
    try {
      const registerResult = await HttpRequestService.register(registerBody);
      console.log("email:", registerResult.email)
      user.setUserEmail(registerResult.email)
      manageAlertOptions("success", true, "You have successfully registered!");
      navigate("/login");
    } catch (error) {
      console.log("try-catch: ", error);
      manageAlertOptions("danger", true, "Something went wrong!");
    }
    setUserName("");
    setName("");
    setSurName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setTimeout(() => {
      manageAlertOptions("", false, "")
    }, 1000);
  };

  const manageAlertOptions = (variant, show, message) => {
    setAlertOptions({
      variant: variant,
      show: show,
      message: message,
    });
  };

  return (
    <>
      <Alert
        key={alertOptions.variant}
        variant={alertOptions.variant}
        show={alertOptions.show}
      >
        {alertOptions.message}
      </Alert>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <div className="d-flex  flex-column mb-4 ">
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
                <div className="d-flex flex-row flex-column mb-4 ">
                  <p className="text-start">Your Name</p>
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
                <div className="d-flex flex-row flex-column mb-4 ">
                  <p className="text-start">Your Surname</p>
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

                <div className="d-flex flex-row flex-column mb-4">
                  <p className="text-start">Your Email</p>
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

                <div className="d-flex flex-row flex-column mb-4">
                  <p className="text-start">Password</p>
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

                <div className="d-flex flex-row flex-column mb-4">
                  <p className="text-start">Repeat Your Password</p>
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
                  className="btn btn-primary btn-lg"
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
    </>
  );
}

export default Register;
