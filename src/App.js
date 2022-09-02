import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";
// import LoginPage from "./pages/loginPage/LoginPage";
// import Register from "./pages/register/Register";
import AuthContextProvider from "./utils/GlobalContext";

function App() {
  return (
    <div className="App">
      {/* <h2>React Flight App</h2> */}
      {/* <LoginPage /> */}
      {/* <Register /> */}
      <AuthContextProvider.Provider />
      <AppRouter />
      <AuthContextProvider.Provider />

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
