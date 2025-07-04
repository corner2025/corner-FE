import React from "react";
import { Link } from "react-router-dom";
import { dutyFreeProducts } from "../../data/dutyFreeProduct";
import { touristSpots } from "../../data/tourist";
import { festivals } from "../../data/festival";
import { performances } from "../../data/performance";

const getYear = () => new Date().getFullYear().toString();

const getLatestFestival = () => {
  if (!festivals.length) return [];
  return [...festivals]
    .sort((a, b) => {
      const aStart =
        a.startDate instanceof Date
          ? a.startDate.getTime()
          : new Date(a.startDate).getTime();
      const bStart =
        b.startDate instanceof Date
          ? b.startDate.getTime()
          : new Date(b.startDate).getTime();
      return bStart - aStart;
    })
    .slice(0, 1);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const MainPage: React.FC = () => {
  const topDutyFree = [...dutyFreeProducts]
    .filter((p) => p.year_month.startsWith(getYear()))
    .sort((a, b) => b.sales_count - a.sales_count)
    .slice(0, 2);

  const topTourist = touristSpots.slice(0, 2);
  const topFestival = getLatestFestival();
  const topPerformance = performances.slice(0, 1);

  const cardMinHeight = { minHeight: 220 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pb-10 rounded-md mb-10">
      {/* Hero 배너 */}
      <section className="relative w-full h-[250px] sm:h-[320px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-200 to-yellow-200 opacity-70 rounded-b-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight animate-fade-in-down">
            Korea Travel Hub
          </h1>
          <p className="text-white text-lg font-medium drop-shadow mb-6 animate-fade-in">
            여행·쇼핑·축제·공연·관광지,{" "}
            <span className="font-bold text-yellow-100">한눈에 즐기기!</span>
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              to="/tourist"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-xl bg-white/90 text-blue-700 font-bold shadow hover:bg-blue-100 transition"
            >
              관광지 탐색
            </Link>
            <Link
              to="/dutyfree"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-xl bg-yellow-300/90 text-yellow-900 font-bold shadow hover:bg-yellow-200 transition"
            >
              면세점 찾기
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-8 mb-14">
        {/* 1행 1열: 관광지 추천 */}
        <Link
          to="/tourist"
          onClick={scrollToTop}
          className="rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition bg-gradient-to-tr from-green-200 via-white/50 to-blue-100"
          style={cardMinHeight}
        >
          <div className="p-8 flex flex-col h-full justify-between">
            <div>
              <span className="text-3xl">🏞️</span>
              <h2 className="text-2xl font-extrabold text-green-700 mt-2 mb-3">
                관광지 추천
              </h2>
              <div className="text-gray-600 mb-2">지금 인기있는 관광지</div>
              <ul className="space-y-1">
                {topTourist.map((spot) => (
                  <li key={spot.id} className="flex items-center gap-2">
                    <span className="font-bold text-green-600">•</span>
                    <span className="font-semibold">{spot.name}</span>
                    <span className="text-gray-400 text-xs">
                      {spot.address}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="inline-block mt-4 text-green-700 font-bold group-hover:underline">
              관광지 전체보기 →
            </span>
          </div>
        </Link>

        {/* 1행 2열: 여행 가이드 */}
        <div
          className="rounded-3xl overflow-hidden shadow-lg bg-gradient-to-tr from-pink-100 via-white/60 to-yellow-100 flex flex-col justify-between p-8"
          style={cardMinHeight}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl text-pink-400">📚</span>
            <span className="text-xl font-bold text-pink-700">여행 가이드</span>
          </div>
          <ul className="text-gray-700 text-base space-y-1 mb-2">
            <li>
              <span className="font-semibold text-pink-500">•</span> 여행 준비
              체크리스트
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span> 인기 여행
              코스 추천
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span> 면세 쇼핑
              꿀팁 모음
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span> 축제/공연
              일정 한눈에
            </li>
          </ul>
          <div className="text-xs text-gray-400 mt-2">
            더 많은 정보는{" "}
            <Link
              to="/calender"
              onClick={scrollToTop}
              className="underline text-pink-500"
            >
              캘린더
            </Link>{" "}
            및{" "}
            <Link
              to="/map"
              onClick={scrollToTop}
              className="underline text-pink-500"
            >
              여행 지도
            </Link>
            에서 확인!
          </div>
        </div>

        {/* 2행 1열: 면세점 쇼핑 */}
        <Link
          to="/dutyfree"
          onClick={scrollToTop}
          className="rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition bg-gradient-to-tr from-yellow-100 via-white/60 to-blue-50"
          style={cardMinHeight}
        >
          <div className="p-8 flex flex-col h-full justify-between">
            <div>
              <span className="text-3xl">🛍️</span>
              <h2 className="text-2xl font-extrabold text-yellow-700 mt-2 mb-3">
                면세점 랭킹
              </h2>
              <div className="text-gray-600 mb-2">인기 품목</div>
              <ul className="space-y-1">
                {topDutyFree.map((item) => (
                  <li key={item.category} className="flex items-center gap-2">
                    <span className="font-bold text-yellow-500">•</span>
                    <span className="font-semibold">{item.category}</span>
                    <span className="text-gray-400 text-xs">
                      {item.sales_count.toLocaleString()}개
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="inline-block mt-4 text-yellow-700 font-bold group-hover:underline">
              면세점 전체보기 →
            </span>
          </div>
        </Link>

        {/* 2행 2열: 축제/공연 (좌우로 두 카드) */}
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* 축제 소식 */}
          <Link
            to="/festival"
            onClick={scrollToTop}
            className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition bg-gradient-to-tr from-blue-100 via-white/60 to-yellow-100 flex flex-col justify-between p-6"
            style={cardMinHeight}
          >
            <div>
              <span className="text-2xl">🎉</span>
              <h3 className="text-xl font-bold text-blue-600 mt-2 mb-2">
                축제 소식
              </h3>
              {topFestival.length > 0 ? (
                <div>
                  <div className="font-semibold">{topFestival[0].name}</div>
                  <div className="text-gray-500 text-xs">
                    {topFestival[0].place || ""}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {topFestival[0].startDate instanceof Date
                      ? topFestival[0].startDate.toLocaleDateString()
                      : new Date(topFestival[0].startDate).toLocaleDateString()}
                    {" ~ "}
                    {topFestival[0].endDate instanceof Date
                      ? topFestival[0].endDate.toLocaleDateString()
                      : new Date(topFestival[0].endDate).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  최근 축제 정보가 없습니다.
                </div>
              )}
            </div>
            <span className="mt-4 text-blue-600 font-bold group-hover:underline">
              전체보기 →
            </span>
          </Link>
          {/* 공연 정보 */}
          <Link
            to="/performance"
            onClick={scrollToTop}
            className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition bg-gradient-to-tr from-purple-100 via-white/60 to-blue-100 flex flex-col justify-between p-6"
            style={cardMinHeight}
          >
            <div>
              <span className="text-2xl">🎭</span>
              <h3 className="text-xl font-bold text-purple-700 mt-2 mb-2">
                공연 정보
              </h3>
              {topPerformance.length > 0 ? (
                <div>
                  <div className="font-semibold">{topPerformance[0].title}</div>
                  <div className="text-gray-500 text-xs">
                    {topPerformance[0].place}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {topPerformance[0].startDate instanceof Date
                      ? topPerformance[0].startDate.toLocaleDateString()
                      : new Date(
                          topPerformance[0].startDate
                        ).toLocaleDateString()}
                    {" ~ "}
                    {topPerformance[0].endDate instanceof Date
                      ? topPerformance[0].endDate.toLocaleDateString()
                      : new Date(
                          topPerformance[0].endDate
                        ).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  최근 공연 정보가 없습니다.
                </div>
              )}
            </div>
            <span className="mt-4 text-purple-700 font-bold group-hover:underline">
              전체보기 →
            </span>
          </Link>
        </div>
      </section>

      {/* 캘린더/지도 바로가기 - 컬러풀 버튼 */}
      <section className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-6 mb-10">
        <Link
          to="/calender"
          onClick={scrollToTop}
          className="flex-1 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-200 p-7 flex items-center gap-4 hover:shadow-lg transition group"
        >
          <span className="text-4xl text-orange-400">🗓️</span>
          <div>
            <div className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition">
              일정 캘린더
            </div>
            <div className="text-gray-500 text-sm">
              여행, 축제, 공연 일정을 한눈에!
            </div>
          </div>
        </Link>
        <Link
          to="/map"
          onClick={scrollToTop}
          className="flex-1 rounded-2xl bg-gradient-to-r from-blue-100 to-green-100 p-7 flex items-center gap-4 hover:shadow-lg transition group"
        >
          <span className="text-4xl text-blue-400">🗺️</span>
          <div>
            <div className="text-lg font-bold text-gray-900 group-hover:text-blue-500 transition">
              여행 지도
            </div>
            <div className="text-gray-500 text-sm">
              내 위치 기반 여행지, 면세점, 축제, 공연 정보!
            </div>
          </div>
        </Link>
      </section>

      {/* 안내 문구 */}
      <footer className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm mt-16">
        <span className="font-semibold text-blue-500">Korea Travel Hub</span>는
        여행자와 내국인 모두를 위한{" "}
        <span className="font-semibold text-yellow-600">
          통합 여행 정보 플랫폼
        </span>
        입니다.
      </footer>
    </div>
  );
};

export default MainPage;
