import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // usuario logueado
    if (token) {
      api.get("/user")
        .then((response) => setUser(response.data.user))
        .catch(() => logout());
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;
    console.log(response)
    localStorage.setItem("token", token);
    const profile = await api.get("/user");
    setUser(profile.data);
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider