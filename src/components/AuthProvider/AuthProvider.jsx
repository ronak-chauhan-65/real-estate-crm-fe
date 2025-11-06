import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../APICalls/authApi";
import { masterConfigAPI } from "../APICalls/masterConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [masterConfig, setMasterConfig] = useState({});
  const [loading, setLoading] = useState(true); // 🔹 for initial load state

  // ----------------------------
  // 🔹 Login + Call masterConfig API
  // ----------------------------
  const login = async (credentials) => {
    try {
      const res = await authApi.createAuth(credentials);
      if (!res.success) throw new Error(res?.message || "Login failed");

      const authToken = res?.data?.token;
      localStorage.setItem("token", `Bearer ${authToken}`);
      setToken(authToken);

      // Fetch master config after login
      await fetchMasterConfig();

      return true;
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    }
  };

  // ----------------------------
  // 🔹 Logout (clear everything)
  // ----------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setMasterConfig({});
  };

  // ----------------------------
  // 🔹 Fetch masterConfig (common function)
  // ----------------------------
  const fetchMasterConfig = async () => {
    try {
      const configResponse = await masterConfigAPI.getMasterConfig();
      console.log(configResponse, "configResponse");

      if (configResponse?.success || configResponse?.data) {
        setMasterConfig((prev) => ({
          ...prev,
          ...configResponse?.data?.data,
        }));
      }
    } catch (err) {
      console.error("MasterConfig fetch failed:", err);
    }
  };

  // ----------------------------
  // 🔹 Auto-load masterConfig if token already exists
  // ----------------------------
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      setToken(existingToken);
      fetchMasterConfig().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-info">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        masterConfig,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
