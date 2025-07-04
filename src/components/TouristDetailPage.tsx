import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { touristSpots } from "../data/tourist";
import { areaCodes } from "../types/tourist";

const TouristDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spot = touristSpots.find((s) => s.id === Number(id));

  // description에서 특정 정보 추출 함수 (간단한 파싱)
  const extractInfo = (text: string, label: string): string | null => {
    const regex = new RegExp(`${label}:\\s*(.+)`);
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  // description에서 주변 시설 목록 추출
  const extractFacilities = (text: string, label: string): string[] => {
    const info = extractInfo(text, label);
    return info ? info.split(",").map((item) => item.trim()) : [];
  };

  if (!spot) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600 text-2xl mt-20">
        <p>관광지 정보를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // description 파싱
  const operatingHours = extractInfo(spot.description, "운영 시간");
  const fees = extractInfo(spot.description, "요금");
  const nearbyRestaurants = extractFacilities(spot.description, "주변 식당");
  const nearbyAccommodations = extractFacilities(spot.description, "주변 숙박");
  const howToGetThere = extractInfo(spot.description, "가는 방법"); // 가는 방법 추가 파싱

  // 실제 소개 글만 추출 (첫 줄부터 '운영 시간:' 전까지)
  const mainDescriptionLines = spot.description.split("\n");
  const descriptionEndIndex = mainDescriptionLines.findIndex((line) =>
    line.startsWith("운영 시간:")
  );
  const mainDescription = (
    descriptionEndIndex !== -1
      ? mainDescriptionLines.slice(0, descriptionEndIndex)
      : mainDescriptionLines
  )
    .join("\n")
    .trim();

  // 지도 링크 생성 (카카오맵 기준)
  const kakaoMapLink = `https://map.kakao.com/link/map/${spot.name},${spot.latitude},${spot.longitude}`;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl my-8 animate-fade-in mb-15">
      <button
        onClick={() => navigate(-1)} // 이전 페이지로 이동
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        목록으로
      </button>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
        {spot.name}
      </h1>

      <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
        <img
          src={
            spot.imageUrl || "https://via.placeholder.com/800x450?text=No+Image"
          }
          alt={spot.name}
          className="w-full h-64 md:h-96 object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 기본 정보 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-blue-200">
            기본 정보
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">주소:</span> {spot.address}
            <a
              href={kakaoMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-500 hover:underline text-sm"
            >
              [지도 보기]
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">지역:</span>{" "}
            {areaCodes.find((a) => a.code === spot.areaCode)?.name ||
              spot.areaCode}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">분류:</span> {spot.category1} &gt;{" "}
            {spot.category2} &gt; {spot.category3}
          </p>
          {operatingHours && (
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">운영 시간:</span> {operatingHours}
            </p>
          )}
          {fees && (
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">요금:</span> {fees}
            </p>
          )}
          {howToGetThere && (
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">가는 방법:</span> {howToGetThere}
            </p>
          )}
        </div>

        {/* 소개 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-blue-200">
            소개
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {mainDescription}
          </p>
        </div>
      </div>

      {/* 주변 식당/숙박 (description 필드에서 파싱) */}
      {nearbyRestaurants.length > 0 || nearbyAccommodations.length > 0 ? (
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">주변 시설</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nearbyRestaurants.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  🍽️ 주변 식당
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {nearbyRestaurants.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {nearbyAccommodations.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  🏨 주변 숙박
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {nearbyAccommodations.map((item, index) => (
                    <li key={index} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * 주변 식당/숙박 정보는 소개글에서 파싱된 내용입니다. 실제
            서비스에서는 지도 API(예: 카카오맵, 네이버 지도) 연동을 통해 더
            정확한 위치 정보를 제공할 수 있습니다.
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 pt-8 border-t-2 border-gray-200">
          주변 시설 정보가 없습니다.
        </p>
      )}
    </div>
  );
};

export default TouristDetailPage;
