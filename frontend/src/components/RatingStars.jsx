import React, { useState } from "react";
import { Star } from "lucide-react";

const RatingStars = ({
  rating = 0,
  totalStars = 5,
  size = "md",
  interactive = false,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = interactive
          ? index < (hoverRating || rating)
          : index < rating;

        return (
          <Star
            key={index}
            className={`${sizes[size]} ${
              isFilled ? "fill-[#F8D57E] text-[#F8D57E]" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110" : ""} transition-all`}
            onMouseEnter={() => interactive && setHoverRating(index + 1)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;