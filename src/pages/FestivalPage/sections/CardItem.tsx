import React from "react";
import { useNavigate } from "react-router-dom";  // react-router-dom에서 useNavigate 임포트
import type { Festival } from "../../../types/festival";
import { formatDate } from "../../../utils/dateUtil";

interface CardItemProps {
  festival: Festival;
}

const CardItem: React.FC<CardItemProps> = ({ festival }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/festival/${festival.id}`);  // 상세 페이지 경로로 이동
  };

  return (
    <div
      className="p-3 rounded-[22.375px] transition relative cursor-pointer"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      onClick={onClick}
    >
      <img
        src={festival.firstImage}
        alt={festival.title}
        className="w-full h-48 object-cover rounded-[22.375px] mb-2"
      />
      <h2 className="text-xl font-semibold">{festival.title}</h2>
      <p className="text-gray-600">{festival.addr1}</p>

      <p className="text-sm text-gray-500 absolute bottom-3 left-2 bg-white bg-opacity-80 px-2 rounded">
        {formatDate(festival.eventStartDate)} ~ {formatDate(festival.eventEndDate)}
      </p>
    </div>
  );
};

export default CardItem;
