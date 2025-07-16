import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  dutyFreeProducts,
  festivals,
  performances,
  touristSpots,
} from "../../data/temp";

const getYear = () => new Date().getFullYear().toString();

const getLatestFestival = () => {
  if (!festivals.length) return [];
  return [...festivals]
    .sort((a, b) => {
      const aStart = new Date(a.startDate).getTime();
      const bStart = new Date(b.startDate).getTime();
      return bStart - aStart;
    })
    .slice(0, 1);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  const topDutyFree = [...dutyFreeProducts]
    .filter((p) => p.year_month.startsWith(getYear()))
    .sort((a, b) => b.sales_count - a.sales_count)
    .slice(0, 2);

  const topTourist = touristSpots.slice(0, 2);
  const topFestival = getLatestFestival();
  const topPerformance = performances.slice(0, 1);

  const cardMinHeight = { minHeight: 220 };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pb-10 rounded-[22.375px] mb-10"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      {/* Hero 배너 */}
      <section className="relative w-full h-[250px] sm:h-[320px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-200 to-yellow-200 opacity-70 rounded-[22.375px]" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}/>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight animate-fade-in-down">
            Korea Travel Hub
          </h1>
          <p className="text-white text-lg font-medium drop-shadow mb-6 animate-fade-in">
            {t("main.1.intro.1")}
            <span className="font-bold text-yellow-100">
              {t("main.1.intro.2")}
            </span>
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              to="/tourist"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-xl bg-white/90 text-blue-700 font-bold shadow hover:bg-blue-100 transition"
            >
              {t("main.1.button.1")}
            </Link>
            <Link
              to="/dutyfree"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-xl bg-yellow-300/90 text-yellow-900 font-bold shadow hover:bg-yellow-200 transition"
            >
              {t("main.1.button.2")}
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
                {t("main.2.title")}
              </h2>
              <div className="text-gray-600 mb-2">{t("main.2.subtitle")}</div>
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
              {t("main.2.button")}→
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
            <span className="text-xl font-bold text-pink-700">
              {t("main.3.title")}
            </span>
          </div>
          <ul className="text-gray-700 text-base space-y-1 mb-2">
            <li>
              <span className="font-semibold text-pink-500">•</span>
              {t("main.3.list.1")}
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span>
              {t("main.3.list.2")}
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span>
              {t("main.3.list.3")}
            </li>
            <li>
              <span className="font-semibold text-pink-500">•</span>
              {t("main.3.list.4")}
            </li>
          </ul>
          <div className="text-xs text-gray-400 mt-2">
            {t("main.3.info.1")}
            <Link
              to="/calendar"
              onClick={scrollToTop}
              className="underline text-pink-500"
            >
              {t("main.3.info.2")}
            </Link>
            {t("main.3.info.3")}
            <Link
              to="/map"
              onClick={scrollToTop}
              className="underline text-pink-500"
            >
              {t("main.3.info.4")}
            </Link>
            {t("main.3.info.5")}
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
                {t("main.4.title")}
              </h2>
              <div className="text-gray-600 mb-2">{t("main.4.subtitle")}</div>
              <ul className="space-y-1">
                {topDutyFree.map((item) => (
                  <li key={item.category} className="flex items-center gap-2">
                    <span className="font-bold text-yellow-500">•</span>
                    <span className="font-semibold">{item.category}</span>
                    <span className="text-gray-400 text-xs">
                      {item.sales_count.toLocaleString()}
                      {t("main.4.count")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="inline-block mt-4 text-yellow-700 font-bold group-hover:underline">
              {t("main.4.button")}→
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
                {t("main.5.title")}
              </h3>
              {topFestival.length > 0 ? (
                <div>
                  <div className="font-semibold">{topFestival[0].name}</div>
                  <div className="text-gray-500 text-xs">
                    {topFestival[0].place || ""}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date(topFestival[0].startDate).toLocaleDateString()}
                    {" ~ "}
                    {new Date(topFestival[0].endDate).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">{t("main.5.error")}</div>
              )}
            </div>
            <span className="mt-4 text-blue-600 font-bold group-hover:underline">
              {t("main.5.button")}→
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
                {t("main.6.title")}
              </h3>
              {topPerformance.length > 0 ? (
                <div>
                  <div className="font-semibold">{topPerformance[0].title}</div>
                  <div className="text-gray-500 text-xs">
                    {topPerformance[0].place}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date(topPerformance[0].startDate).toLocaleDateString()}
                    {" ~ "}
                    {new Date(topPerformance[0].endDate).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">{t("main.6.error")}</div>
              )}
            </div>
            <span className="mt-4 text-purple-700 font-bold group-hover:underline">
              {t("main.6.button")}→
            </span>
          </Link>
        </div>
      </section>

      {/* 캘린더/지도 바로가기 - 컬러풀 버튼 */}
      <section className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-6 mb-10">
        <Link
          to="/calendar"
          onClick={scrollToTop}
          className="flex-1 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-200 p-7 flex items-center gap-4 hover:shadow-lg transition group"
        >
          <span className="text-4xl text-orange-400">🗓️</span>
          <div>
            <div className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition">
              {t("main.7.title")}
            </div>
            <div className="text-gray-500 text-sm">{t("main.7.info")}</div>
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
              {t("main.8.title")}
            </div>
            <div className="text-gray-500 text-sm">{t("main.8.info")}</div>
          </div>
        </Link>
      </section>

      {/* 안내 문구 */}
      <footer className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm mt-16">
        <span className="font-semibold text-blue-500">Korea Travel Hub</span>
        {t("main.9.description.1")}
        <span className="font-semibold text-yellow-600">
          {t("main.9.description.2")}
        </span>
        {t("main.9.description.3")}
      </footer>
    </div>
  );
};

export default MainPage;
