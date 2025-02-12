import { createContext, useContext, useState } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function AuthContextPro({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setIsAuthenticated(true);
      setCurrentUser(FAKE_USER);
    }
  }
  function logout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextPro");
  }
  return context;
}

export { AuthContextPro, useAuthContext };
