// src/pages/관광지폴더/sections/TouristCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { TouristSpot } from "../../../types/tourist";
// import { areaCodes } from "../../../types/tourist";

type TouristCardProps = {
  spot: TouristSpot;
};

const TouristCard: React.FC<TouristCardProps> = ({ spot }) => {
  return (
    <Link to={`/tourist/${spot.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden">
        <img
          src={spot.firstimage || spot.firstimage2 || "image"}
          alt="No Image Available"
          className="w-full h-48 object-cover object-center transform hover:scale-105 transition duration-500 ease-in-out"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">
            {spot.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 font-semibold">
            {spot.areaName}
          </p>
          <p className="text-gray-700 text-base line-clamp-3">
            {spot.overview}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full mr-2">
              {spot.cat2Name}
            </span>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full">
              {spot.cat3Name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TouristCard;
