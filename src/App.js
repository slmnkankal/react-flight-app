import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";
import React, { createContext, useState } from "react";


export const UserContext = createContext();

function App() {
  const [token, setToken] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken, userDetails, setUserDetails}}>
        <AppRouter />
      </UserContext.Provider>
    </div>
  );
}

export default App;
