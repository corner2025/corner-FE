import React from "react";
import { Link } from "react-router-dom";
import type { Performance } from "../../../types/performance";

interface CardItemProps {
  performance: Performance;
}

const CardItem: React.FC<CardItemProps> = ({ performance }) => {
  return (
    <div
      className="p-3 rounded-[22.375px] transition relative cursor-pointer"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <Link to={`/performance/${performance.id}`}>
        {" "}
        <div className="w-full h-48 overflow-hidden rounded-md mb-2">
          {" "}
          <img
            src={performance.posterUrl}
            alt="No Image Available"
            className="
            w-full h-full object-cover object-center
            transform transition-transform duration-500 ease-in-out
            group-hover:scale-110
          "
          />
        </div>
        <h2 className="text-xl font-semibold mt-2 truncate">
          {performance.name}
        </h2>{" "}
        <p className="text-gray-600 truncate">{performance.area}</p>{" "}
        <p className="text-gray-500 text-sm">
          {performance.startDate} ~ {performance.endDate}
        </p>
      </Link>
    </div>
  );
};

export default CardItem;

//
