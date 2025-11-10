import React from "react";
import { Flame, Waves, Wind, AlertTriangle, Droplets, CloudRain, TreePine, Mountain } from "lucide-react";

const categories = [
  { name: "Flood", icon: <CloudRain className="w-6 h-6" />, color: "from-[#A3D9FF] to-[#C9F1FF]" },
  { name: "Earthquake", icon: <Mountain className="w-6 h-6" />, color: "from-[#FFD6A5] to-[#FFF1D6]" },
  { name: "Wildfire", icon: <Flame className="w-6 h-6" />, color: "from-[#FFB5A7] to-[#FFD6C0]" },
  { name: "Drought", icon: <Droplets className="w-6 h-6" />, color: "from-[#F8D57E] to-[#FFF7E5]" },
  { name: "Cyclone", icon: <Wind className="w-6 h-6" />, color: "from-[#BDE0FE] to-[#E8F4FF]" },
  { name: "Landslide", icon: <AlertTriangle className="w-6 h-6" />, color: "from-[#F6A6A1] to-[#FFEFD0]" },
  { name: "Tsunami", icon: <Waves className="w-6 h-6" />, color: "from-[#B0F2C2] to-[#E6FFE7]" },
  { name: "Forest Recovery", icon: <TreePine className="w-6 h-6" />, color: "from-[#C3F0CA] to-[#E9FBEF]" },
];

const CategoryBrowse = ({ onSelectCategory, selectedCategory }) => {
  return (
    <section className="py-12 px-6 bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0]">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2F2F2F] mb-3">Browse by Category</h2>
        <p className="text-gray-600">
          Choose a disaster type to explore active campaigns and relief opportunities.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory && onSelectCategory(cat.name)}
            className={`
              bg-gradient-to-br ${cat.color} 
              p-6 rounded-2xl cursor-pointer shadow-md 
              hover:shadow-lg hover:scale-[1.05] transition-all duration-300 
              flex flex-col items-center justify-center gap-3
              ${selectedCategory === cat.name ? "ring-4 ring-[#F68B84]" : ""}
            `}
          >
            <div className="text-[#E27872]">{cat.icon}</div>
            <p className="text-lg font-semibold text-gray-800">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowse;
