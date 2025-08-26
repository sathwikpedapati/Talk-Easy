import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id }
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => setOnlineUsers(userIds));
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const login = async (type, credentials) => {
    try {
      let data;
      if (type === "google") {
        data = await axios.post("/api/auth/google-login", credentials);
      } else {
        data = await axios.post(`/api/auth/${type}`, credentials);
      }

      if (data.data.success) {
        setAuthUser(data.data.userData);
        connectSocket(data.data.userData);
        axios.defaults.headers.common["token"] = data.data.token;
        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
        toast.success(data.data.message || "Logged in successfully!");
      } else {
        toast.error(data.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out");
    socket?.disconnect();
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) axios.defaults.headers.common["token"] = token;
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
        setAuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
