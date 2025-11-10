import React from "react";
import { TrendingUp, Users, Heart, Clock } from "lucide-react";
import { ProgressBar } from "../../components/ProgressBar";

const ImpactStats = () => {
  const stats = {
    totalHours: 120,
    campaignsJoined: 8,
    livesImpacted: 450,
    rating: 4.9,
  };

  const monthlyData = [
    { month: "Oct", hours: 15 },
    { month: "Nov", hours: 25 },
    { month: "Dec", hours: 30 },
    { month: "Jan", hours: 50 },
  ];

  const skillsProgress = [
    { skill: "Medical Aid", level: 85 },
    { skill: "Logistics", level: 70 },
    { skill: "Communication", level: 90 },
    { skill: "Team Leadership", level: 65 },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2F2F2F] mb-8 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-[#F68B84]" />
          Impact Dashboard
        </h1>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Clock className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalHours}</h3>
            <p className="text-gray-600">Total Hours</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Users className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.campaignsJoined}</h3>
            <p className="text-gray-600">Campaigns</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <Heart className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.livesImpacted}</h3>
            <p className="text-gray-600">Lives Impacted</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <TrendingUp className="w-8 h-8 text-[#F68B84] mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.rating}</h3>
            <p className="text-gray-600">Rating</p>
          </div>
        </div>

        {/* Monthly Activity Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Activity</h2>
          <div className="flex items-end justify-between gap-4 h-48">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-[#FFF7E5] rounded-t-lg relative flex items-end justify-center">
                  <div
                    className="w-full bg-gradient-to-t from-[#F68B84] to-[#F8D57E] rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.hours / 50) * 100}%` }}
                  >
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
                      {data.hours}h
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{data.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Development</h2>
          <div className="space-y-5">
            {skillsProgress.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">{skill.skill}</span>
                  <span className="text-[#E27872] font-bold">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} showLabel={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;