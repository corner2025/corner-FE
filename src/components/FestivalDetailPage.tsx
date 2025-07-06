// src/pages/FestivalDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Festival } from "../types/festival";
import { festivals } from "../data/festival";

const FestivalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [festival, setFestival] = useState<Festival | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const festivalId = parseInt(id || "", 10);
    const foundFestival = festivals.find((f) => f.id === festivalId);

    if (foundFestival) {
      setFestival(foundFestival);
    } else {
      setFestival(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!festival) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-gray-700">
        <h2 className="text-3xl font-bold mb-4">축제를 찾을 수 없습니다 😢</h2>
        <p className="text-lg mb-8">존재하지 않거나 삭제된 축제 정보입니다.</p>
        <Link
          to="/festivals"
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          모든 축제 보러가기
        </Link>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex animate-fade-in">
        {/* 이미지 섹션: 세로로 긴 이미지 표현을 위해 너비 제한 및 중앙 정렬 */}
        <div className="md:w-1/2 flex items-start justify-center p-6">
          {" "}
          {/* p-6으로 패딩 증가 */}
          <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-md">
            {" "}
            {/* max-w-xs로 너비 제한, 그림자 유지 */}
            <img
              src={
                festival.imgUrl ||
                "https://via.placeholder.com/400x600?text=Festival+Image"
              } // 세로 긴 플레이스홀더 (예시)
              alt={festival.name}
              className="w-full h-auto object-contain rounded-lg" // 원본 비율 유지, 배경색 제거
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x600?text=Image+Load+Failed";
                e.currentTarget.alt = "이미지 로드 실패";
              }}
            />
          </div>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* 타이틀 및 기간 */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              {festival.name}
            </h1>
            <p className="text-lg text-gray-700 mb-6 border-b pb-4">
              <span className="font-semibold text-red-600">기간 :</span>{" "}
              {formatDate(festival.startDate)} ~ {formatDate(festival.endDate)}
            </p>

            {/* 개요/설명 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                축제 소개
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {festival.description}
              </p>
            </div>

            {/* 주요 정보 */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"></path>
                </svg>
                <span className="font-semibold -ml-2">장소 : &nbsp;</span>{" "}
                {festival.place}, {festival.area}
              </div>
            </div>
          </div>

          {/* 돌아가기 버튼 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetailPage;
