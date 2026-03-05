import { createContext, useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "./AuthContext";
import socket from "../socket";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const { user } = useContext(AuthContext);

  // Load initial unresolved count
  const loadUnresolved = async () => {
    try {
      const res = await API.get("/contact");
      const unresolved = res.data.filter(q => !q.resolved);
      setUnresolvedCount(unresolved.length);
    } catch (err) {
      console.error("Failed to load unresolved queries");
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    loadUnresolved();

    socket.on("newQuery", () => {
      setUnresolvedCount(prev => prev + 1);
    });

    return () => {
      socket.off("newQuery");
    };
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{ unresolvedCount, setUnresolvedCount, loadUnresolved }}
    >
      {children}
    </NotificationContext.Provider>
  );
}