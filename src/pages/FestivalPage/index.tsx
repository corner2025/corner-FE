import React, { useState } from "react";

// 축제 데이터 타입
type Festival = {
  id: number;
  name: string;
  region: string;
  description: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
  location: string;
  ticketLink?: string; // 선택적 속성
  organizer: string;
};

const FestivalPage: React.FC = () => {
  // 예시 축제 데이터
  const festivals: Festival[] = [
    {
      id: 1,
      name: "서울 불꽃 축제",
      region: "서울",
      description: "서울에서 열리는 대표적인 불꽃 축제",
      startDate: "2023-10-01",
      endDate: "2023-10-02",
      location: "여의도 한강공원",
      ticketLink: "https://example.com/tickets",
      organizer: "서울시",
    },
    {
      id: 2,
      name: "부산 국제 영화제",
      region: "부산",
      description: "세계적인 영화제가 열리는 부산",
      startDate: "2023-11-01",
      endDate: "2023-11-10",
      location: "부산 영화의 전당",
      organizer: "부산시",
    },
    // 추가 데이터...
  ];

  // 상태 관리
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // 필터링된 축제 데이터
  const filteredFestivals = festivals.filter((festival) => {
    const matchesRegion =
      regionFilter === "" || festival.region.includes(regionFilter);
    const matchesKeyword =
      keyword === "" ||
      festival.name.includes(keyword) ||
      festival.description.includes(keyword);
    const matchesStartDate =
      startDateFilter === "" ||
      new Date(festival.startDate) >= new Date(startDateFilter);
    const matchesEndDate =
      endDateFilter === "" ||
      new Date(festival.endDate) <= new Date(endDateFilter);
    return (
      matchesRegion && matchesKeyword && matchesStartDate && matchesEndDate
    );
  });

  // 페이징 처리
  const totalPages = Math.ceil(filteredFestivals.length / itemsPerPage);
  const paginatedFestivals = filteredFestivals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 상세보기 상태
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">한국 축제 정보</h1>

      {/* 필터링 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">전체 지역</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          {/* 추가 지역 옵션 */}
        </select>
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="키워드 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
        />
      </div>

      {/* 축제 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {paginatedFestivals.map((festival) => (
          <div
            key={festival.id}
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedFestival(festival)}
          >
            <h2 className="text-xl font-semibold">{festival.name}</h2>
            <p className="text-gray-600">{festival.region}</p>
            <p className="text-gray-500 text-sm">
              {festival.startDate} ~ {festival.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* 페이징 */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 축제 상세보기 */}
      {selectedFestival && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedFestival(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedFestival.name}</h2>
            <p className="text-gray-600 mb-2">{selectedFestival.description}</p>
            <p className="mb-2">
              <strong>일정:</strong> {selectedFestival.startDate} ~{" "}
              {selectedFestival.endDate}
            </p>
            <p className="mb-2">
              <strong>위치:</strong> {selectedFestival.location}
            </p>
            {selectedFestival.ticketLink && (
              <p className="mb-2">
                <strong>티켓:</strong>{" "}
                <a
                  href={selectedFestival.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  티켓 구매하기
                </a>
              </p>
            )}
            <p>
              <strong>주최:</strong> {selectedFestival.organizer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FestivalPage;
