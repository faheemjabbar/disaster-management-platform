import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

const MapView = ({ campaigns = [] }) => {
  useEffect(() => {
    // Initialize map
    const map = L.map("revive-map", {
      center: [30.3753, 69.3451], // Pakistan center
      zoom: 5,
      scrollWheelZoom: true,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Custom pastel marker icon
    const markerIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center bg-[#F68B84] text-white rounded-full w-6 h-6 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v10" />
          </svg>
        </div>`,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add markers
    campaigns.forEach((c) => {
      if (c.coordinates) {
        const marker = L.marker(
          [c.coordinates.lat, c.coordinates.lng],
          { icon: markerIcon }
        ).addTo(map);

        // Popup content
        const popupContent = `
          <div class="p-2 rounded-lg text-center w-48">
            <img src="${c.image}" alt="${c.title}" class="w-full h-24 object-cover rounded-lg mb-2" />
            <h3 class="font-semibold text-gray-800 text-sm">${c.title}</h3>
            <p class="text-xs text-gray-600 mb-1">${c.location}</p>
            <p class="text-xs font-medium text-[#E27872]">${c.urgency.toUpperCase()} URGENCY</p>
          </div>
        `;
        marker.bindPopup(popupContent);
      }
    });

    // Cleanup on unmount
    return () => map.remove();
  }, [campaigns]);

  return (
    <div
      id="revive-map"
      className="w-full h-[70vh] rounded-xl shadow-md border border-gray-200"
    >
      {/* fallback if JS disabled */}
      <div className="text-center text-gray-600 pt-40">
        <MapPin className="inline-block w-6 h-6 mb-2" />
        <p>Loading map...</p>
      </div>
    </div>
  );
};

export default MapView;
