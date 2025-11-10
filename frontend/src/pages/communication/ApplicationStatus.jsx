import React from "react";
import { ClipboardList, Clock, CheckCircle, XCircle } from "lucide-react";

const ApplicationStatus = () => {
  const applications = [
    {
      id: 1,
      campaign: "Flood Relief in Sindh",
      ngo: "Pakistan Red Crescent",
      status: "accepted",
      date: "Jan 15, 2025",
    },
    {
      id: 2,
      campaign: "Earthquake Recovery",
      ngo: "Al-Khidmat Foundation",
      status: "pending",
      date: "Jan 20, 2025",
    },
    {
      id: 3,
      campaign: "Winter Drive",
      ngo: "Edhi Foundation",
      status: "rejected",
      date: "Jan 10, 2025",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Accepted
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" /> Rejected
          </span>
        );
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2F2F2F] mb-8 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-[#F68B84]" />
          My Applications
        </h1>

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{app.campaign}</h3>
                  <p className="text-gray-600 mt-1">by {app.ngo}</p>
                  <p className="text-sm text-gray-400 mt-2">Applied on {app.date}</p>
                </div>
                <div>{getStatusBadge(app.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationStatus;