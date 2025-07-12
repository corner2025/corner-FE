import React from "react";
import { useTranslation } from "react-i18next";

interface TouristFilterBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  areaOptions: string[];
}

const TouristFilterBar: React.FC<TouristFilterBarProps> = ({
  keyword,
  setKeyword,
  area,
  setArea,
  areaOptions,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
      <input
        type="text"
        placeholder={t("tour.filter.placeholder")}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/3 transition duration-300 ease-in-out"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-1/4 transition duration-300 ease-in-out"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      >
        <option value="">{t("tour.filter.option.all")}</option>
        {areaOptions.map((areaName) => (
          <option key={areaName} value={areaName}>
            {areaName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TouristFilterBar;
