import { useState } from "react";

const SESSION_KEY = "amparo-crm-auth";
const CRM_PASSWORD = import.meta.env.VITE_CRM_PASSWORD;

export const useCrmAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );

  const login = (password) => {
    if (!CRM_PASSWORD || password !== CRM_PASSWORD) return false;
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
