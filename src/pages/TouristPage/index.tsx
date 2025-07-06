import React from "react";
import { touristSpots } from "../../data/tourist";
import { useTouristSpotFilter } from "../../hooks/useTouristFilter";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import TouristCard from "./sections/TouristCard";
import TouristFilterBar from "./sections/TouristFilterBar";

const ITEMS_PER_PAGE = 6;

const TouristPage: React.FC = () => {
  const { filteredSpots, areaCode, setAreaCode, keyword, setKeyword } =
    useTouristSpotFilter(touristSpots);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    pageRange,
  } = usePagination({
    items: filteredSpots,
    itemsPerPage: ITEMS_PER_PAGE,
    pageRangeDisplayed: 5,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className=" text-3xl sm:text-4xl font-extrabold text-center  text-gray-800 mb-10 tracking-tight animate-fade-in-down bg-clip-text drop-shadow">
        여기가 바로 인생샷 명소!
      </h1>

      {/* 검색 및 필터링 섹션 */}
      <TouristFilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        areaCode={areaCode}
        setAreaCode={setAreaCode}
        onFilterChange={() => handlePageChange(1)}
      />

      {/* 관광지 리스트 */}
      {paginatedItems.length === 0 ? (
        <div className="flex flex-col items-center h-screen">
          <p className="text-center text-xl text-gray-600 mt-10">
            검색 결과가 없습니다. 다른 키워드나 지역을 선택해보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {paginatedItems.map((spot) => (
            <TouristCard spot={spot} key={spot.id} />
          ))}
        </div>
      )}

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

export default TouristPage;
