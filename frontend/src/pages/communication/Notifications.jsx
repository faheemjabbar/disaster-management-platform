import React, { useState } from "react";
import { Bell, Check, Trash2, AlertCircle, Info, CheckCircle } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Application Accepted",
      message: "Your application for Flood Relief campaign has been accepted!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "New Campaign Available",
      message: "Earthquake Recovery Support needs volunteers in your area.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Campaign Starting Soon",
      message: "Your campaign starts tomorrow. Please review details.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#2F2F2F] flex items-center gap-3">
            <Bell className="w-8 h-8 text-[#F68B84]" />
            Notifications
          </h1>
          <button
            onClick={markAllAsRead}
            className="text-[#E27872] hover:underline text-sm font-medium"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${
                notif.read ? "border-gray-300" : "border-[#F68B84]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{notif.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                  <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                </div>
                <div className="flex gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="p-2 hover:bg-green-50 rounded-lg transition"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notifications;