import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";
// import LoginPage from "./pages/loginPage/LoginPage";
// import Register from "./pages/register/Register";
import { useContext } from "react";
import { GlobalContext } from "./utils/GlobalContext.js";

function App() {
  let token = useContext(GlobalContext);

  return (
    <div className="App">
      {/* <h2>React Flight App</h2> */}
      {/* <LoginPage /> */}
      {/* <Register /> */}
      <GlobalContext.Provider value={token} />
      <AppRouter />
      <GlobalContext.Provider />

      {/* TODO
      1. Create login page. login and register
      2. Router structure
      3. Main page all flights
      4. User's own flights 
       */}
    </div>
  );
}

export default App;
