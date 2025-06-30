import { useState } from "react";

const TouristPage = () => {
  // 관광지 데이터 (예시 데이터)
  const touristSpots = [
    {
      id: 1,
      name: "경복궁",
      region: "서울",
      district: "종로구",
      description: "조선 시대의 대표적인 궁궐",
      image: "https://via.placeholder.com/150",
      hours: "09:00 - 18:00",
      fee: "3,000원",
      nearby: ["인사동", "북촌 한옥마을"],
    },
    {
      id: 2,
      name: "해운대 해수욕장",
      region: "부산",
      district: "해운대구",
      description: "부산의 대표적인 해수욕장",
      image: "https://via.placeholder.com/150",
      hours: "24시간",
      fee: "무료",
      nearby: ["광안리 해수욕장", "부산 아쿠아리움"],
    },
    // 추가 데이터...
  ];

  // 관광지 데이터 타입
  type TouristSpot = {
    id: number;
    name: string;
    region: string;
    district: string;
    description: string;
    image: string;
    hours: string;
    fee: string;
    nearby: string[];
  };

  // 선택된 관광지 타입 (null 가능)
  type SelectedSpot = TouristSpot | null;

  // 상태 관리 타입
  const [regionFilter, setRegionFilter] = useState<string>(""); // 지역 필터
  const [keyword, setKeyword] = useState<string>(""); // 키워드 검색
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [selectedSpot, setSelectedSpot] = useState<SelectedSpot>(null); // 선택된 관광지
  const itemsPerPage = 5;

  // 필터링된 관광지 데이터
  const filteredSpots = touristSpots.filter((spot) => {
    const matchesRegion =
      regionFilter === "" || spot.region.includes(regionFilter);
    const matchesKeyword =
      keyword === "" ||
      spot.name.includes(keyword) ||
      spot.description.includes(keyword);
    return matchesRegion && matchesKeyword;
  });

  // 페이징 처리
  const totalPages = Math.ceil(filteredSpots.length / itemsPerPage);
  const paginatedSpots = filteredSpots.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">한국 관광지 리스트</h1>

      {/* 필터링 및 검색 */}
      <div className="flex gap-4 mb-6">
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
      </div>

      {/* 관광지 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {paginatedSpots.map((spot) => (
          <div
            key={spot.id}
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedSpot(spot)}
          >
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{spot.name}</h2>
            <p className="text-gray-600">
              {spot.region} - {spot.district}
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

      {/* 관광지 상세보기 */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedSpot(null)}
            >
              X
            </button>
            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedSpot.name}</h2>
            <p className="text-gray-600 mb-2">{selectedSpot.description}</p>
            <p className="mb-2">
              <strong>운영시간:</strong> {selectedSpot.hours}
            </p>
            <p className="mb-2">
              <strong>요금:</strong> {selectedSpot.fee}
            </p>
            <p>
              <strong>주변:</strong> {selectedSpot.nearby.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristPage;
