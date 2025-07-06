import React, { useState, useMemo } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import CardItem from "./sections/CardItem";
import type { Festival } from "../../types/festival";
import { festivals } from "../../data/festival";
import { usePagination } from "../../hooks/usePagination";
import { filterItems } from "../../utils/filterItems";
import Pagination from "../../components/Pagination";

const FestivalPage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const filteredFestivals = useMemo(() => {
    return filterItems<Festival>(festivals, {
      areaKey: "area",
      areaFilter,
      keyword,
      keywordFields: ["name", "place", "description"],
      startDateKey: "startDate",
      endDateKey: "endDate",
      startDateFilter,
      endDateFilter,
      today: new Date("2025-07-02T00:00:00"),
    });
  }, [areaFilter, keyword, startDateFilter, endDateFilter]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    pageRange,
  } = usePagination({
    items: filteredFestivals,
    itemsPerPage: 8,
    pageRangeDisplayed: 5,
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow">
        지금 가장 핫한 축제는?
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {paginatedItems.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500 mt-10">
            선택하신 조건에 해당하는 축제가 없습니다.
          </p>
        ) : (
          paginatedItems.map((festival) => (
            <CardItem festival={festival} key={festival.id} />
          ))
        )}
      </div>

      {/* 페이징 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageRange={pageRange}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FestivalPage;
