import React from "react";
import { Calendar, MapPin, Clock, Award } from "lucide-react";

const ActivityHistory = () => {
  const activities = [
    {
      id: 1,
      campaign: "Flood Relief in Sindh",
      ngo: "Pakistan Red Crescent",
      role: "Medical Aid",
      hours: 40,
      date: "Jan 2025",
      location: "Dadu, Sindh",
      status: "completed",
    },
    {
      id: 2,
      campaign: "Earthquake Recovery",
      ngo: "Al-Khidmat Foundation",
      role: "Logistics",
      hours: 35,
      date: "Dec 2024",
      location: "Mirpur, AJK",
      status: "completed",
    },
    {
      id: 3,
      campaign: "Winter Drive",
      ngo: "Edhi Foundation",
      role: "Distribution",
      hours: 20,
      date: "Ongoing",
      location: "Quetta, Balochistan",
      status: "active",
    },
  ];

  const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);
  const completedCampaigns = activities.filter((a) => a.status === "completed").length;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2F2F2F] mb-8">Activity History</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Clock className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{totalHours}</h3>
            <p className="text-gray-600">Total Hours</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Award className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{completedCampaigns}</h3>
            <p className="text-gray-600">Completed Campaigns</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <MapPin className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{activities.length}</h3>
            <p className="text-gray-600">Total Activities</p>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{activity.campaign}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {activity.status === "completed" ? "Completed" : "Active"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {activity.ngo} · {activity.role}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#F68B84]" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F68B84]" />
                      {activity.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F68B84]" />
                      {activity.hours} hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityHistory;
