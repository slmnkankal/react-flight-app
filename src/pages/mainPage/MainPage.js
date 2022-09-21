import FlightsTable from "../../components/flightsTable/FlightsTable";
import NavbarComp from "../../components/navbarComp/NavbarComp";
import ReservationTable from "../../components/reservationTable/ReservationTable";

function MainPage() {
  return (
    <>
      <NavbarComp />
      <FlightsTable />
      {/* <ReservationTable /> */}
    </>
  );
}

export default MainPage;
