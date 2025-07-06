import React from "react";
import { Link } from "react-router-dom";
import type { Festival } from "../../../types/festival";

interface CardItemProps {
  festival: Festival;
}

const CardItem: React.FC<CardItemProps> = ({ festival }) => {
  return (
    <div
      className="
    border-[1px] border-gray-300 rounded-md shadow-md p-3 m-2
    transform transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl hover:-translate-y-2
    cursor-pointer group relative
  "
    >
      <Link to={`/festival/${festival.id}`}>
        {" "}
        <div className="w-full h-48 overflow-hidden rounded-md mb-2">
          {" "}
          {/* 이미지 컨테이너 추가 */}
          <img
            src={festival.imgUrl}
            alt={festival.name || "image"}
            className="
            w-full h-full object-cover object-center
            transform transition-transform duration-500 ease-in-out
            group-hover:scale-110
          "
          />
        </div>
        <h2 className="text-xl font-semibold mt-2 truncate">{festival.name}</h2>{" "}
        <p className="text-gray-600 truncate">{festival.place}</p>{" "}
        <p className="text-gray-500 text-sm">
          {festival.startDate.toLocaleDateString()} ~{" "}
          {festival.endDate.toLocaleDateString()}
        </p>
      </Link>
    </div>
  );
};

export default CardItem;

//
