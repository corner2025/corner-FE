import React, { useMemo, useState } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import CardItem from "./sections/CardItem";
import { performances } from "../../data/performance";
import { usePagination } from "../../hooks/usePagination";
import { filterItems } from "../../utils/filterItems";
import type { Performance } from "../../types/performance";
import Pagination from "../../components/Pagination";

const PerformancePage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const filteredPerformances = useMemo(() => {
    return filterItems<Performance>(performances, {
      areaKey: "area",
      areaFilter,
      keyword,
      keywordFields: ["title", "place", "description", "genre"],
      startDateKey: "startDate",
      endDateKey: "endDate",
      startDateFilter,
      endDateFilter,
      today: new Date("2025-07-03T00:00:00"),
    });
  }, [areaFilter, keyword, startDateFilter, endDateFilter]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    pageRange,
  } = usePagination({
    items: filteredPerformances,
    itemsPerPage: 8,
    pageRangeDisplayed: 5,
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-8 animate-fade-in-down">
        🎤 지금 가장 핫한 공연은?
      </h1>

      {/* 필터 UI */}
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

      {/* 공연 리스트 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {paginatedItems.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500 mt-10">
            선택하신 조건에 해당하는 공연이 없습니다.
          </p>
        ) : (
          paginatedItems.map((performance) => (
            <CardItem performance={performance} key={performance.id} />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
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

export default PerformancePage;
