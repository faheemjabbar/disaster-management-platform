import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // persist simple auth (dev only)
  useEffect(() => {
    const raw = localStorage.getItem("revive_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (userPayload) => {
    setUser(userPayload);
    localStorage.setItem("revive_user", JSON.stringify(userPayload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("revive_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
