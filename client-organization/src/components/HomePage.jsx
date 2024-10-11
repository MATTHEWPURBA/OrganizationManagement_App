// src/components/HomePage.jsx
import React from 'react';
import Card from './Card';

// Example data for the cards
const cardData = [
  {
    title: 'Beautiful Beach',
    description: 'This is a beautiful beach with clear blue water.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  },
  {
    title: 'Mountain Adventure',
    description: 'Enjoy the thrill of hiking the world’s highest mountains.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    title: 'City Life',
    description: 'Experience the fast-paced life in the city.',
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">
          Welcome to Our Website
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
