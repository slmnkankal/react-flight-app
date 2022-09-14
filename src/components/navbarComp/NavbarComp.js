import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../../App";
import HttpRequestService from "../../httpRequestService/HttpRequestService";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const NavbarComp = () => {
  const user = useContext(UserContext);
  console.log(user.userDetails);
  const userNameUpperCase = user.userDetails.username.toUpperCase();

  const logoutData = {
    key: user.key,
    user: user.userDetails,
  };

  let navigate = useNavigate();

  const handleLogout = async () => {
    const result = await HttpRequestService.logout(logoutData);
    console.log("result:", result);
    user.setToken("");
    user.setUserDetails("");
    user.setUserEmail("");

    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Flight Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <CgProfile size={"1.5em"} />
              <span>&ensp;</span>
              <a href="#login">{userNameUpperCase}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Nav className="mx-4">
            <BiLogOut size="1.5em" color="rgba(255, 255, 255, 0.5" className="mt-2" />
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;