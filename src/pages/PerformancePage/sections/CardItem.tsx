import React from "react";
import { Link } from "react-router-dom";

type Performance = {
  id: number; // 고유 ID
  title: string; // 공연 제목
  place: string; // 공연 장소
  area?: string; // 지역 (선택적 속성)
  genre: string; // 장르
  startDate: Date; // 시작 날짜 (Date 객체로 변경)
  endDate: Date; // 종료 날짜 (Date 객체로 변경)
  imgUrl?: string; // 이미지 URL (선택적 속성, camelCase로 변경)
  description?: string; // 설명 (선택적 속성)
};

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
            src={performance.imgUrl}
            alt={performance.title || "image"}
            className="
            w-full h-full object-cover object-center
            transform transition-transform duration-500 ease-in-out
            group-hover:scale-110
          "
          />
        </div>
        <h2 className="text-xl font-semibold mt-2 truncate">
          {performance.title}
        </h2>{" "}
        <p className="text-gray-600 truncate">{performance.place}</p>{" "}
        <p className="text-gray-500 text-sm">
          {performance.startDate.toLocaleDateString()} ~{" "}
          {performance.endDate.toLocaleDateString()}
        </p>
      </Link>
    </div>
  );
};

export default CardItem;

//
