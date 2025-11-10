import React, { useState } from 'react';
import { MapPin, Calendar, Users, Clock, Share2, Heart, AlertCircle, CheckCircle, Phone, Mail, Globe } from 'lucide-react';

const CampaignDetails = () => {
  const [isApplied, setIsApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Sample campaign data
  const campaign = {
    id: 1,
    title: "Emergency Flood Relief in Sindh",
    ngoName: "Pakistan Red Crescent",
    ngoLogo: "https://via.placeholder.com/100",
    location: "Dadu, Sindh, Pakistan",
    coordinates: { lat: 26.7312, lng: 67.7829 },
    disasterType: "Flood",
    urgency: "critical",
    volunteersNeeded: 50,
    volunteersJoined: 32,
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    description: "Severe flooding has displaced thousands of families in Dadu district. We urgently need volunteers to help distribute food, water, medical supplies, and set up temporary shelters.",
    detailedDescription: `The recent monsoon rains have caused devastating floods affecting over 50,000 people. Many families have lost their homes and urgently need assistance. 

Our relief operations include:
• Setting up temporary shelters
• Distributing food packets and clean water
• Providing emergency medical care
• Supporting children and elderly evacuees
• Coordinating with local authorities

We need dedicated volunteers who can commit to at least 2 weeks of service. Training will be provided on-site.`,
    categories: ["Medical Aid", "Food Distribution", "Shelter Setup", "Child Care"],
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200",
    requirements: [
      "Age 18+ (exceptions for accompanied minors)",
      "Good physical health",
      "Willingness to work in challenging conditions",
      "Team player with compassionate attitude"
    ],
    skillsNeeded: [
      "Medical professionals (doctors, nurses, paramedics)",
      "Engineers (civil, electrical)",
      "Logistics and supply chain coordinators",
      "Social workers and counselors",
      "General volunteers for distribution"
    ],
    contact: {
      phone: "+92 300 1234567",
      email: "relief@redcrescent.pk",
      website: "www.redcrescent.pk"
    },
    timeline: [
      { date: "Week 1", task: "Emergency food & water distribution" },
      { date: "Week 2-3", task: "Medical camps and shelter setup" },
      { date: "Week 4-6", task: "Rehabilitation and recovery support" }
    ]
  };

  const urgencyColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const progress = Math.round((campaign.volunteersJoined / campaign.volunteersNeeded) * 100);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleApply = () => {
    setShowApplyModal(true);
  };

  const handleConfirmApply = () => {
    setIsApplied(true);
    setShowApplyModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF7E5] to-[#FFEFD0]">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Urgency Badge */}
        <div className={`absolute top-6 right-6 px-4 py-2 rounded-full ${urgencyColors[campaign.urgency]} text-white text-sm font-bold shadow-lg flex items-center gap-2`}>
          <Clock className="w-4 h-4" />
          {campaign.urgency.toUpperCase()} URGENCY
        </div>

        {/* Title & Location */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                {campaign.disasterType}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{campaign.title}</h1>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{campaign.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 text-[#F68B84] mx-auto mb-2" />
                <p className="text-xs text-gray-600">Start Date</p>
                <p className="font-bold text-gray-900">{formatDate(campaign.startDate)}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-6 h-6 text-[#F68B84] mx-auto mb-2" />
                <p className="text-xs text-gray-600">End Date</p>
                <p className="font-bold text-gray-900">{formatDate(campaign.endDate)}</p>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 text-[#F68B84] mx-auto mb-2" />
                <p className="text-xs text-gray-600">Volunteers</p>
                <p className="font-bold text-gray-900">{campaign.volunteersJoined}/{campaign.volunteersNeeded}</p>
              </div>
              <div className="text-center">
                <AlertCircle className="w-6 h-6 text-[#F68B84] mx-auto mb-2" />
                <p className="text-xs text-gray-600">Progress</p>
                <p className="font-bold text-[#E27872]">{progress}%</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Campaign</h2>
              <p className="text-gray-700 mb-4">{campaign.description}</p>
              <div className="whitespace-pre-line text-gray-700">{campaign.detailedDescription}</div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {campaign.categories.map((cat, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-[#FFF7E5] text-[#E27872] rounded-lg font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {campaign.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Needed */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills Needed</h2>
              <ul className="space-y-2">
                {campaign.skillsNeeded.map((skill, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#F68B84] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Timeline</h2>
              <div className="space-y-4">
                {campaign.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#F68B84] rounded-full" />
                      {i < campaign.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-bold text-[#E27872]">{item.date}</p>
                      <p className="text-gray-700">{item.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Apply Card */}
            <div className="bg-white rounded-xl shadow-md p-6 top-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-[#F8D57E]">
                  <img src={campaign.ngoLogo} alt={campaign.ngoName} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">{campaign.ngoName}</h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Volunteers</span>
                  <span className="font-bold text-[#E27872]">{progress}% filled</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-[#F8D57E] to-[#F68B84] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {campaign.volunteersNeeded - campaign.volunteersJoined} spots remaining
                </p>
              </div>

              {/* Apply Button */}
              {!isApplied ? (
                <button 
                  onClick={handleApply}
                  className="w-full bg-[#F68B84] text-white font-semibold py-3 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-3"
                >
                  Apply to Volunteer
                </button>
              ) : (
                <div className="bg-green-50 border-2 border-green-500 text-green-700 font-semibold py-3 rounded-lg text-center mb-3 flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Application Submitted
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 border border-[#F68B84] text-[#E27872] font-semibold py-2 rounded-lg hover:bg-[#FFF7E5] transition-all flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 border border-[#F68B84] text-[#E27872] font-semibold py-2 rounded-lg hover:bg-[#FFF7E5] transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-[#F68B84]" />
                  <span>{campaign.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-[#F68B84]" />
                  <span className="text-sm">{campaign.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-[#F68B84]" />
                  <span className="text-sm">{campaign.contact.website}</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Location</h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">{campaign.location}</p>
            </div>

          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Application</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to apply for <strong>{campaign.title}</strong>? 
              The NGO will review your application and contact you within 48 hours.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowApplyModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmApply}
                className="flex-1 bg-[#F68B84] text-white font-semibold py-2.5 rounded-lg hover:bg-[#E27872] transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;