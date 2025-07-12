import React, { useEffect, useState, useMemo } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import CardItem from "./sections/CardItem";
import type { Performance } from "../../types/performance";
import { useTranslation } from "react-i18next";

const PerformancePage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}performances`)
      .then((res) => res.json())
      .then((data) => {
        setPerformances(data.content);
        setLoading(false);
      })
      .catch(() => {
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  // 공연 데이터에서 지역명 추출(중복 제거)
  const areaOptions = useMemo(() => {
    const areas = performances.map((p) => p.area).filter(Boolean);
    return Array.from(new Set(areas));
  }, [performances]);

  // YYYY.MM.DD → YYYYMMDD(숫자) 변환 함수
  const dateToNumber = (date: string) =>
    date ? parseInt(date.replace(/\./g, ""), 10) : 0;

  // 필터링된 공연 리스트
  const filteredPerformances = performances.filter((performance) => {
    // 지역 필터
    if (areaFilter && performance.area !== areaFilter) return false;

    // 검색어 필터
    if (
      keyword &&
      !performance.name.toLowerCase().includes(keyword.toLowerCase())
    )
      return false;

    // 날짜 필터 (공연 기간과 필터 기간이 겹치면 통과)
    const filterStart = startDateFilter ? dateToNumber(startDateFilter) : null;
    const filterEnd = endDateFilter ? dateToNumber(endDateFilter) : null;
    const perfStart = dateToNumber(performance.startDate);
    const perfEnd = dateToNumber(performance.endDate);

    // 필터가 둘 다 없으면 모두 표시
    if (!filterStart && !filterEnd) return true;

    // 둘 다 있을 때: 공연 종료일 >= 필터 시작일 && 공연 시작일 <= 필터 종료일
    if (filterStart && filterEnd) {
      if (perfEnd < filterStart || perfStart > filterEnd) return false;
      return true;
    }
    // 시작일만 있을 때: 공연 종료일 >= 필터 시작일
    if (filterStart && perfEnd < filterStart) return false;
    // 종료일만 있을 때: 공연 시작일 <= 필터 종료일
    if (filterEnd && perfStart > filterEnd) return false;

    return true;
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-b-4 mb-6"></div>
        <div className="text-2xl text-blue-600 font-semibold tracking-wide">
          {t("loadingPage")}
        </div>
        <div className="text-sm text-gray-400 mt-2">{t("wait")}</div>
      </div>
    );

  if (error)
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <p className="col-span-full text-center text-xl text-gray-500 mt-10">
          {t("performance.error")}
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow">
        {t("performance.title")}
      </h1>

      {/* 필터 UI */}
      <div className="grid grid-cols-2 md:flex flex-wrap gap-4 mb-10">
        <Select
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          areaOptions={areaOptions}
        />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {filteredPerformances.map((performance: Performance) => (
          <CardItem performance={performance} key={performance.id} />
        ))}
      </div>
    </div>
  );
};

export default PerformancePage;
