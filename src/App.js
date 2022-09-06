import "./App.css";
import AppRouter from "./components/appRouter/AppRouter";
import React, { createContext, useState } from "react";


export const UserContext = createContext();
export const UserNameContext = createContext();

function App() {
  const [token, setToken] = useState(null)
  const [username, setUserName] = useState(null)
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken, username, setUserName}}>
        <AppRouter />
      </UserContext.Provider>
    </div>
  );
}

export default App;
