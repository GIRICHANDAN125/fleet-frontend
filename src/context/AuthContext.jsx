import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("fleet_auth");
    return stored ? JSON.parse(stored) : { user: null, token: null };
  });

  const login = (data) => {
    const newAuth = { user: data.user, token: data.token };
    setAuth(newAuth);
    localStorage.setItem("fleet_auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("fleet_auth");
  };

  return (
    <AuthContext.Provider
      value={{ user: auth.user, token: auth.token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
