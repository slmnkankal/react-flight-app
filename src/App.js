import React, { createContext, useState } from "react";
import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [userEmail, setUserEmail] = useState("");
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          token,
          setToken,
          userDetails,
          setUserDetails,
          userEmail,
          setUserEmail,
        }}
      >
        <AppRouter />
      </UserContext.Provider>
    </div>
  );
}

export default App;
