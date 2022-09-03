import { createContext, useState } from "react";

export const FirebaseAuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <FirebaseAuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </FirebaseAuthContext.Provider>
  );
}

export default AuthContextProvider;
