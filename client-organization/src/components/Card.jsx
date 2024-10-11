// src/components/Card.jsx
import React from 'react';

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Image */}
      <img src={imageUrl} alt={title} className="w-1/3 object-cover" />

      {/* Card Content */}
      <div className="p-4 w-2/3">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
