import React from "react";
import { UserPlus, Search, Users, Award } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12" />,
      title: "Sign Up",
      desc: "Create your account as a volunteer or NGO in minutes.",
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Find Campaigns",
      desc: "Browse active relief campaigns in your area or field of interest.",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Get Involved",
      desc: "Apply to campaigns and coordinate with NGOs for relief operations.",
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Make Impact",
      desc: "Track your contributions and earn certificates for your volunteer work.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#2F2F2F] mb-4">How Revive Works</h1>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Connecting volunteers with disaster relief efforts in 4 simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                <div className="w-20 h-20 bg-[#FFF7E5] rounded-full flex items-center justify-center text-[#F68B84] mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#F8D57E]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;