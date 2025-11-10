import React from "react";
import { Award, Download, Share2 } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Flood Relief Volunteer",
      organization: "Pakistan Red Crescent",
      date: "February 2025",
      hours: 40,
    },
    {
      id: 2,
      title: "Earthquake Response Team",
      organization: "Al-Khidmat Foundation",
      date: "January 2025",
      hours: 35,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2F2F2F] mb-8 flex items-center gap-3">
          <Award className="w-8 h-8 text-[#F68B84]" />
          My Certificates
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-4 border-[#F8D57E]"
            >
              <div className="text-center mb-4">
                <Award className="w-16 h-16 text-[#F68B84] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-900">{cert.title}</h3>
                <p className="text-gray-600 mt-2">{cert.organization}</p>
                <p className="text-sm text-gray-500 mt-1">{cert.date}</p>
                <p className="text-sm text-[#E27872] font-medium mt-2">{cert.hours} Hours Completed</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#F68B84] text-white rounded-lg hover:bg-[#E27872] transition">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#F68B84] text-[#E27872] rounded-lg hover:bg-[#FFF7E5] transition">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;