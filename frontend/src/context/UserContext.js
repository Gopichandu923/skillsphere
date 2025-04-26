import { createContext, useContext, useEffect, useState } from "react";
import { UserDetails } from "../api"; // Assuming you have an API setup

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("skillsphere-auth") || null
  );

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await UserDetails(token);
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
      localStorage.removeItem("skillsphere-auth");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("skillsphere-auth", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("skillsphere-auth");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, token, loading, login, logout, fetchUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
