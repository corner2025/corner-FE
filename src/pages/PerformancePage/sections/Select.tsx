import React from "react";
import { areas } from "../../../data/area";

interface SelectProps {
  areaFilter: string; // 선택된 지역 필터
  setAreaFilter: React.Dispatch<React.SetStateAction<string>>; // 지역 필터 상태 업데이트 함수
}

const Select: React.FC<SelectProps> = ({ areaFilter, setAreaFilter }) => {
  return (
    <select
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={areaFilter}
      onChange={(e) => setAreaFilter(e.target.value)}
    >
      {areas.map((area) => (
        <option key={area} value={area}>
          {area === "전체" ? "전체 지역" : area}
        </option>
      ))}
    </select>
  );
};

export default Select;
