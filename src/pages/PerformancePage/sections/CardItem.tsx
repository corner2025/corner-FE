import React from "react";
import { Link } from "react-router-dom";
import type { Performance } from "../../../types/performance";

interface CardItemProps {
  performance: Performance;
}

const CardItem: React.FC<CardItemProps> = ({ performance }) => {
  return (
    <div
      className="
  border-[1px] border-gray-300 rounded-md shadow-md p-3 m-2
  transform transition-all duration-300 ease-in-out
  hover:scale-105 hover:shadow-xl hover:-translate-y-2
  cursor-pointer group relative
"
    >
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
