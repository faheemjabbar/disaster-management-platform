import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, Share2, Heart, AlertCircle, CheckCircle, Phone, Mail, Globe } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../utils/apiEndpoints';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCampaignDetails();
    }
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      const data = await api.campaigns.getById(id);
      setCampaign(data);
      
      // Check if user already applied
      if (user && data.volunteers) {
        const userApplication = data.volunteers.find(
          v => v.volunteer?._id === user._id || v.volunteer === user._id
        );
        if (userApplication) {
          setIsApplied(true);
          setApplicationStatus(userApplication.status);
        }
      }
    } catch (err) {
      console.error("Failed to fetch campaign:", err);
      toast.error("Failed to load campaign details");
      setTimeout(() => navigate("/campaigns"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const urgencyColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleApply = () => {
    if (!user) {
      toast.error("Please login to apply");
      navigate("/");
      return;
    }
    if (user.userType !== "volunteer") {
      toast.error("Only volunteers can apply to campaigns");
      return;
    }
    if (campaign.volunteersJoined >= campaign.volunteersNeeded) {
      toast.error("This campaign is full");
      return;
    }
    setShowApplyModal(true);
  };

  const handleConfirmApply = async () => {
    try {
      setApplying(true);
      await api.campaigns.apply(id);
      setIsApplied(true);
      setApplicationStatus('pending');
      setShowApplyModal(false);
      toast.success("Application submitted successfully!");
      // Refresh campaign data
      fetchCampaignDetails();
    } catch (err) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h2>
          <button
            onClick={() => navigate("/campaigns")}
            className="bg-[#F68B84] text-white px-6 py-2 rounded-lg hover:bg-[#E27872]"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.round((campaign.volunteersJoined / campaign.volunteersNeeded) * 100);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF7E5] to-[#FFEFD0]">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={campaign.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200"} 
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
              <p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
            </div>

            {/* Categories */}
            {campaign.categories && campaign.categories.length > 0 && (
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
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Apply Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-[#F8D57E]">
                  <img 
                    src={campaign.ngo?.profileImage || "https://via.placeholder.com/100"} 
                    alt={campaign.ngo?.organizationName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900">
                  {campaign.ngo?.organizationName || campaign.ngo?.fullName}
                </h3>
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
                  disabled={campaign.volunteersJoined >= campaign.volunteersNeeded}
                  className={`w-full font-semibold py-3 rounded-lg mb-3 transition-all ${
                    campaign.volunteersJoined >= campaign.volunteersNeeded
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#F68B84] text-white hover:bg-[#E27872] hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {campaign.volunteersJoined >= campaign.volunteersNeeded ? 'Campaign Full' : 'Apply to Volunteer'}
                </button>
              ) : (
                <div className={`border-2 font-semibold py-3 rounded-lg text-center mb-3 flex items-center justify-center gap-2 ${
                  applicationStatus === 'approved' 
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : applicationStatus === 'rejected'
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-yellow-50 border-yellow-500 text-yellow-700'
                }`}>
                  <CheckCircle className="w-5 h-5" />
                  Application {applicationStatus || 'Pending'}
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
                  <span>{campaign.ngo?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-[#F68B84]" />
                  <span className="text-sm">{campaign.ngo?.email}</span>
                </div>
                {campaign.ngo?.website && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Globe className="w-5 h-5 text-[#F68B84]" />
                    <span className="text-sm">{campaign.ngo.website}</span>
                  </div>
                )}
              </div>
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
                disabled={applying}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmApply}
                disabled={applying}
                className="flex-1 bg-[#F68B84] text-white font-semibold py-2.5 rounded-lg hover:bg-[#E27872] transition-all disabled:opacity-50"
              >
                {applying ? 'Submitting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;