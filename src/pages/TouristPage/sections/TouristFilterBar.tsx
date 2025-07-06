import React from "react";
import { areaCodes } from "../../../types/tourist";

type TouristFilterBarProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  areaCode: string;
  setAreaCode: (value: string) => void;
  onFilterChange: () => void;
};

const TouristFilterBar: React.FC<TouristFilterBarProps> = ({
  keyword,
  setKeyword,
  areaCode,
  setAreaCode,
  onFilterChange,
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
      <input
        type="text"
        placeholder="관광지 이름, 주소, 설명 검색..."
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/3 transition duration-300 ease-in-out"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          onFilterChange();
        }}
      />
      <select
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/4 transition duration-300 ease-in-out"
        value={areaCode}
        onChange={(e) => {
          setAreaCode(e.target.value);
          onFilterChange();
        }}
      >
        <option value="전체">지역 전체</option>
        {areaCodes.map((area) => (
          <option key={area.code} value={area.code}>
            {area.name}
          </option>
        ))}
      </select>
      {/* 필요하면 카테고리1,2,3 셀렉트도 아래에 추가 가능 */}
    </div>
  );
};

export default TouristFilterBar;
