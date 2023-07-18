import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value, text }) => {
    
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color="#ffc107" />
      ))}

      {hasHalfStar &&
       <FaStarHalfAlt color="#ffc107" />
       }

      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={index + fullStars + 1} color="#c4c4c4" />
      ))}
      <span className="ms-2">{text && text}</span>
    </div>
  );
};

export default Rating;
