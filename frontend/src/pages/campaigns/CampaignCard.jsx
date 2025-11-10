import React from "react";
import { MapPin, Calendar, Users, AlertCircle, Clock } from "lucide-react";

const CampaignCard = ({ campaign, onClick }) => {
  const {
    id,
    title,
    ngoName,
    location,
    disasterType,
    urgency = "medium",
    volunteersNeeded,
    volunteersJoined,
    startDate,
    endDate,
    image,
    description,
    categories = [],
  } = campaign;

  // Calculate progress percentage
  const progress =
    volunteersNeeded > 0
      ? Math.round((volunteersJoined / volunteersNeeded) * 100)
      : 0;

  // Urgency color mapping
  const urgencyColors = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-gray-900",
    low: "bg-green-500 text-white",
  };

  const urgencyBorderColors = {
    critical: "border-red-500",
    high: "border-orange-500",
    medium: "border-yellow-500",
    low: "border-green-500",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={() => onClick && onClick(id)}
      className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl border-l-4 ${urgencyBorderColors[urgency]} transition-all duration-300 cursor-pointer group hover:scale-[1.02]`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F8D57E] to-[#F6A6A1]">
            <AlertCircle className="w-16 h-16 text-white/50" />
          </div>
        )}

        {/* Urgency Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${urgencyColors[urgency]} shadow-lg flex items-center gap-1`}
        >
          <Clock className="w-3 h-3" />
          {urgency.toUpperCase()}
        </div>

        {/* Disaster Type Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
          {disasterType}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#E27872] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">by {ngoName}</p>

        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-[#FFF7E5] text-[#E27872] rounded-full text-xs font-medium"
              >
                {cat}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{categories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Location + Dates */}
        <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F68B84]" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F68B84]" />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-4 h-4 text-[#F68B84]" />
              <span className="font-semibold">
                {volunteersJoined}/{volunteersNeeded}
              </span>
              <span className="text-gray-500">volunteers</span>
            </div>
            <span className="text-[#E27872] font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F8D57E] to-[#F68B84] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-3 bg-[#F68B84] text-white font-semibold py-2.5 rounded-lg hover:bg-[#E27872] transition-all duration-200 flex items-center justify-center gap-2">
          View Details
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
