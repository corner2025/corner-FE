import React, { useState } from "react";

// 공연 데이터 타입
type Performance = {
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

const PerformPage: React.FC = () => {
  // 예시 공연 데이터
  const performances: Performance[] = [
    {
      id: 1,
      name: "뮤지컬 캣츠",
      region: "서울",
      description: "세계적으로 사랑받는 뮤지컬 캣츠",
      startDate: "2023-10-01",
      endDate: "2023-10-15",
      location: "예술의 전당",
      ticketLink: "https://example.com/tickets",
      organizer: "서울시 문화재단",
    },
    {
      id: 2,
      name: "부산 클래식 콘서트",
      region: "부산",
      description: "부산에서 열리는 클래식 음악 콘서트",
      startDate: "2023-11-01",
      endDate: "2023-11-05",
      location: "부산 문화회관",
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

  // 필터링된 공연 데이터
  const filteredPerformances = performances.filter((performance) => {
    const matchesRegion =
      regionFilter === "" || performance.region.includes(regionFilter);
    const matchesKeyword =
      keyword === "" ||
      performance.name.includes(keyword) ||
      performance.description.includes(keyword);
    const matchesStartDate =
      startDateFilter === "" ||
      new Date(performance.startDate) >= new Date(startDateFilter);
    const matchesEndDate =
      endDateFilter === "" ||
      new Date(performance.endDate) <= new Date(endDateFilter);
    return (
      matchesRegion && matchesKeyword && matchesStartDate && matchesEndDate
    );
  });

  // 페이징 처리
  const totalPages = Math.ceil(filteredPerformances.length / itemsPerPage);
  const paginatedPerformances = filteredPerformances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 상세보기 상태
  const [selectedPerformance, setSelectedPerformance] =
    useState<Performance | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">한국 공연 정보</h1>

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

      {/* 공연 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {paginatedPerformances.map((performance) => (
          <div
            key={performance.id}
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedPerformance(performance)}
          >
            <h2 className="text-xl font-semibold">{performance.name}</h2>
            <p className="text-gray-600">{performance.region}</p>
            <p className="text-gray-500 text-sm">
              {performance.startDate} ~ {performance.endDate}
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

      {/* 공연 상세보기 */}
      {selectedPerformance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedPerformance(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedPerformance.name}
            </h2>
            <p className="text-gray-600 mb-2">
              {selectedPerformance.description}
            </p>
            <p className="mb-2">
              <strong>일정:</strong> {selectedPerformance.startDate} ~{" "}
              {selectedPerformance.endDate}
            </p>
            <p className="mb-2">
              <strong>위치:</strong> {selectedPerformance.location}
            </p>
            {selectedPerformance.ticketLink && (
              <p className="mb-2">
                <strong>티켓:</strong>{" "}
                <a
                  href={selectedPerformance.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  티켓 구매하기
                </a>
              </p>
            )}
            <p>
              <strong>주최:</strong> {selectedPerformance.organizer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformPage;
