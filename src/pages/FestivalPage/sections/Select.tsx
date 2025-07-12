import React from "react";
import { areaCodes } from "../../../types/tourist";
import { useTranslation } from "react-i18next";

interface SelectProps {
  areaFilter: string; // 선택된 지역 필터
  setAreaFilter: React.Dispatch<React.SetStateAction<string>>; // 지역 필터 상태 업데이트 함수
}

const Select: React.FC<SelectProps> = ({ areaFilter, setAreaFilter }) => {
  const { t } = useTranslation();

  return (
    <select
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={areaFilter}
      onChange={(e) => setAreaFilter(e.target.value)}
    >
      {areaCodes.map((areaCode) => (
        <option key={areaCode.code} value={t(`area.${areaCode.code}`)}>
          {t(`area.${areaCode.code}`) === "all"
            ? "전체 지역"
            : t(`area.${areaCode.code}`)}
        </option>
      ))}
    </select>
  );
};

export default Select;
