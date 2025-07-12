import React, { useState } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import { useTranslation } from "react-i18next";

const FestivalPage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow">
        {t("festival.title")}
      </h1>

      {/* 필터링 */}
      <div className="grid grid-cols-2 md:flex flex-wrap gap-4 mb-10">
        <Select areaFilter={areaFilter} setAreaFilter={setAreaFilter} />
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        <DateInput
          dateFilter={startDateFilter}
          setDateFilter={setStartDateFilter}
        />
        <DateInput
          dateFilter={endDateFilter}
          setDateFilter={setEndDateFilter}
        />
      </div>

      {/* 축제 리스트 */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {paginatedItems.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500 mt-10">
            {t("festival.error")}
          </p>
        ) : (
          paginatedItems.map((festival) => (
            <CardItem festival={festival} key={festival.id} />
          ))
        )}
      </div> */}
    </div>
  );
};

export default FestivalPage;
