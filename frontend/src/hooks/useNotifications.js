import { useState, useEffect } from "react";
import { api } from "../utils/apiEndpoints";

export const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const data = await api.notifications.getAll();
      setUnreadCount(data.unreadCount || 0);
    } catch {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { unreadCount, refreshNotifications: fetchUnreadCount };
};
